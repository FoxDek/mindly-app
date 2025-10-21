import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
// import { useProgressStore } from "../store/progressStore";
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  // const loadProgress = useProgressStore((s: any) => s.loadProgress);

  useEffect(() => {
    const init = async () => {
      // await loadProgress(); // загружаем прогресс из AsyncStorage
      // можно подождать загрузку шрифтов, ассетов и т.п.
      await new Promise((res) => setTimeout(res, 800)); // имитация загрузки
      router.replace("/"); // переходим на главный экран
    };
    init();
  }, []);

  return (
    <LinearGradient
      colors={["#6366F1", "#22D3EE"]}
      style={styles.splashSubstrate}
    >
      <Text className="text-white text-4xl font-montserrat mb-4">mindly.</Text>
      <ActivityIndicator size="large" color="white" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  splashSubstrate: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
  }
});
