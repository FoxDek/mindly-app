import { Stack } from "expo-router";
import { useEffect } from "react";
import { Image } from "expo-image";
import { useLevelData } from "@/hoocs/useLevelData";

export default function LevelLayout() {
  const { levelData } = useLevelData();

  useEffect(() => {
    if (!levelData?.parts) return;

    const imageUrls = levelData.parts
      .filter((part) => part.type === 'image' && part.image)
      .map((part) => part.image);

    imageUrls.forEach((url) => {
      if (!url) return;
      Image.prefetch(url);
    })

  }, [levelData]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
