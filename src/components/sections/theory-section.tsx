import { useState } from "react"

interface Fact {
  icon: string
  title: string
  text: string
  color: string
  border: string
  details: {
    subtitle: string
    body: string
    stats: { label: string; value: string }[]
    tip: string
  }
}

const facts: Fact[] = [
  {
    icon: "🫀",
    title: "Сердечно-сосудистая система",
    text: "Трансжиры и насыщенные жиры из фастфуда повышают уровень «плохого» холестерина, закупоривают артерии и увеличивают риск инфаркта на 27%.",
    color: "from-red-400/30 to-pink-300/20",
    border: "border-red-300/50",
    details: {
      subtitle: "Как фастфуд разрушает сердце",
      body: "Трансжиры — частично гидрогенизированные масла — одновременно повышают «плохой» холестерин (ЛПНП) и снижают «хороший» (ЛПВП). Это двойной удар по сердечно-сосудистой системе. Регулярное употребление гамбургеров и картофеля фри ассоциировано с атеросклерозом — образованием бляшек в артериях — уже в возрасте 30 лет.\n\nВысокое содержание натрия приводит к гипертонии: артерии теряют эластичность, сердцу приходится работать с увеличенной нагрузкой. ВОЗ признала переработанные мясные продукты одним из главных факторов риска сердечно-сосудистых заболеваний.",
      stats: [
        { label: "Риск инфаркта", value: "+27%" },
        { label: "Натрий в одной порции фри", value: "700 мг" },
        { label: "Норма натрия в сутки", value: "2000 мг" },
        { label: "Холестерин ЛПНП", value: "↑ на 23%" },
      ],
      tip: "Замена одного приёма фастфуда в неделю на домашнюю еду снижает риск сердечно-сосудистых заболеваний на 14% в долгосрочной перспективе.",
    },
  },
  {
    icon: "🧠",
    title: "Нервная система и мозг",
    text: "Высокое содержание сахара и рафинированных углеводов вызывает скачки глюкозы, снижение концентрации и хроническую усталость. Риск депрессии повышается на 51%.",
    color: "from-purple-400/30 to-indigo-300/20",
    border: "border-purple-300/50",
    details: {
      subtitle: "Фастфуд и умственная деятельность",
      body: "Мозг — самый энергоёмкий орган, потребляющий 20% всей энергии тела. Он крайне чувствителен к качеству питания. Резкий скачок сахара после еды из фастфуда создаёт кратковременный прилив энергии, за которым следует резкий спад — «углеводный провал». Это ощущение сонливости и «тумана в голове».\n\nИсследование Университета Мельбурна (2012) показало связь между регулярным употреблением фастфуда и сокращением гиппокампа — области мозга, отвечающей за память и обучение. Омега-6 жирные кислоты из фастфуда вытесняют полезные омега-3, необходимые для нейронных связей.",
      stats: [
        { label: "Риск депрессии", value: "+51%" },
        { label: "Снижение концентрации", value: "-40%" },
        { label: "Объём гиппокампа", value: "↓ при диете FF" },
        { label: "Скачок глюкозы", value: "в 3–5 раз" },
      ],
      tip: "Жирная рыба (лосось, сардина) содержит омега-3 кислоты, которые защищают нейронные связи и улучшают настроение.",
    },
  },
  {
    icon: "🦷",
    title: "Пищеварительная система",
    text: "Отсутствие клетчатки нарушает микробиом кишечника, ведёт к хроническим воспалениям, синдрому раздражённого кишечника и ослаблению иммунитета.",
    color: "from-orange-400/30 to-yellow-300/20",
    border: "border-orange-300/50",
    details: {
      subtitle: "Кишечник — второй мозг",
      body: "В кишечнике живёт около 100 триллионов бактерий — микробиом. Это сложная экосистема, которая влияет не только на пищеварение, но и на иммунитет, настроение и даже поведение. 70% иммунных клеток сосредоточено именно здесь.\n\nФастфуд практически лишён клетчатки — главной пищи для полезных бактерий. Эмульгаторы, консерванты и искусственные ароматизаторы уничтожают микробное разнообразие. Исследование показало: всего 10 дней питания McDonald's снизили разнообразие кишечных бактерий на 40%. Восстановление занимает несколько месяцев.",
      stats: [
        { label: "Снижение микробиома", value: "-40% за 10 дней" },
        { label: "Клетчатка в бургере", value: "< 1 г" },
        { label: "Норма клетчатки/сут", value: "25–35 г" },
        { label: "Иммунных клеток в кишечнике", value: "70%" },
      ],
      tip: "Всего одна порция квашеной капусты или стакан кефира в день поддерживают разнообразие микробиома.",
    },
  },
  {
    icon: "⚖️",
    title: "Обмен веществ и ожирение",
    text: "Один приём в McDonald's может содержать 1500+ ккал — суточную норму подростка. Фастфуд специально разработан так, чтобы обходить сигналы насыщения.",
    color: "from-teal-400/30 to-cyan-300/20",
    border: "border-teal-300/50",
    details: {
      subtitle: "Почему фастфуд вызывает переедание",
      body: "Корпорации фастфуда вложили миллиарды в поиск «блаженной точки» — идеального соотношения соли, жира и сахара, при котором мозг не получает сигнала насыщения и хочет есть ещё. Это нейробиологический феномен, а не слабость воли.\n\nВысококалорийная пища с малым объёмом не растягивает желудок — механизм насыщения просто не срабатывает. Рафинированные углеводы (белый хлеб, картофель фри) резко поднимают и быстро обрушивают уровень инсулина, что вызывает новый голод уже через 1–2 часа. Жировые клетки при этом активно делятся.",
      stats: [
        { label: "Калорий в среднем обеде", value: "1100–1500 ккал" },
        { label: "Норма подростка/сутки", value: "1800–2200 ккал" },
        { label: "Сахар в Coca-Cola 0.5л", value: "53 г (13 ложек)" },
        { label: "Риск ожирения у детей", value: "+230%" },
      ],
      tip: "Перед едой выпейте стакан воды и подождите 5 минут. Часто мозг путает жажду с голодом.",
    },
  },
  {
    icon: "🧬",
    title: "Онкологические риски",
    text: "ВОЗ классифицирует переработанное мясо как канцерогены группы 1. Акриламид из картофеля фри — вероятный канцероген. Риск рака толстой кишки выше на 18%.",
    color: "from-blue-400/30 to-sky-300/20",
    border: "border-blue-300/50",
    details: {
      subtitle: "Канцерогены в обычной еде",
      body: "В 2015 году Международное агентство по изучению рака (IARC, входит в ВОЗ) классифицировало переработанное мясо — колбасы, сосиски, наггетсы — как канцерогены группы 1 (доказанные канцерогены). Это та же группа, что и табачный дым.\n\nАкриламид — химическое вещество, образующееся при жарке крахмалистых продуктов (картофеля) при температуре выше 120°C. IARC признало его «вероятным канцерогеном» (группа 2A). Каждая порция картофеля фри содержит его. Нитриты, использующиеся для консервации мяса в фастфуде, в желудке преобразуются в нитрозамины — один из сильнейших канцерогенов.",
      stats: [
        { label: "Группа канцерогенности FF-мяса", value: "Группа 1 ВОЗ" },
        { label: "Риск рака толстой кишки", value: "+18%" },
        { label: "Акриламид в фри", value: "до 1000 мкг/кг" },
        { label: "Безопасный уровень акриламида", value: "не установлен" },
      ],
      tip: "Запекание и варка при низких температурах не образуют акриламид — это безопаснее жарки во фритюре.",
    },
  },
  {
    icon: "💊",
    title: "Зависимость и психология",
    text: "Сахар активирует те же дофаминовые рецепторы, что и кокаин. Корпорации тратят миллиарды на разработку формул переедания. Это нейробиология, а не слабость воли.",
    color: "from-green-400/30 to-emerald-300/20",
    border: "border-green-300/50",
    details: {
      subtitle: "Почему так сложно отказаться от фастфуда",
      body: "Сахар стимулирует выброс дофамина в прилежащем ядре мозга — центре удовольствия. Это та же система вознаграждения, которую активируют наркотики. Мозг буквально «запоминает» удовольствие от сахара и требует повторения.\n\nЖирная, солёная и сладкая пища одновременно создаёт максимальный отклик дофаминовой системы. Именно поэтому картошка фри с кетчупом так «вкусна» — это химически сконструированный продукт. Маркетинг фастфуда намеренно направлен на детей: яркие цвета, игрушки в Happy Meal, клоуны — всё это формирует эмоциональную привязанность с раннего возраста.",
      stats: [
        { label: "Выброс дофамина от сахара", value: "≈ как от кокаина" },
        { label: "Реклама фастфуда детям/год", value: "5 млрд $ (глобально)" },
        { label: "Дети видят рекламу FF в день", value: "до 10 раз" },
        { label: "Вероятность смены питания", value: "↓ при зависимости" },
      ],
      tip: "Замена сладкого на горький шоколад (70%+) постепенно перестраивает вкусовые рецепторы за 2–4 недели.",
    },
  },
]

export function TheorySection() {
  const [selected, setSelected] = useState<Fact | null>(null)

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      {/* Bubble decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-cyan-300/20 blur-xl" style={{ animationDuration: "6s" }} />
        <div className="bubble absolute right-[15%] top-[40%] h-20 w-20 rounded-full bg-teal-300/25 blur-lg" style={{ animationDuration: "8s", animationDelay: "2s" }} />
        <div className="bubble absolute bottom-[20%] left-[40%] h-24 w-24 rounded-full bg-sky-300/20 blur-xl" style={{ animationDuration: "7s", animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10">
          <div className="mb-3 inline-block rounded-full border border-cyan-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-cyan-700">Научные факты · нажмите на блок для подробностей</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Как фастфуд влияет<br />
            <span className="text-cyan-600">на ваш организм</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-sky-800/70">
            Фастфуд — это не просто «нездоровая еда». Это индустрия, оптимизированная для максимального потребления в ущерб вашему здоровью.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact, i) => (
            <button
              key={i}
              onClick={() => setSelected(fact)}
              className={`glass-card rounded-2xl border p-5 ${fact.border} bg-gradient-to-br ${fact.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left cursor-pointer group`}
            >
              <div className="mb-3 text-3xl">{fact.icon}</div>
              <h3 className="mb-2 font-semibold text-sky-900">{fact.title}</h3>
              <p className="text-sm leading-relaxed text-sky-800/80">{fact.text}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-cyan-600 group-hover:text-cyan-700 transition-colors">
                <span>Подробнее</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,20,40,0.55)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className={`glass-card relative w-full max-w-lg rounded-3xl border border-white/70 bg-gradient-to-br ${selected.color} p-6 shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/40 text-sky-900 hover:bg-white/60 transition-colors text-lg font-bold"
            >
              ×
            </button>

            <div className="mb-4 flex items-center gap-3">
              <span className="text-4xl">{selected.icon}</span>
              <div>
                <div className="text-xs text-sky-600 mb-0.5">Научный факт</div>
                <h3 className="font-bold text-sky-900 text-xl leading-tight">{selected.title}</h3>
              </div>
            </div>

            <div className="mb-4 text-sm font-semibold text-sky-800">{selected.details.subtitle}</div>

            <p className="mb-4 text-sm leading-relaxed text-sky-800/90 whitespace-pre-line">{selected.details.body}</p>

            <div className="mb-4 grid grid-cols-2 gap-2">
              {selected.details.stats.map((s, i) => (
                <div key={i} className="rounded-xl bg-white/30 border border-white/50 p-3 text-center">
                  <div className="text-base font-black text-sky-900">{s.value}</div>
                  <div className="text-xs text-sky-700/70 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-teal-300/50 bg-teal-100/30 p-3 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-sky-800/90 leading-relaxed">{selected.details.tip}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
