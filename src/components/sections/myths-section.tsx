import { useState } from "react"

const myths = [
  {
    myth: "Фастфуд — это только бургеры и картошка фри",
    truth: "Скрытый фастфуд повсюду: «полезные» йогурты с фруктами содержат до 6 ч.л. сахара, пакетированные соки — концентрат с сахаром, гранола — часто 40% сахара и масла, «фитнес»-батончики — шоколадка под другим названием.",
    emoji: "🍔",
    tag: "Миф #1",
    color: "from-red-300/40 to-pink-200/30",
    border: "border-red-300/50",
    examples: ["Йогурт «Активиа» с черникой: 12г сахара", "Сок «Rich» апельсиновый: 22г сахара на стакан", "Granola Muesli: 38г сахара на 100г", "Батончик Corny: сахар на 2-м месте в составе"],
  },
  {
    myth: "Салат в фастфуд-ресторане — здоровый выбор",
    truth: "Салат «Цезарь» в McDonald's с заправкой и гренками содержит больше калорий и жира, чем стандартный гамбургер. Заправки промышленного производства — это трансжиры, усилители вкуса и консерванты.",
    emoji: "🥗",
    tag: "Миф #2",
    color: "from-green-300/40 to-lime-200/30",
    border: "border-green-300/50",
    examples: ["Цезарь в McD: 400 ккал, 30г жира", "Биг Мак: 503 ккал, 25г жира", "Заправка Ranch: 145 ккал на порцию", "«Лёгкая» заправка: всё равно 80 ккал"],
  },
  {
    myth: "Диетическая газировка не вредит здоровью",
    truth: "Аспартам и сукралоза в «лёгких» напитках стимулируют те же вкусовые рецепторы, что и сахар, поддерживая тягу к сладкому. Кислотность разрушает эмаль зубов так же, как обычная Cola. Ряд исследований связывает регулярное употребление с диабетом 2 типа.",
    emoji: "🥤",
    tag: "Миф #3",
    color: "from-cyan-300/40 to-blue-200/30",
    border: "border-cyan-300/50",
    examples: ["pH Cola Light: 2.7 (кислота!)", "pH апельсинового сока: 3.5", "pH здоровой эмали: 5.5+", "Риск диабета 2 типа: +26% при ежедневном употреблении"],
  },
  {
    myth: "Курица в фастфуде — это диетический вариант",
    truth: "Куриные наггетсы состоят из курицы примерно на 40–60%. Остальное — кожа, хрящи, крахмал, усилители вкуса. Панировка поглощает масло как губка: 100г наггетсов = 300 ккал и 18г жира. Это больше, чем в говяжьей котлете.",
    emoji: "🍗",
    tag: "Миф #4",
    color: "from-yellow-300/40 to-amber-200/30",
    border: "border-yellow-300/50",
    examples: ["Наггетсы KFC (6 шт): 270 ккал, 17г жира", "Куриная грудка 100г: 165 ккал, 3.6г жира", "Процент мяса в наггетсах: ~50%", "Масло для жарки: меняется раз в 4–8 часов"],
  },
  {
    myth: "Изредка можно — никакого вреда",
    truth: "Проблема не в разовом бургере, а в систематическом накоплении. Одна порция картофеля фри содержит до 300мг акриламида — канцерогена группы 2A. Регулярные «изредка» формируют микробиомные нарушения, заметные уже через 10 дней такой диеты.",
    emoji: "⚠️",
    tag: "Миф #5",
    color: "from-orange-300/40 to-red-200/30",
    border: "border-orange-300/50",
    examples: ["10 дней — изменения в микробиоме", "Акриламид: 300мкг в порции картофеля фри", "Эффект накопления трансжиров: необратим", "3 недели — заметное снижение разнообразия бактерий"],
  },
  {
    myth: "Фастфуд — это просто дешёвая еда для бедных",
    truth: "Средний чек в McDonald's для семьи из 4 человек — 2000–3000 руб. За те же деньги можно приготовить 3–4 полноценных домашних обеда. Фастфуд дороже здорового питания в пересчёте на калории и питательную ценность.",
    emoji: "💰",
    tag: "Миф #6",
    color: "from-purple-300/40 to-violet-200/30",
    border: "border-purple-300/50",
    examples: ["Обед на 4 в McD: ~2500 руб", "Домашний обед на 4: ~600 руб", "Цена 1г белка из курицы: 0.8 руб", "Цена 1г белка из наггетсов: 3.2 руб"],
  },
]

export function MythsSection() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute left-[5%] top-[25%] h-40 w-40 rounded-full bg-red-200/20 blur-2xl" style={{ animationDuration: "8s" }} />
        <div className="bubble absolute right-[8%] bottom-[20%] h-32 w-32 rounded-full bg-purple-200/20 blur-xl" style={{ animationDuration: "6s", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-10">
          <div className="mb-3 inline-block rounded-full border border-red-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-red-700">Разбор мифов · 6 заблуждений</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Мифы о еде,<br />
            <span className="text-red-500">в которые мы верим</span>
          </h2>
          <p className="mt-3 text-sky-800/70">Нажмите на карточку, чтобы узнать правду</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {myths.map((item, i) => (
            <button
              key={i}
              onClick={() => setFlipped(flipped === i ? null : i)}
              className={`glass-card relative rounded-2xl border p-5 text-left transition-all duration-300 ${item.border} bg-gradient-to-br ${item.color} hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs font-mono text-sky-700">{item.tag}</span>
                <span className="text-2xl">{item.emoji}</span>
              </div>

              {flipped === i ? (
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-700">✓ Правда</div>
                  <p className="mb-3 text-sm leading-relaxed text-sky-900">{item.truth}</p>
                  <div className="space-y-1">
                    {item.examples.map((ex, j) => (
                      <div key={j} className="flex items-start gap-1.5 text-xs text-sky-800/80">
                        <span className="mt-0.5 text-cyan-500">→</span>
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-sky-600/60">Нажмите, чтобы скрыть</div>
                </div>
              ) : (
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-600">✗ Миф</div>
                  <p className="text-sm font-medium leading-snug text-sky-900">{item.myth}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-sky-700/60">
                    <span>Нажмите, чтобы узнать правду</span>
                    <span>→</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
