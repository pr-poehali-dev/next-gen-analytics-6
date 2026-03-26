import { useState } from "react"

const futures = [
  {
    emoji: "🏢",
    title: "Вертикальные фермы",
    subtitle: "Еда прямо в городе",
    year: "2030",
    color: "from-green-400/40 to-emerald-300/30",
    border: "border-green-300/50",
    short: "Многоэтажные теплицы в центре города. Без пестицидов, без транспортировки.",
    detail: "Вертикальные фермы позволяют выращивать урожай в 100 раз более эффективно по площади, чем обычные поля. Компании Bowery Farming и AeroFarms уже поставляют зелень в супермаркеты Нью-Йорка. К 2030 году технология станет mainstream — вы сможете покупать помидоры, выращенные в соседнем здании, без химии и с нулевым углеродным следом.",
    stats: [{ label: "Экономия воды", value: "95%" }, { label: "Площадь vs поле", value: "×100" }, { label: "Без пестицидов", value: "100%" }],
  },
  {
    emoji: "🔬",
    title: "Мясо из пробирки",
    subtitle: "Без убийства животных",
    year: "2028",
    color: "from-red-400/40 to-pink-300/30",
    border: "border-red-300/50",
    short: "Настоящее мясо, выращенное из клеток без участия животных.",
    detail: "Культивированное мясо — это настоящие мышечные клетки животного, выращенные в биореакторе. Компании Eat Just и Upside Foods уже получили одобрение FDA (США). Первый лабораторный бургер стоил $325 000 в 2013 году. К 2028 году цена сравняется с обычным мясом. Это устранит 18% мировых выбросов CO₂, связанных с животноводством.",
    stats: [{ label: "Меньше CO₂", value: "92%" }, { label: "Меньше земли", value: "99%" }, { label: "Меньше воды", value: "82%" }],
  },
  {
    emoji: "🧬",
    title: "Питание по ДНК",
    subtitle: "Персональная диета",
    year: "2027",
    color: "from-violet-400/40 to-purple-300/30",
    border: "border-violet-300/50",
    short: "Анализ генома определяет идеальный рацион лично для вас.",
    detail: "Нутригеномика изучает, как гены влияют на реакцию организма на питание. Компании Nutrigenomix и DNAfit уже предлагают тесты, определяющие, как ваш организм усваивает жиры, углеводы и микроэлементы. К 2027 году ИИ будет составлять персональный рацион на основе ДНК, микробиома и данных с носимых устройств — буквально на каждый день.",
    stats: [{ label: "Эффективность диеты", value: "+320%" }, { label: "Генов изучено", value: "500+" }, { label: "Рынок к 2027", value: "$17 млрд" }],
  },
  {
    emoji: "🤖",
    title: "AI-нутрициолог",
    subtitle: "Советник 24/7",
    year: "2025",
    color: "from-cyan-400/40 to-blue-300/30",
    border: "border-cyan-300/50",
    short: "ИИ анализирует фото блюда и мгновенно рассчитывает КБЖУ.",
    detail: "Google Lens уже умеет распознавать блюда и примерно оценивать калорийность. Следующий шаг — интеграция с медицинскими данными: уровень сахара в крови, физическая активность, сон. ИИ-ассистент будет в реальном времени корректировать рацион: «Ты плохо спал — добавь магний» или «После вчерашней тренировки нужно больше белка».",
    stats: [{ label: "Точность распознавания", value: "94%" }, { label: "Баз данных блюд", value: "1M+" }, { label: "Рост рынка", value: "+48%/год" }],
  },
  {
    emoji: "🌿",
    title: "Белок из насекомых",
    subtitle: "Экопитание будущего",
    year: "2026",
    color: "from-lime-400/40 to-green-300/30",
    border: "border-lime-300/50",
    short: "Мучные черви и кузнечики — самый устойчивый белок на планете.",
    detail: "ФАО ООН рекомендует насекомых как источник белка будущего. Они содержат 60–70% протеина (vs 25% в говядине), Омега-3, B12 и цинк. Производство кузнечиков требует в 2000 раз меньше воды и в 10 раз меньше корма, чем коров. В Европе уже продаются протеиновые батончики и паста из муки насекомых. К 2035 году это станет нормой.",
    stats: [{ label: "Белка в мучных червях", value: "67%" }, { label: "Меньше воды", value: "×2000" }, { label: "Меньше CO₂", value: "80%" }],
  },
  {
    emoji: "🫧",
    title: "Умная упаковка",
    subtitle: "Еда говорит сама",
    year: "2026",
    color: "from-sky-400/40 to-teal-300/30",
    border: "border-sky-300/50",
    short: "Упаковка меняет цвет, если продукт испортился.",
    detail: "Биосенсорные плёнки реагируют на газы, выделяемые гниющей едой, и меняют цвет. Это устранит необходимость в консервантах и снизит пищевые отходы — сейчас 1/3 всей еды на планете выбрасывается. Компания Toxin Alert уже тестирует такую упаковку для мяса. NFC-чипы в упаковке смогут показывать полный состав, происхождение и углеродный след продукта.",
    stats: [{ label: "Пищевые отходы", value: "33% мира" }, { label: "Экономия от умной упаковки", value: "$31 млрд" }, { label: "Точность сенсоров", value: "99.7%" }],
  },
]

export function FutureSection() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute right-[5%] top-[10%] h-52 w-52 rounded-full bg-violet-200/20 blur-3xl" style={{ animationDuration: "11s" }} />
        <div className="bubble absolute left-[8%] bottom-[15%] h-32 w-32 rounded-full bg-cyan-200/25 blur-xl" style={{ animationDuration: "8s", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10">
          <div className="mb-3 inline-block rounded-full border border-violet-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-violet-700">Футурология · Еда завтрашнего дня</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Будущее еды:<br />
            <span className="text-violet-600">что нас ждёт</span>
          </h2>
          <p className="mt-3 max-w-xl text-sky-800/70">
            Фастфуд — это вчерашний день. Вот как будет выглядеть питание через 5–10 лет.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {futures.map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className={`glass-card rounded-2xl border p-5 text-left transition-all duration-300 ${f.border} bg-gradient-to-br ${f.color} hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="text-3xl">{f.emoji}</span>
                <span className="rounded-full bg-white/50 px-2 py-0.5 font-mono text-xs text-sky-700">{f.year}</span>
              </div>
              <h3 className="mb-1 font-bold text-sky-900">{f.title}</h3>
              <div className="mb-2 text-xs text-sky-700/70">{f.subtitle}</div>
              <p className="text-sm text-sky-800/80">{active === i ? f.detail : f.short}</p>

              {active === i && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {f.stats.map((s, j) => (
                    <div key={j} className="rounded-xl bg-white/40 p-2 text-center">
                      <div className="text-sm font-bold text-sky-900">{s.value}</div>
                      <div className="text-xs text-sky-700/70">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 text-xs text-sky-600/60">
                {active === i ? "Свернуть ↑" : "Подробнее →"}
              </div>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-8 glass-card rounded-2xl border border-white/60 p-6">
          <h3 className="mb-5 font-semibold text-sky-900">Дорожная карта будущей еды</h3>
          <div className="relative">
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gradient-to-r from-cyan-400 via-violet-400 to-green-400 rounded-full" />
            <div className="grid grid-cols-6 gap-2">
              {[
                { year: "2025", event: "AI-нутриционист", emoji: "🤖" },
                { year: "2026", event: "Умная упаковка", emoji: "🫧" },
                { year: "2027", event: "Питание по ДНК", emoji: "🧬" },
                { year: "2028", event: "Мясо из пробирки", emoji: "🔬" },
                { year: "2030", event: "Верт. фермы", emoji: "🏢" },
                { year: "2035", event: "Белок насекомых", emoji: "🌿" },
              ].map((t, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 border border-white/80 shadow-md text-lg relative z-10">
                    {t.emoji}
                  </div>
                  <div className="font-mono text-xs font-bold text-cyan-700">{t.year}</div>
                  <div className="text-xs text-sky-800/70 mt-0.5">{t.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
