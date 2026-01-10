import {
  useUserActions,
  useUserData,
  useUserProgress,
} from "@/store/useUserStore";
import { PartProgress } from "@/types/userDataTypes";
import { useLevelData } from "./useLevelData";
import { useUserBalance } from "./useUserBalance";

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
  const levelPartIsCompleted = partProgress?.isCompleted;
  const { updateUserData } = useUserActions();
  const {accrueForLevel, accrueForLevelPart} = useUserBalance();

  // функция для сокращения обновления прогресса:
  const updatedProgressWithPart = (updatedPart: {
    answered: string[];
    isCompleted: boolean;
  }) => {
    const updatedLevel = {
      ...userLevelProgress,
      parts: {
        ...userLevelProgress.parts,
        [Number(levelPart)]: updatedPart,
      },
    };

    return {
      ...userAllLevelsProgress,
      [Number(level)]: updatedLevel,
    };
  };




  const setNewWord = (word: string) => {
    const updatedPart = {
      ...partProgress,
      answered: [...(partProgress?.answered || []), word],
    };

    // сравнивниваем тот прогресс, который передали в данные юзера и данные уровней
    const partCompleted = updatedPart.answered.length === levelPartData?.answers.length;
    
    const finalPart = partCompleted
      ? { ...updatedPart, isCompleted: true }
      : updatedPart;

    const finalProgress = updatedProgressWithPart(finalPart);
    updateUserData({ progress: finalProgress });

    // if (partCompleted) {
    //   console.log("part completed");
    //   accrueForLevelPart();
    // }

    // Проверка без активности (можно подключить какую-нибудь модалку после выполнения уровня)
    const levelCompleted = Object.values(
      finalProgress[Number(level)].parts
    ).every((p: PartProgress) => p.isCompleted);

    // if (levelCompleted) {
    //   console.log("level completed");
    //   accrueForLevel();
    // }

    return {
      partCompleted,
      levelCompleted
    }
  };

  const updateLevelPartCompleted = (updatedPart: {
    answered: string[];
    isCompleted: boolean;
  }) => {
    const updatedProgress = updatedProgressWithPart(updatedPart);
    updateUserData({ progress: updatedProgress });
  };

  const getUserStars = () => {
    const stars = Object.values(userAllLevelsProgress)
      .flatMap((level) => Object.values(level.parts))
      .filter((part) => part.isCompleted).length;

    return stars;
  };

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
    updateUserData,
    levelPartIsCompleted,
  };
}
