import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const q1Data = [
  { label: "Никогда/очень редко", value: 12, count: 36, color: "#22c55e" },
  { label: "2–3 раза в месяц", value: 28, count: 84, color: "#06b6d4" },
  { label: "1–2 раза в неделю", value: 41, count: 123, color: "#f97316" },
  { label: "Каждый день", value: 19, count: 57, color: "#ef4444" },
]

const q2Data = [
  { name: "Бургеры", value: 34, color: "#f97316" },
  { name: "Картофель фри", value: 21, color: "#facc15" },
  { name: "Пицца", value: 19, color: "#ef4444" },
  { name: "Шаурма", value: 14, color: "#a855f7" },
  { name: "Наггетсы и др.", value: 12, color: "#06b6d4" },
]

const q3Data = [
  { label: "Никогда", value: 26, count: 78, color: "#22c55e" },
  { label: "Скорее нет", value: 23, count: 69, color: "#06b6d4" },
  { label: "Иногда", value: 37, count: 111, color: "#f97316" },
  { label: "Часто", value: 14, count: 42, color: "#ef4444" },
]

const q4Data = [
  { label: "Считают полезным", value: 5, count: 15, color: "#ef4444" },
  { label: "Что-то слышали", value: 32, count: 96, color: "#f97316" },
  { label: "Знают в общих чертах", value: 45, count: 135, color: "#06b6d4" },
  { label: "Знают и объяснят", value: 18, count: 54, color: "#22c55e" },
]

interface TooltipPayload { color: string; name: string; value: number }
interface TooltipProps { active?: boolean; payload?: TooltipPayload[]; label?: string }
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl border border-white/60 px-3 py-2 text-xs shadow-lg">
        <div className="mb-1 font-semibold text-sky-900">{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>{p.name}: {p.value}%</div>
        ))}
      </div>
    )
  }
  return null
}

export function SurveySection() {
  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute right-[8%] top-[15%] h-40 w-40 rounded-full bg-teal-200/30 blur-2xl" style={{ animationDuration: "9s" }} />
        <div className="bubble absolute bottom-[10%] left-[5%] h-28 w-28 rounded-full bg-cyan-200/25 blur-xl" style={{ animationDuration: "7s", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <div className="mb-3 inline-block rounded-full border border-teal-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-teal-700">Социологический опрос · 300 респондентов · 12–17 лет · Discord</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Результаты исследования:<br />
            <span className="text-teal-600">подростки и фастфуд</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-sky-800/70">
            Опрос проводился в подростковой аудитории соцсети Discord. Возраст опрашиваемых: от 12 до 17 лет. Количество опрошенных: 300 человек.
          </p>
        </div>

        {/* Stat cards */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { num: "300", label: "Участников", emoji: "👥" },
            { num: "60%", label: "Едят 1–2+ раза/нед", emoji: "🍟" },
            { num: "51%", label: "Ощущают дискомфорт", emoji: "😟" },
            { num: "63%", label: "Знают о вреде", emoji: "🧠" },
          ].map((s, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/60 p-4 text-center">
              <div className="text-xl">{s.emoji}</div>
              <div className="text-2xl font-bold text-cyan-600">{s.num}</div>
              <div className="text-xs text-sky-800/70">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Q1 — Как часто */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-1 font-semibold text-sky-900">Вопрос 1. Как часто вы питаетесь фастфудом?</h3>
            <p className="mb-3 text-xs text-sky-700/60">Большинство подростков употребляют фастфуд не реже раза в неделю</p>
            <div className="space-y-2">
              {q1Data.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-36 shrink-0 text-xs text-sky-800/80">{item.label}</div>
                  <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="w-16 shrink-0 text-right text-xs font-bold text-sky-900">{item.value}% ({item.count})</div>
                </div>
              ))}
            </div>
          </div>

          {/* Q2 — Любимый фастфуд */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-1 font-semibold text-sky-900">Вопрос 2. Какой ваш любимый фастфуд?</h3>
            <p className="mb-3 text-xs text-sky-700/60">Наиболее популярные варианты среди опрошенных</p>
            <div className="flex items-center gap-3">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={q2Data} cx="50%" cy="50%" innerRadius={40} outerRadius={75} dataKey="value" paddingAngle={3}>
                    {q2Data.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {q2Data.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-sky-800/80">{item.name}</span>
                    <span className="ml-auto font-bold text-sky-900 text-sm">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Q3 — Самочувствие */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-1 font-semibold text-sky-900">Вопрос 3. Ощущаете ли вы проблемы с самочувствием?</h3>
            <p className="mb-3 text-xs text-sky-700/60">Более половины отметили ухудшение: тяжесть, сонливость, жажда</p>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={q3Data} margin={{ left: -10, right: 10 }}>
                <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#0369a1" }} />
                <YAxis tick={{ fontSize: 10, fill: "#0369a1" }} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Доля %" radius={[6, 6, 0, 0]}>
                  {q3Data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Q4 — Осведомлённость */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-1 font-semibold text-sky-900">Вопрос 4. Знаете ли вы о вреде состава?</h3>
            <p className="mb-3 text-xs text-sky-700/60">63% хорошо осведомлены, но это не снижает частоту употребления</p>
            <div className="space-y-2">
              {q4Data.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-36 shrink-0 text-xs text-sky-800/80">{item.label}</div>
                  <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-white/30">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.value}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="w-16 shrink-0 text-right text-xs font-bold text-sky-900">{item.value}% ({item.count})</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Вывод */}
        <div className="mt-4 glass-card rounded-2xl border border-teal-300/40 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-semibold text-sky-900">Вывод по результатам опроса</div>
              <p className="mt-1 text-sm text-sky-800/80">
                Анализ анкетирования показал, что фастфуд широко распространён среди подростков: 60% употребляют его не реже одного раза в неделю. Несмотря на то что 63% опрошенных осведомлены о возможном вреде, значительная часть регулярно употребляет такую пищу. Полученные данные подтверждают гипотезу о негативном влиянии фастфуда на организм.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
