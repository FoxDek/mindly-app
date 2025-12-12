import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import LevelPartHeader from '../../../components/LevelPartHeader';
import LevelPartQuizArea from '@/components/LevelPartQuizArea';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelPartInputArea from '@/components/LevelPartInputArea';
import { useLevelInput } from '@/hoocs/useLevelInput';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect } from 'react';


export default function LevelPart() {
    const params = useLocalSearchParams();
    const {handleSendValue} = useLevelInput();
  
  useEffect(() => {
    if (params.autoSolve) {
      console.log(params.autoSolve)
      handleSendValue(params.autoSolve as string);
  
      // важно: очищаем параметр, чтобы эффект не повторился
      router.setParams({ autoSolve: undefined });
    }
  }, [params.autoSolve]);

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