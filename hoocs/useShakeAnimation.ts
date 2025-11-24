import { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";

export function useShakeAnimation(intensity: number = 8) {
  const shake = useSharedValue(0);
  
  const animatedStyleShake = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }))
  
  const triggerShake = () => {
    shake.value = withSequence(
      withTiming(-intensity, { duration: 60 }),
      withTiming(intensity, { duration: 60 }),
      withTiming(-intensity / 2, { duration: 60 }),
      withTiming(intensity / 2, { duration: 60 }),
      withTiming(0, { duration: 60 })
    );
  }
  
  return {
    animatedStyleShake,
    shake,
    triggerShake
  }

}