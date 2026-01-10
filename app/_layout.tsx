import { Stack } from "expo-router";
import { useEffect } from "react";
import SplashScreen from "./splash";
import { useUserActions, useUserData } from "@/store/useUserStore";

export default function RootLayout() {
  const userData = useUserData(); 
  const { loadUserData } = useUserActions()

  useEffect(() => {
    loadUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData) {
    return <SplashScreen />;
  }
  
  return (
  <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="(tabs)"/>
    <Stack.Screen name="(modals)" options={{ 
      headerShown: false,
      presentation: 'transparentModal',
      animation: 'fade',
      animationDuration: 300
    }} />
    
  </Stack>
  );
}

