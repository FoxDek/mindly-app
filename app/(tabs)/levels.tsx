import { levels } from "@/assets/data/levels-data";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from 'expo-image';
import { Link } from "expo-router";

interface userGameProgressProps {
  [key: string]: {
    completed: boolean,
    parts: {
      [key: string]: {
        answered: string[],
        isCompleted: boolean
      }
    }
  }
}

const userGameProgress: userGameProgressProps = {
  "1": {
    "completed": false,
    "parts": {
      "1": {
        "answered": ["корзина", "плед", 'еда'],
        "isCompleted": true
      },
      "2": {
        "answered": ["гриль"],
        "isCompleted": true
      },
      "3": {
        "answered": [],
        "isCompleted": false
      }
    }
  },
}

export default function Levels() {
  return (
    <SafeAreaView style={styles.levelsContainer}>
      <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={["#6366F1", "#22D3EE"]}
          style={styles.levelsHeader}
        >
          <Text style={styles.levelsHeaderTitle}>mindly.</Text>
        </LinearGradient>
        
        <FlatList
          data={levels}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1, padding: 10, width: '100%', gap: 10 }}
          columnWrapperStyle={{ gap: 10, alignItems: 'center', justifyContent: 'center' }}
          renderItem={({ item: level }) => (
            <Link href={{ pathname: "/level/[level]", params: { level: level.id.toString() } }} style={styles.levelsListItem}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text style={styles.levelsListItemNumber}>{level.id <= 9 ? `0${level.id}` : level.id}</Text>
        
              <FlatList
                contentContainerStyle={{ gap: 5 }}
                columnWrapperStyle={{ gap: 4, flexWrap: 'nowrap' }}
                data={level.parts}
                renderItem={({ item: levelPart }) => (
                  <Image
                    style={{
                      width: 12,
                      height: 12,
                      opacity: userGameProgress[level.id.toString()]?.parts[levelPart.id.toString()]?.isCompleted ? 1 : 0.5
                    }}
                    source={require("@/assets/images/mindly-star.png")}
                    contentFit="cover"
                    transition={1000}
                  />
                )}
                keyExtractor={(levelPart) => levelPart.id.toString()}
                numColumns={3}
              />
              </View>
            </Link>
          )}
        />
        {/* <Link href={{ pathname: "/level/[level]", params: { level: "1" } }}>Линк</Link> */}
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
  levelsHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  levelsHeaderTitle: {
    color: "white",
    fontSize: 40,
    marginBottom: 20,
  },
  levelsListItem: {
    flex: 1,
    maxWidth: '30%',
    backgroundColor: "#4091E4",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  levelsListItemNumber: {
    color: "white",
    fontSize: 30,
    marginRight: 10,
  }
});
