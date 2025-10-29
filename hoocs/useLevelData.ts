import { levels } from "@/assets/data/levels-data";
import { useLocalSearchParams } from "expo-router";

export function useLevelData() {
  const params = useLocalSearchParams();

  const level = params.level ? Number(params.level) : null;
  const levelPart = params.levelPart ? Number(params.levelPart) : null;

  const levelData = level ? levels[level - 1] : null;
  const levelAllPartsData = levelData ? levelData.parts : null;
  const levelPartData = levelPart ? levelData?.parts[levelPart - 1] : null;

  return {
    levels,
    level,
    levelPart,
    levelData,
    levelAllPartsData,
    levelPartData
  } 
}