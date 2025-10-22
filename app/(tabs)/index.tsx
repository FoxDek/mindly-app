import { levels, gameData } from "@/assets/data/levels-data";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import { Link } from "expo-router";
import { userData } from "@/assets/data/user-data";
import { Ionicons } from "@expo/vector-icons";
import LevelsList from '../../components/LevelsList';

export default function Levels() {
  return (
    <SafeAreaView style={styles.levelsContainer}>
      <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#6366F1", "#22D3EE"]}
          style={styles.levelsCover}
        >
          <Text style={styles.levelsCoverTitle}>mindly.</Text>
        </LinearGradient>


        <View style={styles.levelsHeader}>
          <Link href={{ pathname: '/settings' }} asChild>
            <Ionicons name='settings-sharp' size={25} color={'#fff'} />
          </Link>
          <View style={styles.levelsHeaderBalance}>
            <Image
              style={{
                width: 12,
                height: 12,
              }}
              source={require("@/assets/images/mindly-star.png")}
              contentFit="cover"
              transition={1000}
            />
            <Text style={styles.levelsHeaderBalanceText}>{userData.stars}/{gameData.stars}</Text>
          </View>
        </View>

        <LevelsList />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  levelsContainer: {
    flex: 1,
    height: '100%',
    maxHeight: '80%',
  },
  levelsCover: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  levelsCoverTitle: {
    color: "white",
    fontSize: 40,
    marginBottom: 20,
  },
  levelsHeader: {
    position: "absolute",
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    left: 0,
    padding: 15,
  },
  levelsHeaderBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  levelsHeaderBalanceText: {
    color: "white",
    fontSize: 15
  },

});
