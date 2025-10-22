interface AnswerProps {
  word: string;
  synonyms?: string[];
  percent?: number; // Добавил примерные проценты популярности
}

interface LevelPartProps {
  id: number;
  type: "text" | "image";
  question: string;
  image?: string;
  answers: AnswerProps[];
}

export interface LevelProps {
  id: number;
  starsForAccess: number;
  parts: LevelPartProps[];
}

export const gameData = {
  stars: 1000,
  storeCosts: {
    openLetter: 30,
    deleteLetters: 50,
    openWord: 80,
  }
}

export const levels: LevelProps[] = [
  {
    id: 1,
    starsForAccess: 0,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что берут с собой на пикник?",
        answers: [
          { word: "еда", percent: 34, synonyms: ["продукты", "закуски", "снеки"] },
          { word: "напитки", percent: 23, synonyms: ["вода", "сок", "лимонад"] },
          { word: "корзина", percent: 15, synonyms: ["сумка", "пикниковая корзина"] },
          { word: "плед", percent: 12, synonyms: ["одеяло", "коврик", "подстилка"] },
          { word: "шашлык", percent: 8, synonyms: ["мясо", "барбекю"] },
          { word: "посуда", percent: 5, synonyms: ["тарелки", "стаканы", "приборы"] },
          { word: "уголь", percent: 3, synonyms: ["дрова", "растопка"] },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "grill.jpg",
        answers: [
          { word: "гриль", percent: 45, synonyms: ["мангал", "барбекю", "жаровня"] },
          { word: "уголь", percent: 22, synonyms: ["угли", "топливо"] },
          { word: "шампуры", percent: 15, synonyms: ["шпажки", "вертел"] },
          { word: "решетка", percent: 12, synonyms: ["гриль-решетка"] },
          { word: "огонь", percent: 6, synonyms: ["пламя", "костер"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Что можно жарить на костре?",
        answers: [
          { word: "шашлык", percent: 38, synonyms: ["мясо", "кебаб"] },
          { word: "сосиски", percent: 25, synonyms: ["колбаски", "сардельки"] },
          { word: "картошка", percent: 18, synonyms: ["картофель", "печеная картошка"] },
          { word: "овощи", percent: 12, synonyms: ["кабачки", "болгарский перец", "кукуруза"] },
          { word: "хлеб", percent: 7, synonyms: ["тост", "гренки"] },
        ],
      },
    ],
  },
  {
    id: 2,
    starsForAccess: 0,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что можно найти в лесу?",
        answers: [
          { word: "деревья", percent: 28, synonyms: ["сосны", "березы", "дубы"] },
          { word: "грибы", percent: 24, synonyms: ["боровики", "опята", "лисички"] },
          { word: "ягоды", percent: 19, synonyms: ["земляника", "малина", "черника"] },
          { word: "животных", percent: 15, synonyms: ["звери", "птицы", "насекомые"] },
          { word: "шишки", percent: 8, synonyms: ["еловые", "сосновые"] },
          { word: "мох", percent: 6, synonyms: ["лишайник"] },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "mushroom.jpg",
        answers: [
          { word: "гриб", percent: 52, synonyms: ["поганка", "белый гриб", "сыроежка"] },
          { word: "мухомор", percent: 23, synonyms: ["красный гриб"] },
          { word: "ножка", percent: 12, synonyms: ["основание"] },
          { word: "шляпка", percent: 8, synonyms: ["верхушка", "колпак"] },
          { word: "ядовитый", percent: 5, synonyms: ["опасный", "несъедобный"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Какие животные живут в лесу?",
        answers: [
          { word: "заяц", percent: 22, synonyms: ["кролик", "беляк"] },
          { word: "лиса", percent: 20, synonyms: ["рыжая", "хитруля"] },
          { word: "волк", percent: 18, synonyms: ["серый", "хищник"] },
          { word: "медведь", percent: 15, synonyms: ["бурый", "косолапый"] },
          { word: "белка", percent: 12, synonyms: ["рыжая", "грызун"] },
          { word: "ёж", percent: 8, synonyms: ["колючий"] },
          { word: "олень", percent: 5, synonyms: ["рогатый", "лоси"] },
        ],
      },
    ],
  },
  {
    id: 3,
    starsForAccess: 0,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что можно увидеть на небе?",
        answers: [
          { word: "облака", percent: 31, synonyms: ["тучи", "перистые"] },
          { word: "солнце", percent: 26, synonyms: ["светило", "солнышко"] },
          { word: "звезды", percent: 18, synonyms: ["созвездия", "планеты"] },
          { word: "луна", percent: 12, synonyms: ["месяц", "спутник"] },
          { word: "самолет", percent: 8, synonyms: ["лайнер", "авиация"] },
          { word: "птицы", percent: 5, synonyms: ["пернатые", "стаи"] },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "rainbow.jpg",
        answers: [
          { word: "радуга", percent: 48, synonyms: ["семь цветов", "дуга"] },
          { word: "цвета", percent: 20, synonyms: ["красный", "оранжевый", "желтый", "зеленый", "голубой", "синий", "фиолетовый"] },
          { word: "небо", percent: 15, synonyms: ["воздух", "пространство"] },
          { word: "солнце", percent: 10, synonyms: ["светило"] },
          { word: "дождь", percent: 7, synonyms: ["ливень", "осадки"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Что бывает во время дождя?",
        answers: [
          { word: "лужи", percent: 32, synonyms: ["водоемы", "ямы"] },
          { word: "гроза", percent: 25, synonyms: ["молния", "гром"] },
          { word: "зонт", percent: 18, synonyms: ["зонтик", "трость"] },
          { word: "плащ", percent: 12, synonyms: ["дождевик", "накидка"] },
          { word: "мокро", percent: 8, synonyms: ["сыро", "влажно"] },
          { word: "поток", percent: 5, synonyms: ["ручей", "течение"] },
        ],
      },
    ],
  },
  {
    id: 4,
    starsForAccess: 3,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что люди делают на пляже?",
        answers: [
          { word: "загорают", percent: 27, synonyms: ["солнце", "отдых"] },
          { word: "купаются", percent: 24, synonyms: ["плавают", "ныряют"] },
          { word: "играют", percent: 18, synonyms: ["волейбол", "мяч"] },
          { word: "отдыхают", percent: 15, synonyms: ["расслабляются", "лежат"] },
          { word: "строят", percent: 10, synonyms: ["песок", "замки"] },
          { word: "загорают", percent: 6, synonyms: ["загар", "солнце"] },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "beach.jpg",
        answers: [
          { word: "пляж", percent: 41, synonyms: ["берег", "песок"] },
          { word: "море", percent: 23, synonyms: ["океан", "вода"] },
          { word: "песок", percent: 16, synonyms: ["песчинки", "пляжный"] },
          { word: "шезлонг", percent: 12, synonyms: ["лежак", "кресло"] },
          { word: "зонт", percent: 8, synonyms: ["от солнца", "тент"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Что берут с собой на пляж?",
        answers: [
          { word: "полотенце", percent: 25, synonyms: ["простыня", "махровое"] },
          { word: "купальник", percent: 22, synonyms: ["плавки", "бикини"] },
          { word: "крем", percent: 18, synonyms: ["от загара", "солнцезащитный"] },
          { word: "очки", percent: 15, synonyms: ["солнечные", "темные"] },
          { word: "шапочка", percent: 12, synonyms: ["панама", "кепка"] },
          { word: "надувной", percent: 8, synonyms: ["круг", "матрас"] },
        ],
      },
    ],
  },
  {
    id: 5,
    starsForAccess: 4,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что можно найти на кухне?",
        answers: [
          { word: "плита", percent: 21, synonyms: ["газовая", "электрическая"] },
          { word: "холодильник", percent: 19, synonyms: ["морозилка", "охлаждение"] },
          { word: "посуда", percent: 17, synonyms: ["тарелки", "кастрюли"] },
          { word: "стол", percent: 14, synonyms: ["обеденный", "кухонный"] },
          { word: "стул", percent: 12, synonyms: ["табурет", "сиденье"] },
          { word: "нож", percent: 9, synonyms: ["лезвие", "резак"] },
          { word: "вилка", percent: 8, synonyms: ["прибор", "столовый"] },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "refrigerator.jpg",
        answers: [
          { word: "холодильник", percent: 55, synonyms: ["морозилка", "рефрижератор"] },
          { word: "еда", percent: 20, synonyms: ["продукты", "запасы"] },
          { word: "дверца", percent: 12, synonyms: ["ручка", "открывание"] },
          { word: "полка", percent: 8, synonyms: ["стеклянная", "пластиковая"] },
          { word: "морозилка", percent: 5, synonyms: ["заморозка", "холод"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Что готовят на завтрак?",
        answers: [
          { word: "яичница", percent: 28, synonyms: ["омлет", "глазунья"] },
          { word: "каша", percent: 24, synonyms: ["овсянка", "гречка"] },
          { word: "бутерброд", percent: 20, synonyms: ["сэндвич", "тост"] },
          { word: "кофе", percent: 15, synonyms: ["напиток", "зерна"] },
          { word: "блины", percent: 13, synonyms: ["оладьи", "панкейки"] },
        ],
      },
    ],
  },
];