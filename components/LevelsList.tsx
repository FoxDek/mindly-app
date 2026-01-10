import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image';
import { useLevelData } from '@/hoocs/useLevelData';
import { useUserLevelData } from '@/hoocs/useUserLevelData';

export default function LevelsList() {
  const {levels} = useLevelData();
  const { userStarsBalance, userAllLevelsProgress } = useUserLevelData();

  return (
    <FlatList
      data={levels}
      numColumns={2}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1, padding: 10, width: '100%', gap: 10 }}
      columnWrapperStyle={{ gap: 10, alignItems: 'center', justifyContent: 'center' }}
      renderItem={({ item: level }) => (
        <Link 
          href={ userStarsBalance >= level.starsForAccess ?
            { pathname: "/[level]", params: { level: level.id.toString() } }
            :
            { pathname: '/(modals)/universal-alert-modal', params: {message: 'Недостаточно звёзд', starsNeed: level.starsForAccess - userStarsBalance} }
          }
          style={[styles.levelsListItem, {opacity: userStarsBalance >= level.starsForAccess ? 1 : 0.5}]}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Text style={styles.levelsListItemNumber}>{level.id <= 9 ? `0${level.id}` : level.id}</Text>
      
            <FlatList
              contentContainerStyle={{ gap: 5 }}
              columnWrapperStyle={{ gap: 4, flexWrap: 'nowrap' }}
              data={level.parts}
              renderItem={({ item: levelPart }) => (
                <Image
                  style={{
                    width: 14,
                    height: 14,
                    opacity: userAllLevelsProgress[level.id]?.parts[levelPart.id]?.isCompleted ? 1 : 0.5
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
  )
}

const styles = StyleSheet.create({
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
})