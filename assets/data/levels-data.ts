interface AnswerProps {
  word: string;
  synonyms?: string[];
  percent?: number;
  extraLetters?: string[];
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
          { 
            word: "еда", 
            percent: 34, 
            synonyms: ["продукты", "закуски", "снеки"],
            extraLetters: ["К", "Е", "Е", "О", "П", "Д", "Р", "А", "С", "Т", "М", "Н", "А", "В", "К", "Е", "Д", "А"]
          },
          { 
            word: "напитки", 
            percent: 23, 
            synonyms: ["вода", "сок", "лимонад"],
            extraLetters: ["Т", "Н", "К", "И", "А", "П", "П", "С", "Р", "В", "О", "М", "Т", "И", "К", "Н", "А", "Ы"]
          },
          { 
            word: "корзина", 
            percent: 15, 
            synonyms: ["сумка", "пикниковая корзина"],
            extraLetters: ["К", "И", "Н", "А", "О", "Р", "З", "С", "Т", "В", "К", "О", "М", "Р", "А", "З", "И", "Н"]
          },
          { 
            word: "плед", 
            percent: 12, 
            synonyms: ["одеяло", "коврик", "подстилка"],
            extraLetters: ["П", "Л", "О", "Д", "С", "Е", "К", "А", "Р", "Т", "И", "М", "П", "Е", "Л", "Д", "В", "О"]
          },
          { 
            word: "шашлык", 
            percent: 8, 
            synonyms: ["мясо", "барбекю"],
            extraLetters: ["Ш", "А", "Ш", "К", "Л", "Ы", "М", "С", "О", "Р", "Т", "Н", "А", "К", "Ш", "Л", "Ы", "И"]
          },
          { 
            word: "посуда", 
            percent: 5, 
            synonyms: ["тарелки", "стаканы", "приборы"],
            extraLetters: ["П", "О", "С", "У", "Д", "А", "К", "Т", "Р", "П", "Л", "О", "И", "С", "А", "Д", "В", "Ы"]
          },
          { 
            word: "уголь", 
            percent: 3, 
            synonyms: ["дрова", "растопка"],
            extraLetters: ["У", "Г", "О", "Л", "Ь", "К", "Д", "Р", "А", "В", "М", "О", "У", "С", "Г", "Л", "Т", "Ь"]
          },
        ],
      },
      {
        id: 2,
        type: "text",
        question: "Что можно встретить в лесу?",
        answers: [
          { 
            word: "деревья", 
            percent: 28, 
            synonyms: ["сосны", "березы", "дубы"],
            extraLetters: ["Д", "Е", "Р", "Е", "В", "Ь", "Я", "Л", "С", "П", "О", "Н", "А", "Т", "Д", "В", "Ь", "Е"]
          },
          { 
            word: "грибы", 
            percent: 22, 
            synonyms: ["опята", "лисички", "подберезовики"],
            extraLetters: ["Г", "Р", "И", "Б", "Ы", "Л", "П", "О", "Ж", "К", "Г", "М", "Р", "С", "И", "Т", "Б", "А"]
          },
          { 
            word: "звери", 
            percent: 18, 
            synonyms: ["животные", "зайцы", "лисы"],
            extraLetters: ["З", "В", "Е", "Р", "И", "Ж", "О", "Т", "Н", "Л", "С", "Ы", "З", "А", "Е", "Р", "М", "К"]
          },
          { 
            word: "тропинка", 
            percent: 15, 
            synonyms: ["дорожка", "путь", "тропа"],
            extraLetters: ["Т", "Р", "О", "П", "И", "Н", "К", "А", "Д", "Ж", "Т", "О", "С", "П", "Н", "Р", "А", "К"]
          },
          { 
            word: "ягоды", 
            percent: 10, 
            synonyms: ["земляника", "черника", "малина"],
            extraLetters: ["Я", "Г", "О", "Д", "Ы", "Л", "К", "Б", "М", "А", "Н", "С", "Я", "Р", "Г", "Д", "Ы", "П"]
          },
          { 
            word: "ручей", 
            percent: 7, 
            synonyms: ["речка", "источник", "родник"],
            extraLetters: ["Р", "У", "Ч", "Е", "Й", "К", "А", "Н", "И", "Т", "О", "Р", "С", "Ч", "У", "Е", "Й", "Д"]
          },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Какие профессии существуют?",
        answers: [
          { 
            word: "врач", 
            percent: 25, 
            synonyms: ["доктор", "медик", "терапевт"],
            extraLetters: ["В", "Р", "А", "Ч", "Д", "О", "К", "Т", "М", "Е", "И", "В", "Р", "Ч", "А", "Л", "Б", "П"]
          },
          { 
            word: "учитель", 
            percent: 20, 
            synonyms: ["преподаватель", "педагог", "наставник"],
            extraLetters: ["У", "Ч", "И", "Т", "Е", "Л", "Ь", "П", "Р", "Д", "А", "В", "О", "У", "И", "Т", "Е", "Л"]
          },
          { 
            word: "инженер", 
            percent: 18, 
            synonyms: ["конструктор", "техник", "проектировщик"],
            extraLetters: ["И", "Н", "Ж", "Е", "Н", "Е", "Р", "К", "Т", "О", "С", "П", "И", "Р", "Н", "Е", "Г", "Е"]
          },
          { 
            word: "повар", 
            percent: 15, 
            synonyms: ["кулинар", "шеф-повар", "кондитер"],
            extraLetters: ["П", "О", "В", "А", "Р", "К", "У", "Л", "Н", "Т", "Ы", "Д", "П", "А", "В", "О", "Р", "М"]
          },
          { 
            word: "строитель", 
            percent: 12, 
            synonyms: ["рабочий", "монтажник", "прораб"],
            extraLetters: ["С", "Т", "Р", "О", "И", "Т", "Е", "Л", "Ь", "М", "Н", "А", "Ж", "Р", "Б", "С", "И", "Т"]
          },
          { 
            word: "водитель", 
            percent: 10, 
            synonyms: ["шофер", "автомобилист", "дальнобойщик"],
            extraLetters: ["В", "О", "Д", "И", "Т", "Е", "Л", "Ь", "Ш", "Ф", "Р", "А", "М", "В", "О", "Т", "И", "Л"]
          },
        ],
      }
    ]
  },
  {
    id: 2,
    starsForAccess: 0,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Проверка 1",
        answers: [
          { word: "123", percent: 50, synonyms: ["ответ"], extraLetters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
          { word: "234", percent: 50, synonyms: ["ответ"], extraLetters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
        ],
      },
      {
        id: 2,
        type: "text",
        question: "Проверка 2",
        answers: [
          { word: "123", percent: 50, synonyms: ["ответ"], extraLetters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
          { word: "234", percent: 50, synonyms: ["ответ"], extraLetters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Проверка 3",
        answers: [
          { word: "123", percent: 50, synonyms: ["ответ"], extraLetters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
          { word: "234", percent: 50, synonyms: ["ответ"], extraLetters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
        ],
      },
    ],
  }
];



//   {
//     id: 2,
//     starsForAccess: 0,
//     parts: [
//       {
//         id: 1,
//         type: "text",
//         question: "Что можно найти в лесу?",
//         answers: [
//           { word: "деревья", percent: 28, synonyms: ["сосны", "березы", "дубы"] },
//           { word: "грибы", percent: 24, synonyms: ["боровики", "опята", "лисички"] },
//           { word: "ягоды", percent: 19, synonyms: ["земляника", "малина", "черника"] },
//           { word: "животных", percent: 15, synonyms: ["звери", "птицы", "насекомые"] },
//           { word: "шишки", percent: 8, synonyms: ["еловые", "сосновые"] },
//           { word: "мох", percent: 6, synonyms: ["лишайник"] },
//         ],
//       },
//       {
//         id: 2,
//         type: "image",
//         question: "Что это?",
//         image: "mushroom.jpg",
//         answers: [
//           { word: "гриб", percent: 52, synonyms: ["поганка", "белый гриб", "сыроежка"] },
//           { word: "мухомор", percent: 23, synonyms: ["красный гриб"] },
//           { word: "ножка", percent: 12, synonyms: ["основание"] },
//           { word: "шляпка", percent: 8, synonyms: ["верхушка", "колпак"] },
//           { word: "ядовитый", percent: 5, synonyms: ["опасный", "несъедобный"] },
//         ],
//       },
//       {
//         id: 3,
//         type: "text",
//         question: "Какие животные живут в лесу?",
//         answers: [
//           { word: "заяц", percent: 22, synonyms: ["кролик", "беляк"] },
//           { word: "лиса", percent: 20, synonyms: ["рыжая", "хитруля"] },
//           { word: "волк", percent: 18, synonyms: ["серый", "хищник"] },
//           { word: "медведь", percent: 15, synonyms: ["бурый", "косолапый"] },
//           { word: "Белка", percent: 12, synonyms: ["Рыжая", "Грызун"] },
//           { word: "ёж", percent: 8, synonyms: ["колючий"] },
//           { word: "олень", percent: 5, synonyms: ["рогатый", "лоси"] },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     starsForAccess: 0,
//     parts: [
//       {
//         id: 1,
//         type: "text",
//         question: "Что можно увидеть на небе?",
//         answers: [
//           { word: "облака", percent: 31, synonyms: ["тучи", "перистые"] },
//           { word: "солнце", percent: 26, synonyms: ["светило", "солнышко"] },
//           { word: "звезды", percent: 18, synonyms: ["созвездия", "планеты"] },
//           { word: "луна", percent: 12, synonyms: ["месяц", "спутник"] },
//           { word: "самолет", percent: 8, synonyms: ["лайнер", "авиация"] },
//           { word: "птицы", percent: 5, synonyms: ["пернатые", "стаи"] },
//         ],
//       },
//       {
//         id: 2,
//         type: "image",
//         question: "Что это?",
//         image: "rainbow.jpg",
//         answers: [
//           { word: "радуга", percent: 48, synonyms: ["семь цветов", "дуга"] },
//           { word: "цвета", percent: 20, synonyms: ["красный", "оранжевый", "желтый", "зеленый", "голубой", "синий", "фиолетовый"] },
//           { word: "небо", percent: 15, synonyms: ["воздух", "пространство"] },
//           { word: "солнце", percent: 10, synonyms: ["светило"] },
//           { word: "дождь", percent: 7, synonyms: ["ливень", "осадки"] },
//         ],
//       },
//       {
//         id: 3,
//         type: "text",
//         question: "Проверка",
//         answers: [
//           { word: "1", percent: 50, synonyms: ["омлет", "глазунья"] },
//           { word: "2", percent: 50, synonyms: ["овсянка", "гречка"] },
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     starsForAccess: 3,
//     parts: [
//       {
//         id: 1,
//         type: "text",
//         question: "Что люди делают на пляже?",
//         answers: [
//           { word: "загорают", percent: 27, synonyms: ["солнце", "отдых"] },
//           { word: "купаются", percent: 24, synonyms: ["плавают", "ныряют"] },
//           { word: "играют", percent: 18, synonyms: ["волейбол", "мяч"] },
//           { word: "отдыхают", percent: 15, synonyms: ["расслабляются", "лежат"] },
//           { word: "строят", percent: 10, synonyms: ["песок", "замки"] },
//           { word: "загорают", percent: 6, synonyms: ["загар", "солнце"] },
//         ],
//       },
//       {
//         id: 2,
//         type: "image",
//         question: "Что это?",
//         image: "beach.jpg",
//         answers: [
//           { word: "пляж", percent: 41, synonyms: ["берег", "песок"] },
//           { word: "море", percent: 23, synonyms: ["океан", "вода"] },
//           { word: "песок", percent: 16, synonyms: ["песчинки", "пляжный"] },
//           { word: "шезлонг", percent: 12, synonyms: ["лежак", "кресло"] },
//           { word: "зонт", percent: 8, synonyms: ["от солнца", "тент"] },
//         ],
//       },
//       {
//         id: 3,
//         type: "text",
//         question: "Что берут с собой на пляж?",
//         answers: [
//           { word: "полотенце", percent: 25, synonyms: ["простыня", "махровое"] },
//           { word: "купальник", percent: 22, synonyms: ["плавки", "бикини"] },
//           { word: "крем", percent: 18, synonyms: ["от загара", "солнцезащитный"] },
//           { word: "очки", percent: 15, synonyms: ["солнечные", "темные"] },
//           { word: "шапочка", percent: 12, synonyms: ["панама", "кепка"] },
//           { word: "надувной", percent: 8, synonyms: ["круг", "матрас"] },
//         ],
//       },
//     ],
//   },
//   {
//     id: 5,
//     starsForAccess: 4,
//     parts: [
//       {
//         id: 1,
//         type: "text",
//         question: "Что можно найти на кухне?",
//         answers: [
//           { word: "плита", percent: 21, synonyms: ["газовая", "электрическая"] },
//           { word: "холодильник", percent: 19, synonyms: ["морозилка", "охлаждение"] },
//           { word: "посуда", percent: 17, synonyms: ["тарелки", "кастрюли"] },
//           { word: "стол", percent: 14, synonyms: ["обеденный", "кухонный"] },
//           { word: "стул", percent: 12, synonyms: ["табурет", "сиденье"] },
//           { word: "нож", percent: 9, synonyms: ["лезвие", "резак"] },
//           { word: "вилка", percent: 8, synonyms: ["прибор", "столовый"] },
//         ],
//       },
//       {
//         id: 2,
//         type: "image",
//         question: "Что это?",
//         image: "refrigerator.jpg",
//         answers: [
//           { word: "холодильник", percent: 55, synonyms: ["морозилка", "рефрижератор"] },
//           { word: "еда", percent: 20, synonyms: ["продукты", "запасы"] },
//           { word: "дверца", percent: 12, synonyms: ["ручка", "открывание"] },
//           { word: "полка", percent: 8, synonyms: ["стеклянная", "пластиковая"] },
//           { word: "морозилка", percent: 5, synonyms: ["заморозка", "холод"] },
//         ],
//       },
//       {
//         id: 3,
//         type: "text",
//         question: "Что готовят на завтрак?",
//         answers: [
//           { word: "яичница", percent: 28, synonyms: ["омлет", "глазунья"] },
//           { word: "каша", percent: 24, synonyms: ["овсянка", "гречка"] },
//           { word: "бутерброд", percent: 20, synonyms: ["сэндвич", "тост"] },
//           { word: "кофе", percent: 15, synonyms: ["напиток", "зерна"] },
//           { word: "блины", percent: 13, synonyms: ["оладьи", "панкейки"] },
//         ],
//       },
//     ],
//   },
//   {
//     id: 6,
//     starsForAccess: 0,
//     parts: [
//       {
//         id: 1,
//         type: "text",
//         question: "Проверка 1",
//         answers: [
//           { word: "1", percent: 50, synonyms: ["ответ 1"] },
//           { word: "2", percent: 50, synonyms: ["ответ 2"] },
//         ],
//       },
//       {
//         id: 2,
//         type: "text",
//         question: "Проверка 2",
//         answers: [
//           { word: "1", percent: 50, synonyms: ["ответ 1"] },
//           { word: "2", percent: 50, synonyms: ["ответ 2"] },
//         ],
//       },
//       {
//         id: 3,
//         type: "text",
//         question: "Проверка 3",
//         answers: [
//           { word: "1", percent: 50, synonyms: ["ответ 1"] },
//           { word: "2", percent: 50, synonyms: ["ответ 2"] },
//         ],
//       },
//     ],
//   }

// ];