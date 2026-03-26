import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { BubbleCanvas } from "@/components/bubble-canvas"
import { MagneticButton } from "@/components/magnetic-button"
import { TheorySection } from "@/components/sections/theory-section"
import { MythsSection } from "@/components/sections/myths-section"
import { BiochemSection } from "@/components/sections/biochem-section"
import { SurveySection } from "@/components/sections/survey-section"
import { RecipesSection } from "@/components/sections/recipes-section"
import { BmiSection } from "@/components/sections/bmi-section"
import { AiSection } from "@/components/sections/ai-section"
import { FutureSection } from "@/components/sections/future-section"
import { useRef, useEffect, useState } from "react"

const SECTIONS = ["Главная", "Теория", "Мифы", "Биохимия", "Опрос", "Рецепты", "ИМТ", "AI", "Будущее"]
const TOTAL = SECTIONS.length

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return
    const intervalId = setInterval(() => { if (checkShaderReady()) clearInterval(intervalId) }, 100)
    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)
    return () => { clearInterval(intervalId); clearTimeout(fallbackTimer) }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({ left: sectionWidth * index, behavior: "smooth" })
      setCurrentSection(index)
    }
  }

  // Enter key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const next = currentSection < TOTAL - 1 ? currentSection + 1 : currentSection
        scrollToSection(next)
      }
      if (e.key === "ArrowRight") scrollToSection(Math.min(currentSection + 1, TOTAL - 1))
      if (e.key === "ArrowLeft") scrollToSection(Math.max(currentSection - 1, 0))
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection])

  // Touch
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) e.preventDefault()
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < TOTAL - 1) scrollToSection(currentSection + 1)
        else if (deltaY < 0 && currentSection > 0) scrollToSection(currentSection - 1)
      }
    }
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  // Wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        if (!scrollContainerRef.current) return
        scrollContainerRef.current.scrollBy({ left: e.deltaY, behavior: "instant" })
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) setCurrentSection(newSection)
      }
    }
    const container = scrollContainerRef.current
    if (container) container.addEventListener("wheel", handleWheel, { passive: false })
    return () => { if (container) container.removeEventListener("wheel", handleWheel) }
  }, [currentSection])

  // Scroll sync
  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return
      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) { scrollThrottleRef.current = undefined; return }
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection && newSection >= 0 && newSection < TOTAL) setCurrentSection(newSection)
        scrollThrottleRef.current = undefined
      })
    }
    const container = scrollContainerRef.current
    if (container) container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (container) container.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) cancelAnimationFrame(scrollThrottleRef.current)
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden" style={{ background: "linear-gradient(135deg, #e0f7ff 0%, #b3ecf5 40%, #d4f5e4 100%)" }}>
      <CustomCursor />
      <GrainOverlay />

      {/* Frutiger Aero — WebGL shader as a subtle aqua tint */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#00c2e0"
            colorB="#4dd8a0"
            speed={0.4}
            detail={0.6}
            blend={60}
            coarseX={30}
            coarseY={30}
            mediumX={30}
            mediumY={30}
            fineX={20}
            fineY={20}
          />
          <ChromaFlow
            baseColor="#00b4d8"
            upColor="#48cae4"
            downColor="#90e0ef"
            leftColor="#a8edea"
            rightColor="#4dd8a0"
            intensity={0.6}
            radius={2}
            momentum={20}
            maskType="alpha"
            opacity={0.55}
          />
        </Shader>
        {/* Frutiger Aero gloss overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(200,240,255,0.25) 50%, rgba(150,230,210,0.3) 100%)" }} />
      </div>

      {/* Canvas bubbles with mouse repulsion */}
      <BubbleCanvas />

      {/* Navigation */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <button onClick={() => scrollToSection(0)} className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="glass-card glossy-btn flex h-10 w-10 items-center justify-center rounded-xl">
            <span className="text-lg">🥗</span>
          </div>
          <span className="font-bold tracking-tight text-sky-900 text-lg">ЗдоровоЕда</span>
        </button>

        <div className="hidden items-center gap-3 md:flex">
          {SECTIONS.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative text-xs font-medium transition-colors ${currentSection === index ? "text-cyan-700 font-semibold" : "text-sky-800/80 hover:text-sky-900"}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-400 transition-all duration-300 rounded-full ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Спросить AI
        </MagneticButton>
      </nav>

      {/* Slide dots */}
      <div className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`rounded-full transition-all duration-300 border ${currentSection === i ? "h-2.5 w-8 border-cyan-500/60 bg-gradient-to-r from-cyan-500 to-teal-400" : "h-2.5 w-2.5 border-sky-300/40 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
        <div className="ml-3 glass-card rounded-full border border-white/60 px-3 py-1 text-xs text-sky-700">
          Enter →
        </div>
      </div>

      {/* Slides */}
      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Slide 1 — Hero */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-between px-6 pb-10 pt-20 md:px-16 md:pt-24">

          {/* Школьная шапка */}
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="glass-card glossy-btn rounded-2xl px-6 py-4 text-center max-w-2xl mx-auto">
              <p className="text-xs leading-relaxed text-sky-800/80">
                Муниципальное бюджетное общеобразовательное учреждение<br />
                средняя общеобразовательная школа №4<br />
                г. Агрыз Агрызского муниципального района<br />
                Республики Татарстан
              </p>
            </div>
          </div>

          {/* Центральный заголовок */}
          <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="mb-4 inline-block">
              <div className="glass-card glossy-btn rounded-full px-4 py-1.5">
                <p className="font-mono text-xs text-cyan-700">Исследовательский проект · 2025–2026</p>
              </div>
            </div>

            <h1 className="mb-8 font-sans font-bold leading-[1.1] tracking-tight text-sky-900" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}>
              <span className="text-balance">Влияние фастфуда</span><br />
              <span className="text-balance bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">на организм человека</span>
            </h1>

            {/* Кнопки */}
            <div className="flex flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center sm:justify-center mb-8">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
                Начать изучение
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(5)}>
                🍃 Рецепты
              </MagneticButton>
            </div>

            {/* Скачать документы */}
            <div className="flex gap-4 justify-center animate-in fade-in duration-1000 delay-400">
              <a
                href="#"
                onClick={e => e.preventDefault()}
                title="Документ (Word) — загрузка будет доступна после прикрепления файла"
                className="glass-card glossy-btn rounded-2xl px-5 py-3 flex flex-col items-center gap-1 hover:scale-105 transition-transform cursor-not-allowed opacity-60"
              >
                <span className="text-3xl">📄</span>
                <span className="text-xs text-sky-800 font-medium">Документ .docx</span>
                <span className="text-[10px] text-sky-600/70">Скачать</span>
              </a>
              <a
                href="#"
                onClick={e => e.preventDefault()}
                title="Презентация (PowerPoint) — загрузка будет доступна после прикрепления файла"
                className="glass-card glossy-btn rounded-2xl px-5 py-3 flex flex-col items-center gap-1 hover:scale-105 transition-transform cursor-not-allowed opacity-60"
              >
                <span className="text-3xl">📊</span>
                <span className="text-xs text-sky-800 font-medium">Презентация .pptx</span>
                <span className="text-[10px] text-sky-600/70">Скачать</span>
              </a>
            </div>
          </div>

          {/* Нижний блок — авторы */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <div className="glass-card glossy-btn rounded-2xl px-6 py-4 max-w-2xl mx-auto flex flex-col sm:flex-row justify-between gap-4 text-xs text-sky-800/80 text-center">
              <div>
                <p className="font-semibold text-sky-900 mb-1">Выполнил:</p>
                <p>Ученик 9 «А» класса</p>
                <p className="font-medium">Бочкарев Александр</p>
              </div>
              <div className="hidden sm:block w-px bg-sky-200" />
              <div>
                <p className="font-semibold text-sky-900 mb-1">Руководитель проекта:</p>
                <p>учитель технологии</p>
                <p className="font-medium">Белова Л. В.</p>
              </div>
              <div className="hidden sm:block w-px bg-sky-200" />
              <div className="flex items-center justify-center">
                <p className="font-medium">2025–2026 учебный год</p>
              </div>
            </div>
          </div>

        </section>

        {/* Slide 2 — Theory */}
        <TheorySection />

        {/* Slide 3 — Myths */}
        <MythsSection />

        {/* Slide 4 — Biochemistry timeline */}
        <BiochemSection />

        {/* Slide 5 — Survey with charts */}
        <SurveySection />

        {/* Slide 6 — Recipes with KBJU */}
        <RecipesSection />

        {/* Slide 7 — BMI Calculator */}
        <BmiSection />

        {/* Slide 8 — AI Assistant */}
        <AiSection />

        {/* Slide 9 — Future of food */}
        <FutureSection />
      </div>
    </main>
  )
}