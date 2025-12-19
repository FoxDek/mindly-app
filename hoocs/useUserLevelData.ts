import { useUserActions, useUserData, useUserProgress } from "@/store/useUserStore";
import { useLevelData } from "./useLevelData";
import { PartProgress } from "@/types/userDataTypes";

interface LevelProgress {
  // completed: boolean;
  parts: Record<number, PartProgress>;
}

type UserProgress = Record<number, LevelProgress>;

export function useUserLevelData() {
  const { level, levelPart, levelPartData } = useLevelData();
  const userData = useUserData();
  const userAllLevelsProgress: UserProgress = userData.progress;
  const userLevelProgress = useUserProgress()[Number(level)];
  const partProgress = userLevelProgress?.parts[Number(levelPart)];
  const { updateUserData } = useUserActions();

  // функция для сокращения обновления прогресса:
  const updatedProgressWithPart = (updatedPart: { answered: string[]; isCompleted: boolean; }) => {
    const updatedLevel = {
      ...userLevelProgress,
      parts: {
        ...userLevelProgress.parts,
        [Number(levelPart)]: updatedPart,
      },
    };

    return {
      ...userAllLevelsProgress,
      [Number(level)]: updatedLevel
    }
  }
  
  const setNewWord = (word: string) => {
    const updatedPart = {
      ...partProgress,
      answered: [...(partProgress?.answered || []), word],
    };

    // обновляем прогресс юзера
    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });

    // сравнивниваем тот прогресс, который передали в данные юзера и данные уровней
    const partCompleted = updatedPart.answered.length === levelPartData?.answers.length;

    if (partCompleted) {
      console.log('part completed');
      const completedPart = {
        ...updatedPart,
        isCompleted: true
      }

      updateLevelPartCompleted(completedPart);
    }

    // Проверка без активности (можно подключить какую-нибудь модалку после выполнения уровня)
    const levelCompleted = Object.values(updatedProgress[Number(level)].parts)
      .every((p: PartProgress) => p.isCompleted);

    if (levelCompleted) {
      console.log('level completed');
    } 
  } 

  const updateLevelPartCompleted = (updatedPart: { answered: string[]; isCompleted: boolean; }) => {
    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });
  }

  const getUserStars = () => {
    const stars = Object.values(userAllLevelsProgress)
      .flatMap(level => Object.values(level.parts))
      .filter(part => part.isCompleted)
      .length;

    return stars;
  }

  const userStarsBalance = getUserStars();

  return {
    userData,
    userAllLevelsProgress,
    userLevelProgress,
    partProgress,
    setNewWord,
    userStarsBalance,
    updateLevelPartCompleted,
    updatedProgressWithPart,
    updateUserData
  }
};