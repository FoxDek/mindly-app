import { Text, ActivityIndicator, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {

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
