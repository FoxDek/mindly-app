import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useUserLevelData } from '@/hoocs/useUserLevelData'
import LevelPartHeaderProgress from './LevelPartHeaderProgress'
import { useLevelPartActions } from '@/store/useLevelPartStore'
import { useLevelData } from '@/hoocs/useLevelData'


export default function LevelPartHeader() {
  const { levelPartData } = useLevelData();
  const { partProgress } = useUserLevelData();
  const {userData} = useUserLevelData();
  const {setAnsweredPercent} = useLevelPartActions();

  useEffect(() => {
    if (!levelPartData || !partProgress) return;

    const calculatedPercent = levelPartData.answers.reduce((total, {word, percent}) => {
    if (percent && partProgress?.answered.includes(word)) {
      return total + percent;
    }
    return total;
  }, 0);

  setAnsweredPercent(calculatedPercent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partProgress, levelPartData]);

  
  return (
    <View style={styles.levelPartHeader}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={25} color={'#fff'} />
      </Pressable>

      <LevelPartHeaderProgress />

      <View style={styles.levelPartBalance}>
        <View style={styles.levelPartBalanceIcon}/>
        <Text style={styles.levelPartBalanceText}>{userData.balance}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  levelPartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  levelPartProgress: {
    position: 'absolute',
    top: 10,
    left: '50%',
    width: 40,
    height: 40,
    borderRadius: 1000,
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  levelPartProgressText: {
    color: 'white',
    fontSize: 15
  },
  levelPartBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  levelPartBalanceIcon: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: '#F9DE74'
  },
  levelPartBalanceText: {
    color: 'white',
    fontSize: 15
  }
})