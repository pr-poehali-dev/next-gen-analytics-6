import { useState } from "react"

const timeline = [
  {
    time: "0 мин",
    title: "Первый укус",
    icon: "🍔",
    color: "from-yellow-400 to-orange-400",
    bg: "from-yellow-300/40 to-orange-200/30",
    border: "border-yellow-300/50",
    events: [
      { organ: "🧠 Мозг", text: "Дофаминовый выброс — мгновенное «удовольствие». Те же рецепторы, что и при употреблении кокаина." },
      { organ: "👅 Вкусовые рецепторы", text: "Сочетание жир + соль + сахар активирует максимум рецепторов одновременно — это называют «bliss point» (точка блаженства)." },
      { organ: "🦷 Слюнные железы", text: "Ферменты начинают расщепление крахмала. Кислотность во рту снижается — начинается разрушение зубной эмали." },
    ],
  },
  {
    time: "10 мин",
    title: "Через 10 минут",
    icon: "⚡",
    color: "from-orange-400 to-red-400",
    bg: "from-orange-300/40 to-red-200/30",
    border: "border-orange-300/50",
    events: [
      { organ: "🩸 Кровь", text: "Уровень глюкозы резко растёт — до 130–150 мг/дл. Поджелудочная реагирует срочным выбросом инсулина." },
      { organ: "🫀 Сердце", text: "ЧСС увеличивается на 10–15%. Сосуды реагируют на скачок сахара — начинается воспалительная реакция эндотелия." },
      { organ: "🧠 Мозг", text: "Центры насыщения ещё молчат — лептин не успел сигнализировать. Вы хотите ещё, даже если уже достаточно съели." },
    ],
  },
  {
    time: "20 мин",
    title: "Через 20 минут",
    icon: "🔥",
    color: "from-red-400 to-pink-400",
    bg: "from-red-300/40 to-pink-200/30",
    border: "border-red-300/50",
    events: [
      { organ: "🫁 Пищевод и желудок", text: "Бургер попадает в желудок. Из-за большого объема жира — переваривание замедляется до 4–6 часов. Желудок раздут." },
      { organ: "🩸 Инсулин", text: "Достигает пика. Если это происходит регулярно — клетки теряют чувствительность к инсулину (инсулинорезистентность)." },
      { organ: "💊 Пищевые добавки", text: "E621 (глутамат натрия) усиливает восприятие вкуса. E150 (карамельный колорант) — потенциальный канцероген группы 2B." },
    ],
  },
  {
    time: "30 мин",
    title: "Через 30 минут",
    icon: "💧",
    color: "from-pink-400 to-purple-400",
    bg: "from-pink-300/40 to-purple-200/30",
    border: "border-pink-300/50",
    events: [
      { organ: "🧂 Натрий", text: "1–2г соли (около нормы) уже в крови. Почки начинают усиленно фильтровать. Артериальное давление повышается на 5–10 мм рт.ст." },
      { organ: "🧠 Мозг", text: "Уровень серотонина начинает снижаться после дофаминового пика. Формируется желание «добавки» — психологическая зависимость." },
      { organ: "🫀 Сосуды", text: "Трансжиры начинают встраиваться в клеточные мембраны сосудов. Этот процесс необратим на молекулярном уровне." },
    ],
  },
  {
    time: "60 мин",
    title: "Через 1 час",
    icon: "😴",
    color: "from-purple-400 to-indigo-400",
    bg: "from-purple-300/40 to-indigo-200/30",
    border: "border-purple-300/50",
    events: [
      { organ: "📉 Сахар в крови", text: "Резкое падение после инсулинового пика — гипогликемия. Симптомы: усталость, раздражительность, снова хочется есть." },
      { organ: "🧠 Когнитивные функции", text: "Скорость обработки информации снижается на 15–20%. «Туман в голове» после фастфуда — не иллюзия, а физиология." },
      { organ: "🦠 Кишечник", text: "Микробиом получает удар: рафинированный крахмал кормит условно-патогенные бактерии, вытесняя полезные лактобациллы." },
    ],
  },
  {
    time: "24 ч",
    title: "Через 24 часа",
    icon: "🔄",
    color: "from-indigo-400 to-teal-400",
    bg: "from-indigo-300/40 to-teal-200/30",
    border: "border-indigo-300/50",
    events: [
      { organ: "💧 Задержка жидкости", text: "Высокое содержание натрия вызывает отёки. Вы можете весить на 1–2 кг больше — это вода, задержанная тканями." },
      { organ: "🧬 Воспаление", text: "Маркеры воспаления (С-реактивный белок) повышены ещё 24 часа. Хроническое воспаление — основа большинства болезней цивилизации." },
      { organ: "😴 Сон", text: "Жирная еда нарушает циклы глубокого сна. Вы просыпаетесь менее отдохнувшим — и снова тянетесь к «быстрой энергии»." },
    ],
  },
]

export function BiochemSection() {
  const [active, setActive] = useState(0)
  const current = timeline[active]

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute right-[5%] top-[15%] h-44 w-44 rounded-full bg-orange-200/20 blur-2xl" style={{ animationDuration: "9s" }} />
        <div className="bubble absolute left-[8%] bottom-[15%] h-28 w-28 rounded-full bg-red-200/20 blur-xl" style={{ animationDuration: "7s", animationDelay: "3s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-block rounded-full border border-orange-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-orange-700">Биохимия · Таймлайн реакций</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Что происходит с телом<br />
            <span className="text-orange-500">после бургера</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Timeline nav */}
          <div className="glass-card rounded-2xl border border-white/60 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-sky-700/60">Выберите момент</div>
            <div className="space-y-2">
              {timeline.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full rounded-xl px-4 py-3 text-left transition-all duration-200 ${active === i
                    ? `bg-gradient-to-r ${t.color} text-white shadow-lg`
                    : "bg-white/30 text-sky-900 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{t.icon}</span>
                    <div>
                      <div className="text-xs font-mono opacity-80">{t.time}</div>
                      <div className="text-sm font-semibold">{t.title}</div>
                    </div>
                    {active === i && <span className="ml-auto">→</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="col-span-2">
            <div className={`glass-card rounded-2xl border p-6 bg-gradient-to-br ${current.bg} ${current.border}`}>
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${current.color} text-2xl shadow-lg`}>
                  {current.icon}
                </div>
                <div>
                  <div className="font-mono text-sm text-sky-600">{current.time}</div>
                  <div className="text-xl font-bold text-sky-900">{current.title}</div>
                </div>
              </div>

              <div className="space-y-4">
                {current.events.map((ev, i) => (
                  <div key={i} className="glass-card rounded-xl border border-white/50 p-4">
                    <div className="mb-1.5 font-semibold text-sky-900">{ev.organ}</div>
                    <p className="text-sm leading-relaxed text-sky-800/80">{ev.text}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="mb-1 flex justify-between text-xs text-sky-700/60">
                  <span>Степень воздействия на организм</span>
                  <span>{(active + 1) * 15 + 10}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/40">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${current.color} transition-all duration-500`}
                    style={{ width: `${(active + 1) * 15 + 10}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Fun fact */}
            <div className="mt-4 glass-card rounded-xl border border-white/60 px-5 py-3">
              <span className="mr-2 text-sm font-semibold text-sky-900">💡 Факт:</span>
              <span className="text-sm text-sky-800/80">
                {active === 0 && "Ощущение «хочу ещё» после первого укуса — запрограммировано учёными-вкусовиками корпораций."}
                {active === 1 && "Мозг получает сигнал о насыщении только через 20 минут — именно поэтому есть быстро = переедать."}
                {active === 2 && "Желудок может растягиваться до 4 литров — но это не значит, что так должно быть."}
                {active === 3 && "Американские кардиологи называют трансжиры «самой страшной едой, когда-либо созданной»."}
                {active === 4 && "Исследования Оксфорда: один «мусорный» обед снижает IQ-тест на 10% в течение следующих 3 часов."}
                {active === 5 && "После 10 дней диеты без фастфуда маркеры воспаления снижаются в среднем на 40%."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
