import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import LevelPartHeader from '../../../components/LevelPartHeader';
import LevelPartQuizArea from '@/components/LevelPartQuizArea';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelPartInputArea from '@/components/LevelPartInputArea';


export default function LevelPart() {
  

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