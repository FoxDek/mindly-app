interface AnswerProps {
  word: string;
  synonyms?: string[];
}

interface LevelPartProps {
  id: number;
  type: "text" | "image";
  question: string;
  image?: string; // Используется только если type === "image"
  answers: AnswerProps[];
}


export interface LevelProps {
  id: number;
  parts: LevelPartProps[];
}



export const levels = [
  {
    id: 1,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что берут с собой на пикник?",
        answers: [
          {
            word: "корзина",
            synonyms: ["пикниковая корзина", "сумка"],
          },
          {
            word: "плед",
            synonyms: ["одеяло", "коврик"],
          },
          {
            word: "еда",
            synonyms: ["закуски", "продукты"],
          },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "grill.jpg",
        answers: [
          { word: "гриль", synonyms: ["мангал", "барбекю"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Что можно жарить на костре?",
        answers: [
          { word: "шашлык", synonyms: ["мясо"] },
          { word: "сосиски", synonyms: ["колбаски"] },
          { word: "картошка", synonyms: ["картофель"] },
        ],
      },
    ],
  },
  {
    id: 2,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что можно найти в лесу?",
        answers: [
          {
            word: "грибы",
            synonyms: ["боровики", "опята"],
          },
          {
            word: "ягоды",
            synonyms: ["земляника", "малина"],
          },
          {
            word: "деревья",
            synonyms: ["сосны", "берёзы"],
          },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "mushroom.jpg",
        answers: [
          { word: "гриб", synonyms: ["поганка", "белый гриб"] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Какие животные живут в лесу?",
        answers: [
          { word: "волк", synonyms: [] },
          { word: "лиса", synonyms: [] },
          { word: "заяц", synonyms: ["кролик"] },
        ],
      },
    ],
  },
  {
    id: 3,
    parts: [
      {
        id: 1,
        type: "text",
        question: "Что можно увидеть на небе?",
        answers: [
          {
            word: "облака",
            synonyms: ["тучи"],
          },
          {
            word: "солнце",
            synonyms: ["солнышко"],
          },
          {
            word: "звёзды",
            synonyms: ["созвездия"],
          },
        ],
      },
      {
        id: 2,
        type: "image",
        question: "Что это?",
        image: "rainbow.jpg",
        answers: [
          { word: "радуга", synonyms: [] },
        ],
      },
      {
        id: 3,
        type: "text",
        question: "Что бывает во время дождя?",
        answers: [
          { word: "лужи", synonyms: [] },
          { word: "гроза", synonyms: ["молния"] },
          { word: "зонт", synonyms: [] },
        ],
      },
    ],
  },
];
