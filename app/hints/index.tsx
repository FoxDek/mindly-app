import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LevelPartHeader from '../../components/LevelPartHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelPartHeaderProgress from '../../components/LevelPartHeaderProgress';
import { useUserLevelData } from '@/hoocs/useUserLevelData';
import { useLocalSearchParams, useRouter } from 'expo-router';
import HintsHiddenWord from '../../components/hints-components/HintsHiddenWord';
import HintsExtraKeyboard from '../../components/hints-components/HintsExtraKeyboard';
import { useShakeAnimation } from '@/hoocs/useShakeAnimation';
import { registerShake, unregisterShake } from '@/utils/shakeRegistry';
import { useLevelInput } from '@/hoocs/useLevelInput';

export default function Hints() {
  const params = useLocalSearchParams();
  const { userAllLevelsProgress } = useUserLevelData();
  const word = params.word as string;
  const wordIndex = Number(params.wordIndex);
  const question = params.question as string;
  const level = Number(params.level);
  const levelPart = Number(params.levelPart); 
  const partProgress = userAllLevelsProgress[Number(level)].parts[Number(levelPart)];
  const router = useRouter();

  const initialState = word.split('').map((letter, index) => 
    partProgress?.usedHints.lettersOpened.includes(index)
      ? letter
      : null
  )

  const [currentWord, setCurrentWord] = useState(initialState)
  const [chosenExtraLetters, setChosenExtraLetters] = useState<number[]>([]);
  const { triggerShake } = useShakeAnimation();

  const hiddenWordRef = useRef<{ triggerShake: () => void }>(null);

  useEffect(() => {
    registerShake('hidden-word', triggerShake);
    return () => unregisterShake('hidden-word');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  useEffect(() => {
    if (chosenExtraLetters.length + partProgress?.usedHints.lettersOpened.length === word.length) {
      if (word === currentWord.join('')) {
        // router.setParams({ autoSolve: word });
        // router.back();
        router.replace({ pathname: '/[level]/[levelPart]', params: { level, levelPart, autoSolve: word } });
      } else {
        hiddenWordRef.current?.triggerShake();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  return (
    <View style={styles.hints}>
      <SafeAreaView
        style={styles.topSafeArea}
        edges={['top']}
      >
        <LevelPartHeader />

        <View style={styles.headerContent}>
          <LevelPartHeaderProgress circleSize={80} textSize={18}/>
          <Text style={styles.questionText}>{question}</Text>
        </View>
      </SafeAreaView>

      <SafeAreaView 
        style={styles.bottomSafeArea} 
        edges={['left', 'right', 'bottom']}
      >
        <View style={styles.hintsContent}>

          <HintsHiddenWord currentWord={currentWord} partProgress={partProgress} ref={hiddenWordRef}/>

          <HintsExtraKeyboard currentWord={currentWord} setCurrentWord={setCurrentWord} wordIndex={wordIndex} chosenExtraLetters={chosenExtraLetters} setChosenExtraLetters={setChosenExtraLetters} partProgress={partProgress}/>

        </View>
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({
  hints: {
    flex: 1,
    backgroundColor: '#4091E4'
  },
  topSafeArea: {
    backgroundColor: '#4091E4'
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 50,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  questionText: {
    fontSize: 24,
    color: 'white'
  },
  hintsContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  letterContainer: {
    paddingHorizontal: 6,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 12,
    minWidth: 34,
    width: 'auto',
    alignItems: 'center'
  },
})