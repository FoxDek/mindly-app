import { Stack } from "expo-router";
import React, { useEffect } from "react";
import SplashScreen from "./splash";
import { useUserActions, useUserData } from "@/store/useUserStore";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <AppContent />
    </ConvexProvider>
  );
}

function AppContent() {
  const userData = useUserData();
  const { loadUserData } = useUserActions();

  useEffect(() => {
    loadUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData) {
    return <SplashScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modals)"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
          animationDuration: 300,
        }}
      />
    </Stack>
  );
}


