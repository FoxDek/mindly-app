import { getRandomExcluding } from "@/utils/hintsLogic";
import { useUserLevelData } from "./useUserLevelData";


export function useLevelHints() {
  const { partProgress, updateUserData, updatedProgressWithPart } = useUserLevelData();
  
  const updateHintsOpened = (hintsOpened: number[]) => {
    const updatedPart = {
      ...partProgress,
      hintsOpened,
    };

    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });
  }

  const createUsedHints = (wordIndex: number) => {
    // console.log('Создан объект с подсказками для слова', wordIndex);

    const key = String(wordIndex);

    const updatedPart = {
      ...partProgress,
      usedHints: {
        ...partProgress.usedHints,
        [key]: partProgress.usedHints?.[key] ?? {
          lettersOpened: [0],
          extraLettersRemoved: false,
        },
      },
      hintsOpened: partProgress.hintsOpened.includes(wordIndex)
        ? partProgress.hintsOpened
        : [...partProgress.hintsOpened, wordIndex],
    };

    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });
  };

  const displayNewLetter = (wordIndex: number, wordLength: number) => {
    const newLetterIndex = getRandomExcluding(0, wordLength - 1, partProgress.usedHints[wordIndex].lettersOpened || [0]);
    const newLettersOpened = [...partProgress.usedHints[wordIndex].lettersOpened || [0], newLetterIndex];

    const updatedPart = {
      ...partProgress,
      usedHints: {
        ...partProgress.usedHints,
        [wordIndex]: { lettersOpened: newLettersOpened, extraLettersRemoved: partProgress.usedHints[wordIndex].extraLettersRemoved },
      },
    };

    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });

    return newLetterIndex
  }

  const deleteExtraLetters = (wordIndex: number) => {
    const updatedPart = {
      ...partProgress,
      usedHints: {
        ...partProgress.usedHints,
        [wordIndex]: {...partProgress.usedHints[wordIndex], extraLettersRemoved: true},
      },
    }

    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });
  }

  return {
    updateHintsOpened,
    createUsedHints,
    displayNewLetter,
    deleteExtraLetters
  };
}