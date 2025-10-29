import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLevelData } from '@/hoocs/useLevelData';
import { useUserLevelData } from '@/hoocs/useUserLevelData';
import { blockProcentColors } from '@/assets/data/app-colors';



const getColorByPercentage = (percent: number): string => {
  // Сортируем ключи по убыванию для поиска ближайшего нижнего порога
  const thresholds = Object.keys(blockProcentColors)
    .map(Number)
    .sort((a, b) => b - a);
  
  // Находим первый порог, который меньше или равен проценту
  const matchedThreshold = thresholds.find(threshold => percent >= threshold);
  
  // Возвращаем цвет по умолчанию если ничего не найдено (маловероятно)
  return blockProcentColors[matchedThreshold ?? 0];
}

export default function LevelPartQuizAnswers() {
  const { levelPartData } = useLevelData();
  const { partProgress } = useUserLevelData();
  const { width } = Dimensions.get('window');

  if (!levelPartData) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        contentContainerStyle={{
          paddingBottom: 40,
          width: width * 0.88,
          alignSelf: 'center',
          gap: 10,
          // backgroundColor: 'red',
          flexGrow: 1,
        }}
        style={{ marginRight: 20, flex: 1 }}
      >
        {/* <View style={{ gap: 10, flex: 1 }}> */}
          {levelPartData.answers.map((answer) => {

            const isAnswered = partProgress && partProgress.answered.includes(answer.word)
            const blockColor = isAnswered ? 'white' : (answer.percent ? getColorByPercentage(answer.percent) : '#FF6B6B');

            return(
              <View key={answer.word} style={[styles.answerBlock, { backgroundColor: blockColor }]}>
                <Text style={[styles.answerBlockText, { color: isAnswered ? '#073B4C' : 'white' }]}>{partProgress && partProgress.answered.includes(answer.word) ? answer.word : answer.percent + '%'}</Text>
              </View>
            )
          })}
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  answerBlock: {
    // backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBlockText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
