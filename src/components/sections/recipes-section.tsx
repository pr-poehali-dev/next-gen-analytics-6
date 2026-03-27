import { useState } from "react"

const recipes = [
  { id: 1, name: "Боул с киноа и авокадо", alt: "вместо бургера", emoji: "🥑", time: "15 мин", cal: "380 ккал", kbju: { k: 380, b: 14, zh: 18, u: 42 }, tags: ["Без глютена", "Веган"], color: "from-green-300/40 to-teal-300/30", photo: "https://cdn.poehali.dev/projects/7ea48c83-3929-4a55-9dd1-7b233f185143/files/4c2cbfb3-f513-4c19-b127-015092c6f719.jpg", ingredients: ["200г киноа", "1 авокадо", "Черри-томаты", "Шпинат", "Лимонный сок", "Оливковое масло"], steps: "Отварить киноа. Нарезать авокадо и томаты. Выложить на шпинат, заправить лимоном и маслом." },
  { id: 2, name: "Бургер с индейкой", alt: "вместо McBurger", emoji: "🍔", time: "20 мин", cal: "420 ккал", kbju: { k: 420, b: 38, zh: 12, u: 38 }, tags: ["Высокий белок"], color: "from-orange-300/40 to-yellow-300/30", photo: "https://cdn.poehali.dev/projects/7ea48c83-3929-4a55-9dd1-7b233f185143/files/bc110871-96f1-4047-b537-71e5b84f57ca.jpg", ingredients: ["Котлета из индейки", "Цельнозерновая булка", "Листья салата", "Томат", "Горчица", "Авокадо-соус"], steps: "Запечь котлету без масла. Собрать бургер на цельнозерновой булке с овощами и авокадо-соусом." },
  { id: 3, name: "Домашняя пицца на тонком тесте", alt: "вместо Domino's", emoji: "🍕", time: "30 мин", cal: "290 ккал/кусок", tags: ["Семья", "Веселье"], color: "from-red-300/40 to-pink-300/30", photo: "https://cdn.poehali.dev/projects/7ea48c83-3929-4a55-9dd1-7b233f185143/files/30955ecf-2fbb-4572-985c-2f0c034850a5.jpg", ingredients: ["Тесто на воде", "Томатный соус", "Рикотта", "Шпинат", "Вяленые томаты", "Базилик"], steps: "Раскатать тесто тонко. Намазать томатный соус, выложить рикотту, шпинат, томаты. Печь 12 мин при 220°C." },
  { id: 4, name: "Фалафель в лаваше", alt: "вместо шаурмы", emoji: "🌯", time: "25 мин", cal: "350 ккал", tags: ["Веган", "Сытно"], color: "from-yellow-300/40 to-amber-300/30", ingredients: ["Нут консервированный", "Чеснок", "Кумин", "Петрушка", "Тонкий лаваш", "Йогурт-соус"], steps: "Смешать нут со специями, сформировать шарики, запечь при 190°C 20 минут. Завернуть в лаваш с соусом." },
  { id: 5, name: "Запечённый батат-фри", alt: "вместо картофеля фри", emoji: "🍠", time: "30 мин", cal: "180 ккал", tags: ["Без жарки", "Витамины"], color: "from-orange-400/40 to-red-300/30", photo: "https://cdn.poehali.dev/projects/7ea48c83-3929-4a55-9dd1-7b233f185143/files/36a2436c-2551-405e-b823-855be9a02840.jpg", ingredients: ["1 батат", "Оливковое масло", "Паприка", "Чеснок", "Морская соль", "Йогурт для дипа"], steps: "Нарезать батат соломкой, смешать с маслом и специями, запечь при 200°C 25 минут." },
  { id: 6, name: "Смузи-боул", alt: "вместо молочного коктейля", emoji: "🍓", time: "10 мин", cal: "280 ккал", tags: ["Завтрак", "Антиоксиданты"], color: "from-pink-300/40 to-rose-300/30", photo: "https://cdn.poehali.dev/projects/7ea48c83-3929-4a55-9dd1-7b233f185143/files/eb5cde36-73d5-44de-bb9c-4bcc07234334.jpg", ingredients: ["Замороженная клубника", "Банан", "Греческий йогурт", "Мюсли", "Семена чиа", "Мёд"], steps: "Взбить ягоды с йогуртом до густой консистенции. Вылить в боул, украсить топпингами." },
  { id: 7, name: "Тако с тунцом", alt: "вместо рыбного бургера", emoji: "🌮", time: "15 мин", cal: "320 ккал", tags: ["Омега-3", "Быстро"], color: "from-cyan-300/40 to-blue-300/30", ingredients: ["Тунец консервированный", "Кукурузные тортильи", "Капуста", "Лайм", "Кинза", "Чили-соус"], steps: "Нагреть тортильи. Смешать тунец с капустой и лаймом. Выложить начинку, добавить чили-соус." },
  { id: 8, name: "Греческий салат-рол", alt: "вместо хот-дога", emoji: "🥙", time: "10 мин", cal: "290 ккал", tags: ["Средиземноморье"], color: "from-blue-300/40 to-indigo-300/30", ingredients: ["Тонкий лаваш", "Фета", "Огурец", "Оливки", "Томаты", "Орегано"], steps: "Выложить ингредиенты на лаваш. Свернуть рулетом, разрезать пополам." },
  { id: 9, name: "Суп мисо с тофу", alt: "вместо куриного супа", emoji: "🍲", time: "15 мин", cal: "120 ккал", tags: ["Пробиотики", "Лёгкий"], color: "from-amber-300/40 to-yellow-300/30", ingredients: ["Паста мисо", "Тофу", "Нори", "Зелёный лук", "Вода 500мл", "Имбирь"], steps: "Растворить мисо в горячей воде (не кипятить!). Добавить тофу кубиками, нори и лук." },
  { id: 10, name: "Куриные стрипсы в духовке", alt: "вместо наггетсов", emoji: "🍗", time: "25 мин", cal: "310 ккал", tags: ["Дети", "Белок"], color: "from-yellow-400/40 to-orange-300/30", photo: "https://cdn.poehali.dev/projects/7ea48c83-3929-4a55-9dd1-7b233f185143/files/a8c9db79-fe5f-4838-a6eb-e4b12d269146.jpg", ingredients: ["Куриное филе", "Греческий йогурт", "Панировочные сухари", "Паприка", "Чесночный порошок", "Лимон"], steps: "Замариновать курицу в йогурте со специями. Обвалять в сухарях, запечь при 200°C 20 минут." },
  { id: 11, name: "Энергетические шары", alt: "вместо шоколадного десерта", emoji: "⚡", time: "15 мин", cal: "150 ккал (2 шт)", tags: ["Снек", "Без выпечки"], color: "from-emerald-300/40 to-green-300/30", ingredients: ["Овсянка", "Арахисовая паста", "Мёд", "Семена чиа", "Шоколадная крошка 70%", "Кокосовая стружка"], steps: "Смешать все ингредиенты, скатать шарики, охладить 30 минут в холодильнике." },
  { id: 12, name: "Паста из нута со шпинатом", alt: "вместо спагетти болоньезе", emoji: "🍝", time: "20 мин", cal: "390 ккал", tags: ["Без глютена", "Клетчатка"], color: "from-lime-300/40 to-green-300/30", ingredients: ["Паста из нута", "Шпинат", "Чеснок", "Оливковое масло", "Лимон", "Пармезан"], steps: "Отварить нутовую пасту. Обжарить чеснок, добавить шпинат, перемешать с пастой и лимоном." },
  { id: 13, name: "Яблочные чипсы с корицей", alt: "вместо Pringles", emoji: "🍎", time: "2 часа (в духовке)", cal: "80 ккал", tags: ["Снек", "Дети"], color: "from-red-300/40 to-orange-300/30", ingredients: ["2 яблока", "Корица", "Сахар (опционально)", "Лимонный сок"], steps: "Нарезать яблоки тонкими кольцами, сбрызнуть лимоном, посыпать корицей. Сушить при 100°C 2 часа." },
  { id: 14, name: "Акай-боул", alt: "вместо мороженого", emoji: "🫐", time: "10 мин", cal: "300 ккал", tags: ["Суперфуд", "Антиоксиданты"], color: "from-purple-400/40 to-violet-300/30", ingredients: ["Пакет акаи", "Банан", "Кокосовое молоко", "Гранола", "Свежие ягоды", "Семена конопли"], steps: "Взбить акаи с бананом и молоком. Выложить в боул, украсить гранолой и ягодами." },
  { id: 15, name: "Рисовые роллы с лососем", alt: "вместо суши из доставки", emoji: "🍱", time: "25 мин", cal: "250 ккал", tags: ["Омега-3", "Японская кухня"], color: "from-sky-300/40 to-cyan-300/30", ingredients: ["Рис для суши", "Слабосолёный лосось", "Авокадо", "Нори", "Рисовый уксус", "Соевый соус"], steps: "Приготовить рис с уксусом. Выложить нори, рис, лосось и авокадо, свернуть ролл, нарезать." },
  { id: 16, name: "Омлет с овощами", alt: "вместо завтрака в McDonald's", emoji: "🍳", time: "10 мин", cal: "260 ккал", tags: ["Завтрак", "Белок"], color: "from-yellow-300/40 to-lime-300/30", ingredients: ["3 яйца", "Болгарский перец", "Шпинат", "Фета", "Зелёный лук", "Оливковое масло"], steps: "Взбить яйца, вылить на сковороду с маслом, добавить овощи, посыпать фетой и свернуть." },
  { id: 17, name: "Тыквенный крем-суп", alt: "вместо супа из пакета", emoji: "🎃", time: "30 мин", cal: "150 ккал", tags: ["Осень", "Иммунитет"], color: "from-orange-400/40 to-amber-300/30", ingredients: ["Тыква 500г", "Кокосовое молоко", "Имбирь", "Куркума", "Лук", "Овощной бульон"], steps: "Обжарить лук, добавить тыкву и бульон. Варить 20 минут, взбить блендером, добавить кокосовое молоко." },
  { id: 18, name: "Протеиновые блины", alt: "вместо сдобной выпечки", emoji: "🥞", time: "15 мин", cal: "200 ккал", tags: ["Завтрак", "Спорт"], color: "from-amber-300/40 to-yellow-300/30", ingredients: ["Банан", "2 яйца", "Протеин ванильный", "Корица", "Черника", "Греческий йогурт"], steps: "Размять банан с яйцами и протеином. Жарить на антипригарной сковороде без масла. Подать с йогуртом." },
  { id: 19, name: "Хумус с овощными палочками", alt: "вместо чипсов с дипом", emoji: "🥕", time: "10 мин", cal: "180 ккал", tags: ["Снек", "Клетчатка"], color: "from-orange-300/40 to-yellow-300/30", ingredients: ["Нут консервированный", "Тахини", "Лимонный сок", "Чеснок", "Морковь", "Сельдерей"], steps: "Взбить нут с тахини, лимоном и чесноком. Подать с нарезанными морковью и сельдереем." },
  { id: 20, name: "Ягодный смузи без сахара", alt: "вместо газировки", emoji: "🥤", time: "5 мин", cal: "130 ккал", tags: ["Напиток", "Витамин С"], color: "from-pink-400/40 to-rose-300/30", ingredients: ["Малина замороженная", "Клубника", "Банан", "Миндальное молоко", "Семена льна", "Лёд"], steps: "Все ингредиенты поместить в блендер, взбить до однородности. Подавать сразу." },
  { id: 21, name: "Запечённая рыба с лимоном", alt: "вместо рыбных палочек", emoji: "🐟", time: "20 мин", cal: "220 ккал", tags: ["Омега-3", "Диета"], color: "from-blue-300/40 to-sky-300/30", ingredients: ["Филе трески/тилапии", "Лимон", "Чеснок", "Укроп", "Оливковое масло", "Каперсы"], steps: "Рыбу выложить на пергамент, сбрызнуть маслом, добавить лимон и чеснок. Запечь 18 мин при 180°C." },
  { id: 22, name: "Медово-горчичный лосось", alt: "вместо жареной рыбы", emoji: "🍣", time: "20 мин", cal: "340 ккал", tags: ["Омега-3", "Премиум"], color: "from-orange-400/40 to-amber-300/30", ingredients: ["Филе лосося", "Мёд", "Горчица дижонская", "Соевый соус", "Чеснок", "Кунжут"], steps: "Замариновать лосось в смеси мёда, горчицы и соевого соуса. Запечь 15 минут при 200°C." },
  { id: 23, name: "Куриный рулет с зеленью", alt: "вместо колбасы", emoji: "🌿", time: "40 мин", cal: "280 ккал", tags: ["Белок", "Без добавок"], color: "from-green-400/40 to-lime-300/30", ingredients: ["Куриное филе", "Шпинат", "Фета", "Вяленые томаты", "Чеснок", "Прованские травы"], steps: "Отбить филе, выложить начинку, свернуть рулет. Запечь в фольге при 180°C 35 минут." },
  { id: 24, name: "Тост с авокадо и яйцом", alt: "вместо сэндвича из кафе", emoji: "🥚", time: "10 мин", cal: "310 ккал", tags: ["Завтрак", "Тренд"], color: "from-lime-300/40 to-green-300/30", ingredients: ["Цельнозерновой хлеб", "1 авокадо", "Яйцо пашот", "Чили-флейки", "Лимонный сок", "Морская соль"], steps: "Размять авокадо с лимоном и солью. Намазать на тост. Сверху положить яйцо пашот, посыпать чили." },
  { id: 25, name: "Фруктовый салат с мятой", alt: "вместо фруктового йогурта из магазина", emoji: "🍉", time: "10 мин", cal: "140 ккал", tags: ["Витамины", "Освежающий"], color: "from-pink-300/40 to-watermelon-300/30", ingredients: ["Арбуз", "Клубника", "Черника", "Мята свежая", "Лайм", "Мёд"], steps: "Нарезать фрукты, смешать с мятой. Сбрызнуть лаймом и мёдом. Подавать охлаждённым." },
  { id: 26, name: "Лимонная курица с киноа", alt: "вместо KFC", emoji: "🍋", time: "30 мин", cal: "420 ккал", tags: ["Полноценный обед", "Белок"], color: "from-yellow-300/40 to-lime-300/30", ingredients: ["Куриное бедро", "Киноа", "Лимон", "Тимьян", "Чеснок", "Оливковое масло"], steps: "Замариновать курицу с лимоном и тимьяном. Запечь при 190°C 25 минут. Подать с варёным киноа." },
  { id: 27, name: "Шоколадные трюфели без сахара", alt: "вместо конфет", emoji: "🍫", time: "20 мин", cal: "110 ккал (2 шт)", tags: ["Десерт", "70% какао"], color: "from-brown-300/40 to-amber-400/30", ingredients: ["Какао-паста 70%", "Кокосовые сливки", "Финики", "Ваниль", "Какао-порошок", "Фундук"], steps: "Растопить какао с кокосовыми сливками. Добавить финиковую пасту, охладить, скатать шарики, обвалять в какао." },
  { id: 28, name: "Боул с эдамаме", alt: "вместо закусок в баре", emoji: "🌱", time: "15 мин", cal: "330 ккал", tags: ["Веган", "Белок"], color: "from-green-300/40 to-emerald-300/30", ingredients: ["Эдамаме 200г", "Бурый рис", "Морковь", "Огурец", "Соевый соус", "Кунжут"], steps: "Отварить рис, разморозить эдамаме. Выложить все ингредиенты в боул, заправить соевым соусом и кунжутом." },
  { id: 29, name: "Запечённые груши с рикоттой", alt: "вместо пирожного", emoji: "🍐", time: "25 мин", cal: "180 ккал", tags: ["Десерт", "Элегантно"], color: "from-amber-300/40 to-lime-300/30", ingredients: ["2 груши", "Рикотта", "Мёд", "Корица", "Грецкие орехи", "Ваниль"], steps: "Разрезать груши пополам, убрать сердцевину. Запечь 20 минут, подать с рикоттой, мёдом и орехами." },
  { id: 30, name: "Детокс-вода с огурцом", alt: "вместо сладкого напитка", emoji: "💧", time: "5 мин + настой", cal: "0 ккал", tags: ["Гидратация", "Детокс"], color: "from-cyan-300/40 to-teal-300/30", ingredients: ["Огурец", "Мята", "Лимон", "Имбирь", "Вода 1.5л", "Лёд"], steps: "Нарезать огурец, лимон и имбирь. Добавить мяту, залить водой и дать настояться 2 часа в холодильнике." },
]

export function RecipesSection() {
  const [selected, setSelected] = useState<typeof recipes[0] | null>(null)
  const [filter, setFilter] = useState("Все")

  const categories = ["Все", "Завтрак", "Снек", "Веган", "Омега-3", "Десерт", "Белок"]

  const filtered = filter === "Все" ? recipes : recipes.filter(r => r.tags.some(t => t.includes(filter)))

  return (
    <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-6 py-16 md:px-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble absolute left-[5%] top-[10%] h-36 w-36 rounded-full bg-green-200/30 blur-2xl" style={{ animationDuration: "8s" }} />
        <div className="bubble absolute right-[10%] bottom-[15%] h-24 w-24 rounded-full bg-cyan-200/25 blur-xl" style={{ animationDuration: "6s", animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 inline-block rounded-full border border-green-300/60 bg-white/40 px-4 py-1.5 backdrop-blur-md">
            <p className="font-mono text-xs text-green-700">Буклет · 30 рецептов</p>
          </div>
          <h2 className="font-sans text-4xl font-bold leading-tight text-sky-900 md:text-5xl">
            Аналоги:<br />
            <span className="text-green-600">здоровые замены фастфуду</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${filter === cat
                ? "border-green-400 bg-green-500/20 text-green-800 shadow-inner"
                : "border-white/60 bg-white/30 text-sky-800 hover:bg-white/50"
              } backdrop-blur-md`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {filtered.map(recipe => (
            <button
              key={recipe.id}
              onClick={() => setSelected(recipe)}
              className={`glass-card rounded-2xl border border-white/60 bg-gradient-to-br ${recipe.color} p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="mb-2 text-2xl">{recipe.emoji}</div>
              <div className="mb-1 text-xs font-medium text-green-700/80">{recipe.alt}</div>
              <div className="font-semibold text-sky-900 text-sm leading-tight">{recipe.name}</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-sky-800/60">
                <span>⏱ {recipe.time}</span>
                <span>🔥 {recipe.cal}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className={`glass-card max-w-md w-full rounded-3xl border border-white/70 bg-gradient-to-br ${selected.color} overflow-hidden shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            {"photo" in selected && selected.photo && (
              <div className="relative h-44 w-full overflow-hidden">
                <img src={(selected as {photo: string}).photo} alt={selected.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <div className="absolute bottom-3 left-4 text-2xl">{selected.emoji}</div>
              </div>
            )}
            <div className="p-6">
            {!("photo" in selected && selected.photo) && <div className="mb-1 text-4xl">{selected.emoji}</div>}
            <div className="mb-1 text-sm text-green-700">Альтернатива: {selected.alt}</div>
            <h3 className="mb-1 text-xl font-bold text-sky-900">{selected.name}</h3>
            <div className="mb-4 flex gap-3 text-sm text-sky-700">
              <span>⏱ {selected.time}</span>
              <span>🔥 {selected.cal}</span>
            </div>
            <div className="mb-4">
              <div className="mb-2 font-semibold text-sky-900">Ингредиенты:</div>
              <div className="flex flex-wrap gap-2">
                {selected.ingredients.map((ing, i) => (
                  <span key={i} className="rounded-full bg-white/60 px-3 py-1 text-xs text-sky-800">{ing}</span>
                ))}
              </div>
            </div>
            {"kbju" in selected && selected.kbju && (
              <div className="mb-4 grid grid-cols-4 gap-2 rounded-xl bg-white/40 p-3">
                {[
                  { label: "Ккал", val: (selected.kbju as {k:number;b:number;zh:number;u:number}).k, color: "text-orange-600" },
                  { label: "Белки", val: `${(selected.kbju as {k:number;b:number;zh:number;u:number}).b}г`, color: "text-blue-600" },
                  { label: "Жиры", val: `${(selected.kbju as {k:number;b:number;zh:number;u:number}).zh}г`, color: "text-yellow-600" },
                  { label: "Углев.", val: `${(selected.kbju as {k:number;b:number;zh:number;u:number}).u}г`, color: "text-green-600" },
                ].map(n => (
                  <div key={n.label} className="text-center">
                    <div className={`text-base font-bold ${n.color}`}>{n.val}</div>
                    <div className="text-xs text-sky-700/60">{n.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div>
              <div className="mb-1 font-semibold text-sky-900">Приготовление:</div>
              <p className="text-sm leading-relaxed text-sky-800/80">{selected.steps}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {selected.tags.map(tag => (
                <span key={tag} className="rounded-full bg-green-500/20 border border-green-400/40 px-3 py-0.5 text-xs text-green-800">{tag}</span>
              ))}
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-xl bg-white/60 py-2 text-sm font-medium text-sky-900 hover:bg-white/80 transition-colors border border-white/70"
            >
              Закрыть
            </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}