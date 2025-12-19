import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useShakeAnimation } from '@/hoocs/useShakeAnimation';
import { registerShake, unregisterShake } from '@/utils/shakeRegistry';
import { router } from 'expo-router';
import { useLevelData } from '@/hoocs/useLevelData';
import { useUserLevelData } from '@/hoocs/useUserLevelData';

interface AnswerProps {
  word: string;
  synonyms?: string[];
  percent?: number;
}

interface AnswerBlockProps {
  answer: AnswerProps;
  isAnswered: boolean;
  blockColor: string;
  index: number
}

export default function LevelPartAnswerBlock({ answer, isAnswered, blockColor, index }: AnswerBlockProps) {
  const { levelPartData, level, levelPart  } = useLevelData();
  const { shake, triggerShake } = useShakeAnimation();
  const flip = useSharedValue(isAnswered ? 180 : 0); // состояние переворота
  const {partProgress} = useUserLevelData();


  useEffect(() => {
    if (isAnswered) {
      flip.value = withTiming(180, { duration: 600 });
    } else {
      flip.value = withTiming(0, { duration: 600 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnswered]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 2000 },
        { rotateY: `${flip.value}deg` }, // сам переворот (вращение по оси Y)
        { translateX: shake.value },
         // добавляем перспективу (хотя переворот и без неё работает)
      ],
    };
  });

  const frontOpacity = useAnimatedStyle(() => { // если вращение от 0 до 90 градусов, то показывает лицевую сторону
    const opacity = interpolate(
      flip.value,
      [0, 90],
      [1, 0],
      'clamp'
    );
    return { opacity };
  });

  const backOpacity = useAnimatedStyle(() => { // далее обратная сторона
    const opacity = interpolate(
      flip.value,
      [90, 180],
      [0, 1],
      'clamp'
    );
    return { opacity };
  });


  useEffect(() => {
    registerShake(index, triggerShake)
    return () => unregisterShake(index)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenHints = () => {
    if (isAnswered || !levelPartData || !level || !levelPart) return;

    if (partProgress.hintsOpened.includes(index)) {
      router.push({
        pathname: '/[level]/[levelPart]/hints/[wordIndex]',
        params: {
          level,
          levelPart,
          wordIndex: index,
          word: answer.word,
          question: levelPartData.question,
        },
      });
    } else {
      router.push({
        pathname: '/(modals)/universal-confirmation-modal',
        params: {
          message: 'Открыть подсказки?',
          type: 'purchase',
          word: answer.word,
          wordIndex: index,
          level,
          levelPart,
          question: levelPartData.question,
        },
      });
    }
  }

  if (!levelPartData) return null

  return (
    <TouchableOpacity onPress={handleOpenHints} activeOpacity={0.9}>
      <Animated.View style={[styles.answerBlock, { backgroundColor: blockColor }, animatedStyle]}>
        {/* FRONT (пока не угадано — проценты) */}
        <Animated.View
          style={[
            // StyleSheet.absoluteFillObject,
            frontOpacity,
          ]}
        >
          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.answerBlockText, { color: 'white' }]}>
              {answer.percent}%
            </Text>
          </View>
        </Animated.View>

        {/* BACK (когда угадано — слово) */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            backOpacity,
            { transform: [{ scaleX: -1 }]}, // обратный поворот для корректного отображения текста
          ]}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Text style={[styles.answerBlockText, { color: '#073B4C' }]}>
              {answer.word}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
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
    textAlign: 'center',
  },
});