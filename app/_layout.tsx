import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "./splash";

export default function RootLayout() {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (!isReady) setReady(true);
  }, [isReady]);

  if (!isReady) return <SplashScreen />;
  
  return <Stack screenOptions={{ headerShown: false, contentStyle: {  } }} />;
}

