import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
        animation: 'fade',
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* <Stack.Screen name="universal-alert-modal" />
      <Stack.Screen name="universal-agreement-modal" /> */}
    </Stack>
  );
}