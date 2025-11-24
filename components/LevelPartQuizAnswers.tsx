import { Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLevelData } from '@/hoocs/useLevelData';
import { useUserLevelData } from '@/hoocs/useUserLevelData';
import { blockProcentColors } from '@/assets/data/app-colors';
import { useEffect, useRef } from 'react';
import { useScrollActions } from '@/store/useScrollStore';
import LevelPartAnswerBlock from './LevelPartAnswerBlock';



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
  const verticalScrollRef = useRef<ScrollView>(null);
  const { setVerticalScrollRef } = useScrollActions();

  useEffect(() => {
    setVerticalScrollRef(verticalScrollRef as React.RefObject<ScrollView>);
  }, []);

  if (!levelPartData) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 150}
    >
      <ScrollView
        ref={verticalScrollRef}
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
          {levelPartData.answers.map((answer, index) => {

            const isAnswered = partProgress && partProgress.answered.includes(answer.word)
            const blockColor = isAnswered ? 'white' : (answer.percent ? getColorByPercentage(answer.percent) : '#FF6B6B');

            return(

              <LevelPartAnswerBlock 
                key={answer.word}
                answer={answer}
                isAnswered={isAnswered}
                blockColor={blockColor}
                index={index}
              />

            )
          })}
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}



