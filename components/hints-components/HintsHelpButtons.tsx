import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react'
import { useUserBalance } from '@/hoocs/useUserBalance';
import { useLevelHints } from '@/hoocs/useLevelHints';

interface HintsHelpButtonsProps {
  word: string;
  wordLength: number;
  wordIndex: number;
  setCurrentWord: React.Dispatch<React.SetStateAction<(string | null)[]>>,
  currentWord: (string | null)[]
}

export default function HintsHelpButtons({word, wordLength, wordIndex, currentWord, setCurrentWord}: HintsHelpButtonsProps) {
  const { buyDisplayLetter, buyRemoveExtraLetters, buyRevealWord } = useUserBalance();
  const { displayNewLetter, deleteExtraLetters } = useLevelHints()

  const handleOpenLetter = () => {
    buyDisplayLetter();
    const newLetterIndex = displayNewLetter(wordIndex, wordLength);

    if (newLetterIndex) {
      const newWord = [...currentWord];
      newWord[newLetterIndex] = word[newLetterIndex];
      setCurrentWord(newWord);
    }
  }

  const handleDeleteExtraLetters = () => {
    buyRemoveExtraLetters();
    deleteExtraLetters(wordIndex);
  }

  const handleRevealWord = () => {
    buyRevealWord();

  }

  return (
    <View style={styles.helpButtons}>

      <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={handleOpenLetter}>
        <View style={[styles.helpButton, { backgroundColor: '#A3D977'}]}>
          <Text style={styles.helpButtonText}>Показать букву</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={handleDeleteExtraLetters}>
        <View style={[styles.helpButton, { backgroundColor: '#FF9E6B'}]}>
          <Text style={styles.helpButtonText}>Удалить лишние</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.8} onPress={handleRevealWord}>
        <View style={[styles.helpButton, { backgroundColor: '#118AB2'}]}>
          <Text style={styles.helpButtonText}>Открыть слово</Text>
        </View>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  helpButtons: {
    marginTop: 'auto',
    flexDirection: 'row',
    paddingBottom: 20,
    gap: 10
  },
  helpButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpButtonText: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    flexWrap: 'wrap',
  }
})