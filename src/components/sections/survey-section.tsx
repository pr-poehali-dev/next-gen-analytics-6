import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, PieChart, Pie, Cell } from "recharts"

const genderData = [
  { category: "Фастфуд 3+/нед", парни: 72, девушки: 48 },
  { category: "Знают о вреде", парни: 74, девушки: 91 },
  { category: "Хотят изменить", парни: 79, девушки: 96 },
  { category: "Готовят дома", парни: 31, девушки: 67 },
  { category: "ПП — дорого", парни: 63, девушки: 52 },
]

const ageData = [
  { age: "14–15", fastfood: 82, healthy: 18 },
  { age: "16–17", fastfood: 74, healthy: 26 },
  { age: "18–20", fastfood: 65, healthy: 35 },
  { age: "21–25", fastfood: 51, healthy: 49 },
  { age: "25–35", fastfood: 38, healthy: 62 },
]

const radarData = [
  { subject: "Овощи", парни: 35, девушки: 72 },
  { subject: "Фрукты", парни: 48, девушки: 80 },
  { subject: "Белок", парни: 71, девушки: 60 },
  { subject: "Вода 2л+", парни: 40, девушки: 55 },
  { subject: "Завтрак", парни: 52, девушки: 68 },
  { subject: "Снеки", парни: 78, девушки: 65 },
]

const pieData = [
  { name: "Картошка фри", value: 34, color: "#ef4444" },
  { name: "Бургеры", value: 28, color: "#f97316" },
  { name: "Пицца", value: 19, color: "#a855f7" },
  { name: "Наггетсы", value: 12, color: "#06b6d4" },
  { name: "Другое", value: 7, color: "#22c55e" },
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
        <div className="mb-8">
          <div className="mb-3 inline-block rounded-full border border-teal-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-teal-700">Исследование · 150 респондентов · 2025</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Аналитика опроса:<br />
            <span className="text-teal-600">кто и как питается</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { num: "150", label: "Участников", emoji: "👥" },
            { num: "81%", label: "Знают о вреде", emoji: "🧠" },
            { num: "89%", label: "Хотят измениться", emoji: "🌱" },
            { num: "68%", label: "Едят 1–3 раза/нед", emoji: "🍟" },
          ].map((s, i) => (
            <div key={i} className="glass-card rounded-2xl border border-white/60 p-4 text-center">
              <div className="text-xl">{s.emoji}</div>
              <div className="text-2xl font-bold text-cyan-600">{s.num}</div>
              <div className="text-xs text-sky-800/70">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Gender comparison bar */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-4 font-semibold text-sky-900">Парни vs Девушки, %</h3>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={genderData} layout="vertical" margin={{ left: 0, right: 10 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#0369a1" }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 9, fill: "#0369a1" }} width={90} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="парни" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                <Bar dataKey="девушки" fill="#f472b6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Age stacked bar */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-4 font-semibold text-sky-900">Фастфуд vs ПП по возрасту</h3>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={ageData} margin={{ left: -10, right: 10 }}>
                <XAxis dataKey="age" tick={{ fontSize: 10, fill: "#0369a1" }} />
                <YAxis tick={{ fontSize: 10, fill: "#0369a1" }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="fastfood" name="Фастфуд %" stackId="a" fill="#f97316" />
                <Bar dataKey="healthy" name="Здоровое %" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-4 font-semibold text-sky-900">Пищевые привычки по полу</h3>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(0,150,200,0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#0369a1" }} />
                <Radar name="Парни" dataKey="парни" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                <Radar name="Девушки" dataKey="девушки" stroke="#f472b6" fill="#f472b6" fillOpacity={0.3} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie */}
          <div className="glass-card rounded-2xl border border-white/60 p-5">
            <h3 className="mb-4 font-semibold text-sky-900">Самый популярный фастфуд</h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="55%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="h-3 w-3 flex-shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sky-800/80 text-xs">{item.name}</span>
                    <span className="ml-auto font-bold text-sky-900 text-sm">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-5 glass-card rounded-2xl border border-teal-300/40 bg-gradient-to-r from-teal-300/20 to-cyan-300/20 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-semibold text-sky-900">Главный вывод исследования</div>
              <p className="mt-1 text-sm text-sky-800/80">
                Осведомлённость о вреде фастфуда высокая — 81%, но она не конвертируется в изменение поведения. Главные барьеры: привычка, доступность и цена. Девушки в 2 раза чаще готовят дома. Молодёжь 14–17 лет — самая уязвимая группа: 82% регулярно едят фастфуд.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}