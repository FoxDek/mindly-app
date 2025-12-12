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



export { 
  getRandomRussianLetters,
  shuffleArray
};
