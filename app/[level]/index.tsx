import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, ImageBackground } from 'expo-image';
import { useLevelData } from '@/hoocs/useLevelData';
import { useUserLevelData } from '@/hoocs/useUserLevelData';

export default function Level() {
  const { level, levelAllPartsData } = useLevelData();
  const { userLevelProgress } = useUserLevelData();

  if (!level) return null;

  return (
    <SafeAreaView style={styles.levelContainer}>
      <View style={styles.levelHeader}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={25} color={'#fff'} />
        </Pressable>
      </View>


      <View style={styles.levelTitleContainer}>
        <Text style={styles.levelTitleContainerText}>level</Text>
        <Text style={styles.levelTitleContainerNumber}>{Number(level) <= 9 ? `0${level}` : level}</Text>
      </View>

      <FlatList 
        data={levelAllPartsData}
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1, width: '100%', gap: 20, paddingHorizontal: 40 }}
        renderItem={({ item: levelPart }) => (
          <Link href={{ pathname: "/[level]/[levelPart]", params: {  level: level?.toString(), levelPart: levelPart.id.toString() } }}>

            {levelPart.image && 
              <ImageBackground
                source={{uri: levelPart.image}}
                style={styles.levelPartPreview}
              >
                <View style={styles.levelPartPreviewOverlay} />
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    opacity: userLevelProgress?.parts[levelPart.id.toString()]?.isCompleted ? 1 : 0.5,
                    marginLeft: 'auto'
                  }}
                  source={require("@/assets/images/mindly-star.png")}
                  contentFit="cover"
                  transition={1000}
                />
              </ImageBackground>
            }

            {levelPart.question && 
              <View style={styles.levelPartPreview}>
                <Text style={styles.levelPartPreviewText}>{levelPart.question}</Text>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    opacity: userLevelProgress?.parts[levelPart.id.toString()]?.isCompleted ? 1 : 0.5,
                    marginLeft: 'auto'
                  }}
                  source={require("@/assets/images/mindly-star.png")}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
            }

            {/* <View style={styles.levelPartPreview}>
              {levelPart.question && <Text style={styles.levelPartPreviewText}>{levelPart.question}</Text>}
              <Image
                style={{
                  width: 30,
                  height: 30,
                  opacity: userLevelProgress?.parts[levelPart.id.toString()]?.isCompleted ? 1 : 0.5,
                  marginLeft: 'auto'
                }}
                source={require("@/assets/images/mindly-star.png")}
                contentFit="cover"
                transition={1000}
              />
            </View> */}
          </Link>
        )}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  levelContainer: {
    flex: 1,
    backgroundColor: '#33346D',
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  levelTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100
  },
  levelTitleContainerText: {
    fontSize: 20,
    color: '#fff'
  },
  levelTitleContainerNumber: {
    fontSize: 60,
    color: '#fff'
  },
  levelPartPreview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#4091E4",
    borderRadius: 10,
    width: '100%',
    justifyContent: "space-between",
    overflow: 'hidden',
  },
  levelPartPreviewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  levelPartPreviewText: {
    fontSize: 16,
    color: '#fff',
    flexWrap: 'wrap',
    width: '80%'
  }
})