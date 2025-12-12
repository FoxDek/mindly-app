import { StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'

import { useShakeAnimation } from '@/hoocs/useShakeAnimation';
import Animated from 'react-native-reanimated';

interface HintsHiddenWordProps {
  currentWord: (string | null)[];
  partProgress: {
    usedHints: {
      lettersOpened: number[]
    }
  };
}

interface HintsHiddenWordHandle {
  triggerShake: () => void;
}

// export default function HintsHiddenWord({ currentWord, partProgress, hiddenWordRef }: HintsHiddenWordProps ) {
//   const { animatedStyleShake } = useShakeAnimation();

const HintsHiddenWord = forwardRef<HintsHiddenWordHandle, HintsHiddenWordProps>(
  ({ currentWord, partProgress }, ref) => {
    const { animatedStyleShake, triggerShake } = useShakeAnimation(3);

    useImperativeHandle(ref, () => ({
      triggerShake,
    }));

    return (
      <Animated.View 
        style={[styles.hiddenWord, animatedStyleShake]}
      >
        {currentWord.map((char, index) => {
          const isLetterOpened = partProgress.usedHints.lettersOpened.includes(index);

          return (
            <View 
              key={index} 
              style={[
                styles.letterContainer,
                isLetterOpened ? styles.openedLetter : styles.closedLetter
              ]}
            >
              <Text style={styles.hiddenWordLetter}>{char ?? ''}</Text>
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
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 12,
    minWidth: 34,
    width: 'auto',
    alignItems: 'center'
  },
  openedLetter: {
    backgroundColor: 'transparent'
  },
  closedLetter: {
    backgroundColor: '#E4E4E4'
  },
  hiddenWordLetter: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'medium',
    includeFontPadding: false,
  },
})