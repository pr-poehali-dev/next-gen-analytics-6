import { useState, useRef, useEffect } from "react"
import Icon from "@/components/ui/icon"

type Message = { role: "user" | "ai"; text: string }

const faqAnswers: Record<string, string> = {
  "калор": "Средний обед в McDonald's содержит около 1100–1400 ккал — это почти суточная норма для человека с малоподвижным образом жизни. Для сравнения, тарелка овощного супа с цельнозерновым хлебом — около 350 ккал и даст вам в 3 раза больше насыщения благодаря клетчатке.",
  "сахар": "В одной порции Coca-Cola (0.5л) содержится около 53г сахара — это 13 чайных ложек! ВОЗ рекомендует не более 25г свободного сахара в день. Сахар активирует дофаминовую систему мозга аналогично некоторым наркотикам, создавая циклы тяги и переедания.",
  "трансжир": "Трансжиры (частично гидрогенизированные масла) повышают «плохой» холестерин и снижают «хороший». Они содержатся в картошке фри, пирожках и других жареных продуктах фастфуда. Многие страны полностью запретили их, но в некоторых сетях они всё ещё используются.",
  "альтернатив": "Лучшие быстрые альтернативы: яблоко с арахисовой пастой (10 мин), тост с авокадо (5 мин), греческий йогурт с ягодами (2 мин), хумус с овощами (готово). Ключевой принцип — готовить заранее: batch cooking по воскресеньям сэкономит время всю неделю.",
  "похудет": "Замена фастфуда домашней едой даже без подсчёта калорий в среднем снижает потребление на 500–700 ккал в день. Это создаёт дефицит, достаточный для потери 0.5–1 кг в неделю. Главное — замена, а не жёсткое ограничение.",
  "дети": "У детей, регулярно питающихся фастфудом, риск ожирения выше в 2.3 раза. Из-за высокого содержания соли и сахара формируются «неправильные» вкусовые предпочтения. Детям до 12 лет ВОЗ вообще не рекомендует употребление переработанной пищи.",
  "наггет": "В куриных наггетсах содержится около 40–60% реального мяса, остальное — кожа, соединительная ткань, ароматизаторы и наполнители. Домашняя альтернатива: куриное филе, обваленное в йогурте и цельнозерновых сухарях, запечённое в духовке — готовится за 20 минут.",
  "натри": "Одна порция картофеля фри в KFC содержит около 500–700мг натрия — треть суточной нормы. Высокое потребление соли повышает артериальное давление и нагрузку на почки. Привычка к соли формируется и разрушается: через 2–3 недели без солёного вы перестанете её замечать.",
  "здоров": "Здоровое питание строится на простых принципах: 50% тарелки — овощи и зелень, 25% — белок (рыба, птица, бобовые), 25% — сложные углеводы (крупы, бурый рис). Добавьте воду вместо сладких напитков, и вы уже на 80% здоровее большинства.",
  "фастфуд": "Глобальная индустрия фастфуда стоит более 800 миллиардов долларов и тратит около 5 миллиардов ежегодно на рекламу, направленную прежде всего на детей и подростков. Это не случайность — формирование привычек в детстве создаёт клиентов на всю жизнь.",
}

const defaultAnswer = "Хороший вопрос о питании! Могу рассказать о: калорийности фастфуда, содержании сахара и соли, трансжирах, здоровых альтернативах, влиянии на детей, советах по похудению. Попробуйте спросить что-то из этого! 🥗"

const suggestions = [
  "Сколько калорий в бургере?",
  "Чем заменить наггетсы?",
  "Как перестать есть фастфуд?",
  "Что не так с трансжирами?",
  "Как питаться правильно?",
]

function getAnswer(text: string): string {
  const lower = text.toLowerCase()
  for (const key of Object.keys(faqAnswers)) {
    if (lower.includes(key)) return faqAnswers[key]
  }
  return defaultAnswer
}

export function AiSection() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Привет! Я Gemini — твой помощник по здоровому питанию 🌿 Спроси меня о вреде фастфуда, калориях, альтернативах или советах по питанию." },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: "user", text }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setTyping(true)

    setTimeout(() => {
      const answer = getAnswer(text)
      setTyping(false)
      setMessages(prev => [...prev, { role: "ai", text: answer }])
    }, 900 + Math.random() * 600)
  }

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute right-[5%] top-[20%] h-44 w-44 rounded-full bg-violet-200/25 blur-2xl" style={{ animationDuration: "10s" }} />
        <div className="bubble absolute left-[10%] bottom-[20%] h-28 w-28 rounded-full bg-cyan-200/30 blur-xl" style={{ animationDuration: "7s", animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-block rounded-full border border-violet-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-violet-700">AI-ассистент · работает локально</p>
          </div>
          <h2 className="font-sans text-4xl font-bold text-sky-900 md:text-5xl">
            Спроси <span className="text-violet-600">Gemini</span>
          </h2>
          <p className="mt-2 text-sky-800/70">Умный помощник по вопросам питания и здоровья</p>
        </div>

        {/* Chat window */}
        <div className="glass-card overflow-hidden rounded-3xl border border-white/70 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/30 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 px-5 py-4 backdrop-blur-md">
            <div className="pulse-glow flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500">
              <span className="text-lg">✨</span>
            </div>
            <div>
              <div className="font-semibold text-sky-900">Gemini · Нутрициология</div>
              <div className="flex items-center gap-1.5 text-xs text-green-600">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Онлайн
              </div>
            </div>
            <div className="ml-auto flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <div className="h-3 w-3 rounded-full bg-green-400/70" />
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto space-y-4 p-5" style={{ scrollbarWidth: "none" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
                {msg.role === "ai" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm">✨</div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "rounded-tr-sm bg-gradient-to-br from-cyan-500 to-teal-500 text-white"
                      : "rounded-tl-sm bg-white/70 text-sky-900 border border-white/80"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 text-sm">🙂</div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm">✨</div>
                <div className="flex gap-1.5 rounded-2xl rounded-tl-sm bg-white/70 border border-white/80 px-4 py-3">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-violet-400" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="border-t border-white/30 px-5 py-3 bg-white/20 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-cyan-300/60 bg-white/50 px-3 py-1 text-xs text-sky-800 hover:bg-cyan-100/60 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                placeholder="Спроси о питании..."
                className="flex-1 rounded-xl border border-white/60 bg-white/60 px-4 py-2.5 text-sm text-sky-900 placeholder-sky-800/40 outline-none focus:border-cyan-400 focus:bg-white/80 transition-all backdrop-blur-sm"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || typing}
                className="glossy-btn flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white transition-all hover:scale-105 disabled:opacity-50"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-sky-700/60">
          AI-ассистент работает полностью локально · ответы основаны на научных данных
        </p>
      </div>
    </section>
  )
}
