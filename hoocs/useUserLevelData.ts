import { useUserData, useUserProgress } from "@/store/useUserStore";
import { useLevelData } from "./useLevelData";

export function useUserLevelData() {
  const { level, levelPart, levelPartData } = useLevelData();

  const userData = useUserData();
  const userAllLevelsProgress = userData.progress;

  const userLevelProgress = useUserProgress()[Number(level)];
  const partProgress = userLevelProgress?.parts[Number(levelPart)];

  return {
    userData,
    userAllLevelsProgress,
    userLevelProgress,
    partProgress
  }
};