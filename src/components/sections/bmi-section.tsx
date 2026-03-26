import { useState } from "react"

const bmiCategories = [
  { range: "< 16", label: "Выраженный дефицит", color: "text-blue-500", bg: "from-blue-300/40 to-cyan-200/30", advice: "Срочно обратитесь к врачу и нутрициологу. Дефицит массы опасен для здоровья.", recipe: "🥑 Боул с авокадо, киноа и яйцом — богатый белком и полезными жирами." },
  { range: "16–18.5", label: "Недостаточный вес", color: "text-cyan-500", bg: "from-cyan-300/40 to-sky-200/30", advice: "Увеличьте калорийность рациона за счёт полезных жиров и белков.", recipe: "🥜 Смузи с арахисовой пастой, бананом и молоком — 500 ккал за один стакан." },
  { range: "18.5–25", label: "Норма — отличный результат!", color: "text-green-600", bg: "from-green-300/40 to-teal-200/30", advice: "Ваш вес в норме! Продолжайте питаться сбалансированно и двигаться.", recipe: "🥗 Греческий салат с фетой и оливками — поддержи результат вкусно!" },
  { range: "25–30", label: "Избыточный вес", color: "text-yellow-600", bg: "from-yellow-300/40 to-orange-200/30", advice: "Небольшой дефицит калорий и больше движения помогут вернуться к норме.", recipe: "🫙 Тыквенный крем-суп — сытный, всего 150 ккал, богат клетчаткой." },
  { range: "30–35", label: "Ожирение I степени", color: "text-orange-500", bg: "from-orange-300/40 to-red-200/30", advice: "Рекомендуется консультация врача и постепенное изменение пищевых привычек.", recipe: "🥦 Запечённая рыба с овощами — вкусный старт для изменения привычек." },
  { range: "> 35", label: "Ожирение II–III степени", color: "text-red-500", bg: "from-red-300/40 to-pink-200/30", advice: "Необходима медицинская помощь. Не занимайтесь самолечением — обратитесь к специалисту.", recipe: "💧 Начните с воды: замените все напитки водой. Это уже -500 ккал/день." },
]

function getBmiCategory(bmi: number) {
  if (bmi < 16) return bmiCategories[0]
  if (bmi < 18.5) return bmiCategories[1]
  if (bmi < 25) return bmiCategories[2]
  if (bmi < 30) return bmiCategories[3]
  if (bmi < 35) return bmiCategories[4]
  return bmiCategories[5]
}

export function BmiSection() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const calculate = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (!h || !w || h <= 0 || w <= 0) return
    const result = w / (h * h)
    setBmi(Math.round(result * 10) / 10)
    setShowResult(true)
  }

  const reset = () => {
    setBmi(null)
    setShowResult(false)
    setHeight("")
    setWeight("")
  }

  const category = bmi ? getBmiCategory(bmi) : null

  const scaleMarks = [
    { value: 16, label: "16" },
    { value: 18.5, label: "18.5" },
    { value: 25, label: "25" },
    { value: 30, label: "30" },
    { value: 35, label: "35" },
    { value: 40, label: "40" },
  ]

  const bmiPercent = bmi ? Math.min(((bmi - 10) / 30) * 100, 100) : 0

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute left-[10%] top-[20%] h-36 w-36 rounded-full bg-green-200/25 blur-2xl" style={{ animationDuration: "8s" }} />
        <div className="bubble absolute right-[8%] bottom-[25%] h-24 w-24 rounded-full bg-teal-200/30 blur-xl" style={{ animationDuration: "6s", animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <div className="mb-3 inline-block rounded-full border border-green-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-green-700">Интерактивный калькулятор</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Калькулятор<br />
            <span className="text-green-600">индекса массы тела</span>
          </h2>
          <p className="mt-3 max-w-xl text-sky-800/70">
            ИМТ = масса (кг) ÷ рост² (м). Введите свои параметры и узнайте рекомендацию.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calculator */}
          <div className="glass-card rounded-3xl border border-white/70 p-8 shadow-xl">
            {!showResult ? (
              <div>
                <h3 className="mb-6 text-xl font-bold text-sky-900">Введите параметры</h3>

                <div className="mb-5">
                  <label className="mb-2 block text-sm font-semibold text-sky-800">Рост (см)</label>
                  <input
                    type="number"
                    placeholder="например, 170"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    min={100} max={250}
                    className="w-full rounded-2xl border border-white/60 bg-white/60 px-5 py-3.5 text-lg font-semibold text-sky-900 outline-none transition-all focus:border-green-400 focus:bg-white/80 backdrop-blur-sm placeholder:text-sky-800/30"
                  />
                </div>

                <div className="mb-8">
                  <label className="mb-2 block text-sm font-semibold text-sky-800">Вес (кг)</label>
                  <input
                    type="number"
                    placeholder="например, 65"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    min={30} max={300}
                    className="w-full rounded-2xl border border-white/60 bg-white/60 px-5 py-3.5 text-lg font-semibold text-sky-900 outline-none transition-all focus:border-green-400 focus:bg-white/80 backdrop-blur-sm placeholder:text-sky-800/30"
                  />
                </div>

                <button
                  onClick={calculate}
                  disabled={!height || !weight}
                  className="glossy-btn w-full rounded-2xl bg-gradient-to-br from-green-400 to-teal-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-40"
                >
                  Рассчитать ИМТ →
                </button>

                {/* Formula */}
                <div className="mt-5 rounded-xl bg-white/30 p-4 text-center">
                  <div className="text-xs text-sky-700/60 mb-1">Формула расчёта</div>
                  <div className="font-mono text-sky-900 font-semibold">ИМТ = m ÷ h²</div>
                  <div className="text-xs text-sky-700/60 mt-1">где m — масса в кг, h — рост в метрах</div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-2 text-sm text-sky-700/70">Ваш ИМТ</div>
                <div className="mb-1 text-7xl font-black text-sky-900">{bmi}</div>
                <div className={`mb-4 text-lg font-bold ${category?.color}`}>{category?.label}</div>

                {/* BMI scale */}
                <div className="mb-5 px-2">
                  <div className="relative h-4 w-full overflow-hidden rounded-full" style={{ background: "linear-gradient(to right, #3b82f6, #06b6d4, #22c55e, #facc15, #f97316, #ef4444)" }}>
                    <div
                      className="absolute top-0 h-4 w-1 rounded-full bg-white shadow-lg transition-all duration-700"
                      style={{ left: `calc(${bmiPercent}% - 2px)` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-sky-700/50">
                    {scaleMarks.map(m => <span key={m.value}>{m.label}</span>)}
                  </div>
                </div>

                <div className={`mb-4 rounded-xl bg-gradient-to-br ${category?.bg} border border-white/50 p-4 text-sm text-sky-900`}>
                  {category?.advice}
                </div>

                <div className="mb-5 rounded-xl bg-white/40 border border-white/60 p-3 text-sm text-sky-800">
                  <div className="font-semibold mb-1">🍽 Рецепт для вас:</div>
                  {category?.recipe}
                </div>

                <button onClick={reset} className="w-full rounded-xl border border-white/60 bg-white/40 py-3 text-sm font-medium text-sky-900 hover:bg-white/60 transition-colors">
                  ← Рассчитать снова
                </button>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4">
            <div className="glass-card rounded-2xl border border-white/60 p-5">
              <h3 className="mb-4 font-semibold text-sky-900">Таблица ИМТ</h3>
              <div className="space-y-2">
                {bmiCategories.map((cat, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-all ${bmi && getBmiCategory(bmi) === cat ? `bg-gradient-to-r ${cat.bg} border border-white/50 shadow-sm` : "bg-white/20"}`}
                  >
                    <span className={`font-mono text-xs ${cat.color}`}>{cat.range}</span>
                    <span className="text-sky-800/80">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl border border-white/60 p-5">
              <h3 className="mb-3 font-semibold text-sky-900">⚠️ Важно знать</h3>
              <div className="space-y-2 text-sm text-sky-800/80">
                <p>ИМТ — ориентировочный показатель. Он не учитывает соотношение мышц и жира, возраст, пол и тип телосложения.</p>
                <p>Спортсмен с мышечной массой может иметь «избыточный» ИМТ, оставаясь абсолютно здоровым.</p>
                <p>Для точной оценки используйте дополнительно измерение талии и консультацию врача.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
