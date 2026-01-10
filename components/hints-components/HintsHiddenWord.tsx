import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'
import { useShakeAnimation } from '@/hoocs/useShakeAnimation';
import Animated from 'react-native-reanimated';
import { PartProgress } from '@/types/userDataTypes';

interface HintsHiddenWordProps {
  currentWord: (string | null)[];
  partProgress: PartProgress;
  wordIndex: number
}

interface HintsHiddenWordHandle {
  triggerShake: () => void;
}

// export default function HintsHiddenWord({ currentWord, partProgress, hiddenWordRef }: HintsHiddenWordProps ) {
//   const { animatedStyleShake } = useShakeAnimation();

const HintsHiddenWord = forwardRef<HintsHiddenWordHandle, HintsHiddenWordProps>(
  ({ currentWord, partProgress, wordIndex }, ref) => {
    const { animatedStyleShake, triggerShake } = useShakeAnimation(3);
    const {width} = useWindowDimensions();

    useImperativeHandle(ref, () => ({
      triggerShake,
    }));

    return (
      <Animated.View 
        style={[styles.hiddenWord, animatedStyleShake]}
      >
        {currentWord.map((char, index) => {
          const isLetterOpened = partProgress?.usedHints[wordIndex]?.lettersOpened?.includes(index);
          const isChosenLetter = !isLetterOpened && char !== null;

          return (
            <View 
              key={index} 
              style={[
                styles.letterContainer,
                isLetterOpened ? styles.openedLetter : styles.closedLetter,
                isChosenLetter && styles.chosenLetter,
                {paddingHorizontal: width < 400 ? 4 : 6, paddingVertical: width < 400 ? 8 : 12}
              ]}
            >
              <Text style={[
                styles.hiddenWordLetter,
                { color: isLetterOpened && index !== 0 ? '#FFD166' : '', fontSize: width < 400 ? 20 : 24 },
              ]}>{char?.toUpperCase() ?? ''}</Text>
            </View>
          );
        })}
      </Animated.View>
    );
  }
);

HintsHiddenWord.displayName = 'HintsHiddenWord';

export default HintsHiddenWord

const styles = StyleSheet.create({
  hiddenWord: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 40,
  },
  letterContainer: {
    paddingHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 34,
    width: 'auto',
    alignItems: 'center',
    includeFontPadding: false,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  openedLetter: {
    backgroundColor: 'transparent'
  },
  closedLetter: {
    backgroundColor: '#E4E4E4',
  },
  chosenLetter: {
    backgroundColor: 'transparent',
    borderColor: '#BABABA',
  },
  hiddenWordLetter: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'medium',
    includeFontPadding: false,
  },
})