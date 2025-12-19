function getRandomRussianLetters(count: number): string[] {
  const letters = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    result.push(letters[randomIndex]);
  }

  return result;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomExcluding(min: number, max: number, excluded: number[]) {
  const excludedSet = new Set(excluded);

  const available: number[] = [];
  for (let i = min; i <= max; i++) {
    if (!excludedSet.has(i)) {
      available.push(i);
    }
  }

  if (available.length === 0) {
    return null; // или throw new Error('Нет доступных чисел')
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

function removeLettersByIndices({word, indices}: {word: string, indices: number[]}) {
  return word.split('')
    .filter((_, i) => !indices.includes(i))
    .join('');
}

function mapExtraLettersByWord(
  word: string,
  extraLetters: string[],
  wordLettersOpened: number[], // индексы открытых букв
): (string | null)[] {
  // считаем, сколько раз каждая буква встречается в слове
  const wordWithoutOpened = removeLettersByIndices({word, indices: wordLettersOpened});

  const lettersCount = new Map<string, number>();

  for (const ch of wordWithoutOpened.toUpperCase()) {
    lettersCount.set(ch, (lettersCount.get(ch) ?? 0) + 1);
  }

  return extraLetters.map(letter => {
    const upper = letter.toUpperCase();
    const remaining = lettersCount.get(upper) ?? 0;

    if (remaining > 0) {
      lettersCount.set(upper, remaining - 1);
      return letter;
    }

    return null;
  });
}



export { 
  getRandomRussianLetters,
  shuffleArray,
  getRandomExcluding,
  mapExtraLettersByWord
};
