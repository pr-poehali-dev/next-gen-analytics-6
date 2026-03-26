export function TheorySection() {
  const facts = [
    {
      icon: "🫀",
      title: "Сердечно-сосудистая система",
      text: "Трансжиры и насыщенные жиры из фастфуда повышают уровень «плохого» холестерина (ЛПНП), закупоривают артерии и увеличивают риск инфаркта на 27%. Регулярное употребление гамбургеров и картофеля фри ассоциировано с атеросклерозом уже в возрасте 30 лет.",
      color: "from-red-400/30 to-pink-300/20",
      border: "border-red-300/50",
    },
    {
      icon: "🧠",
      title: "Нервная система и мозг",
      text: "Высокое содержание сахара и рафинированных углеводов вызывает резкие скачки глюкозы в крови, что провоцирует «туман в голове», снижение концентрации и хроническую усталость. Исследования связывают диету с фастфудом с повышенным риском депрессии на 51%.",
      color: "from-purple-400/30 to-indigo-300/20",
      border: "border-purple-300/50",
    },
    {
      icon: "🦷",
      title: "Пищеварительная система",
      text: "Практически полное отсутствие клетчатки нарушает микробиом кишечника — колонию из триллионов полезных бактерий. Это ведёт к хроническим воспалениям, синдрому раздражённого кишечника и ослаблению иммунитета, так как 70% иммунных клеток сосредоточено в кишечнике.",
      color: "from-orange-400/30 to-yellow-300/20",
      border: "border-orange-300/50",
    },
    {
      icon: "⚖️",
      title: "Обмен веществ и ожирение",
      text: "Один прием пищи в McDonald's может содержать 1500+ ккал — суточную норму подростка. Фастфуд специально разработан так, чтобы обходить сигналы насыщения: сочетание жира, соли и сахара вызывает зависимость, схожую с наркотической, что делает переедание практически неизбежным.",
      color: "from-teal-400/30 to-cyan-300/20",
      border: "border-teal-300/50",
    },
    {
      icon: "🧬",
      title: "Онкологические риски",
      text: "ВОЗ классифицирует переработанное мясо (колбасы, наггетсы) как канцерогены группы 1. Акриламид, образующийся при жарке картофеля фри, признан вероятным канцерогеном. Систематическое употребление таких продуктов повышает риск рака толстой кишки на 18%.",
      color: "from-blue-400/30 to-sky-300/20",
      border: "border-blue-300/50",
    },
    {
      icon: "💊",
      title: "Зависимость и психология",
      text: "Сахар активирует те же дофаминовые рецепторы, что и кокаин. Корпорации тратят миллиарды на разработку «блаженной точки» — идеального соотношения соли, жира и сахара, вызывающего непреодолимое желание есть снова. Это не слабость воли — это нейробиология.",
      color: "from-green-400/30 to-emerald-300/20",
      border: "border-green-300/50",
    },
  ]

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
            <p className="font-mono text-xs text-cyan-700">Научные факты</p>
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
            <div
              key={i}
              className={`glass-card rounded-2xl border p-5 ${fact.border} bg-gradient-to-br ${fact.color} transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="mb-3 text-3xl">{fact.icon}</div>
              <h3 className="mb-2 font-semibold text-sky-900">{fact.title}</h3>
              <p className="text-sm leading-relaxed text-sky-800/80">{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
