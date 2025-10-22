interface userGameProgressProps {
  [key: string]: {
    completed: boolean,
    parts: {
      [key: string]: {
        answered: string[],
        isCompleted: boolean
      }
    }
  }
}

export const userData = {
  stars: 2,
  balance: 600,
};

export const userGameProgress: userGameProgressProps = {
  "1": {
    "completed": false,
    "parts": {
      "1": {
        "answered": ["корзина", "плед", 'еда', 'напитки', 'шашлык', 'уголь', 'посуда'],
        "isCompleted": true
      },
      "2": {
        "answered": ["гриль"],
        "isCompleted": false
      },
      "3": {
        "answered": [],
        "isCompleted": false
      }
    }
  },
}