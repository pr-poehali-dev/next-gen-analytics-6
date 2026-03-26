export function SurveySection() {
  const surveyData = [
    { label: "Едят фастфуд 1–3 раза в неделю", percent: 68, color: "from-red-400 to-pink-400" },
    { label: "Замечали ухудшение самочувствия после фастфуда", percent: 74, color: "from-orange-400 to-yellow-400" },
    { label: "Знают о вреде, но продолжают есть", percent: 81, color: "from-purple-400 to-indigo-400" },
    { label: "Хотят перейти на здоровое питание", percent: 89, color: "from-green-400 to-teal-400" },
    { label: "Считают здоровую еду дорогой", percent: 57, color: "from-cyan-400 to-blue-400" },
    { label: "Готовы тратить время на готовку", percent: 43, color: "from-teal-400 to-emerald-400" },
  ]

  const pieData = [
    { label: "Картошка фри", percent: 34, color: "#ef4444" },
    { label: "Бургеры", percent: 28, color: "#f97316" },
    { label: "Пицца", percent: 19, color: "#a855f7" },
    { label: "Nuggets / снеки", percent: 12, color: "#06b6d4" },
    { label: "Другое", percent: 7, color: "#22c55e" },
  ]

  const ages = [
    { range: "14–17 лет", count: 47, color: "bg-pink-400" },
    { range: "18–24 года", count: 38, color: "bg-orange-400" },
    { range: "25–35 лет", count: 11, color: "bg-teal-400" },
    { range: "35+ лет", count: 4, color: "bg-blue-400" },
  ]

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute right-[8%] top-[15%] h-40 w-40 rounded-full bg-teal-200/30 blur-2xl" style={{ animationDuration: "9s" }} />
        <div className="bubble absolute bottom-[10%] left-[5%] h-28 w-28 rounded-full bg-cyan-200/25 blur-xl" style={{ animationDuration: "7s", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10">
          <div className="mb-3 inline-block rounded-full border border-teal-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-teal-700">Исследование · 150 респондентов · 2025</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Результаты опроса:<br />
            <span className="text-teal-600">что думают люди</span>
          </h2>
          <p className="mt-3 max-w-xl text-sky-800/70">
            Мы провели анонимный опрос среди школьников и молодёжи в возрасте 14–35 лет. Вот что получилось.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bar charts */}
          <div className="glass-card col-span-2 rounded-2xl border border-white/60 p-6">
            <h3 className="mb-5 font-semibold text-sky-900">Ключевые показатели опроса</h3>
            <div className="space-y-4">
              {surveyData.map((item, i) => (
                <div key={i}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-sky-800/80">{item.label}</span>
                    <span className="font-bold text-sky-900">{item.percent}%</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-white/50">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.percent}%`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Pie */}
            <div className="glass-card rounded-2xl border border-white/60 p-5">
              <h3 className="mb-4 font-semibold text-sky-900">Любимый фастфуд</h3>
              <div className="flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 42 42" className="drop-shadow-md">
                  {(() => {
                    let cumulative = 0
                    return pieData.map((slice, i) => {
                      const startAngle = (cumulative / 100) * 360
                      const endAngle = ((cumulative + slice.percent) / 100) * 360
                      cumulative += slice.percent
                      const startRad = ((startAngle - 90) * Math.PI) / 180
                      const endRad = ((endAngle - 90) * Math.PI) / 180
                      const x1 = 21 + 16 * Math.cos(startRad)
                      const y1 = 21 + 16 * Math.sin(startRad)
                      const x2 = 21 + 16 * Math.cos(endRad)
                      const y2 = 21 + 16 * Math.sin(endRad)
                      const largeArc = slice.percent > 50 ? 1 : 0
                      return (
                        <path
                          key={i}
                          d={`M 21 21 L ${x1} ${y1} A 16 16 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={slice.color}
                          opacity={0.85}
                        />
                      )
                    })
                  })()}
                  <circle cx="21" cy="21" r="8" fill="white" opacity="0.9" />
                </svg>
              </div>
              <div className="mt-3 space-y-1">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-sky-800/80">{item.label}</span>
                    <span className="ml-auto font-semibold text-sky-900">{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age */}
            <div className="glass-card rounded-2xl border border-white/60 p-5">
              <h3 className="mb-3 font-semibold text-sky-900">Возраст участников</h3>
              <div className="space-y-2">
                {ages.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className={`h-3 rounded-sm ${a.color}`} style={{ width: `${a.count}%`, minWidth: "12px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }} />
                    <span className="text-sky-800/80">{a.range}</span>
                    <span className="ml-auto font-bold text-sky-900">{a.count}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlight */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { num: "81%", label: "знают о вреде, но не останавливаются" },
            { num: "150", label: "человек приняли участие в опросе" },
            { num: "89%", label: "хотят изменить своё питание" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/60 p-5 text-center">
              <div className="text-3xl font-bold text-cyan-600">{stat.num}</div>
              <div className="mt-1 text-sm text-sky-800/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
