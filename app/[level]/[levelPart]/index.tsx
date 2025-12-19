import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import LevelPartHeader from '../../../components/LevelPartHeader';
import LevelPartQuizArea from '@/components/LevelPartQuizArea';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelPartInputArea from '@/components/LevelPartInputArea';
import { useLevelInput } from '@/hoocs/useLevelInput';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';
import { useLevelPartActions, useSolvedHintsWord } from '@/store/useLevelPartStore';


export default function LevelPart() {
  const params = useLocalSearchParams();
  const {handleSendValue} = useLevelInput();
  const solvedHintsWord = useSolvedHintsWord();
  const { setSolvedHintsWord } = useLevelPartActions();
  
  useEffect(() => {
    if (solvedHintsWord) {
      console.log(solvedHintsWord)
      handleSendValue(solvedHintsWord);
      setSolvedHintsWord('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedHintsWord]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4091E4' }}>
      <KeyboardAvoidingView style={styles.levelPartContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        
          <LevelPartHeader />
          <LevelPartQuizArea />
        
          <LevelPartInputArea />
          
        
      
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  levelPartContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#4091E4',
  },
})