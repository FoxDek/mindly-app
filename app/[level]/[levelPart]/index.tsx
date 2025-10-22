import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { userData, userGameProgress } from '@/assets/data/user-data';
import { levels } from '@/assets/data/levels-data';


export default function LevelPart() {
  const { level, levelPart } = useLocalSearchParams();
  const levelparts = levels[Number(level) - 1].parts;
  const levelPartData = levelparts[Number(levelPart) - 1];

  const userProgress = userGameProgress[Number(level) - 1];
  const partProgress = userProgress?.parts[Number(levelPart) - 1];

  return (
    <SafeAreaView style={styles.levelPartContainer}>

      <View style={styles.levelPartHeader}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={25} color={'#fff'} />
        </Pressable>

        <View style={styles.levelPartProgress}>
          <Text>{partProgress?.isCompleted ? '✅' : '❌'}</Text>
        </View>

        <View style={styles.levelPartBalance}>
          <View style={styles.levelPartBalanceIcon}/>
          <Text style={styles.levelPartBalanceText}>{userData.balance}</Text>
        </View>
      </View>


      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{width: '95%', height: '100%', padding: 20}}>
          <Text>{levelPartData.question}</Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  levelPartContainer: {
    flex: 1,
    backgroundColor: '#4091E4',
  },
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
    borderWidth: 2
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