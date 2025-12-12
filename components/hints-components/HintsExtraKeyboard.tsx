import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useLevelData } from '@/hoocs/useLevelData';

interface partProgressProps {
  answered: string[];
  isCompleted: boolean;
  usedHints: {
      lettersOpened: number[];
      extraLettersRemoved: boolean;
  };
}

interface HintsExtraKeyboardProps {
  currentWord: (string | null)[];
  wordIndex: number;
  setChosenExtraLetters: React.Dispatch<React.SetStateAction<number[]>>;
  chosenExtraLetters: number[];
  setCurrentWord: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  partProgress: partProgressProps
}

export default function HintsExtraKeyboard({currentWord, wordIndex, setChosenExtraLetters, chosenExtraLetters, setCurrentWord, partProgress }: HintsExtraKeyboardProps) {
  const { levelPartData } = useLevelData();

  const openLetter = (index: number) => {
    const emptyIndex = currentWord.indexOf(null) // первый пустой индекс
    if (emptyIndex === -1) return;

    const newLetter = levelPartData?.answers?.[wordIndex]?.extraLetters?.[index];
    if (newLetter === undefined) return;
    const newWord = [...currentWord];
    newWord[emptyIndex] = newLetter;
    setChosenExtraLetters([...chosenExtraLetters, index]);
    setCurrentWord(newWord);
  }

  const deleteLetter = () => {
    const lastFilledIndex = [...currentWord]
      .map((ch, i) => (ch !== null ? i : -1))
      .filter(i => i !== -1 && !partProgress?.usedHints.lettersOpened.includes(i))
      .pop();

    if (lastFilledIndex === undefined) return;

    const newWord = [...currentWord];
    newWord[lastFilledIndex] = null;
    
    const newChosenExtraLetters = [...chosenExtraLetters]
    newChosenExtraLetters.pop();
    setChosenExtraLetters(newChosenExtraLetters);

    setChosenExtraLetters(newChosenExtraLetters);
    setCurrentWord(newWord);
  };



  return (
    <View style={{ gap: 20}}>
      <FlatList
        data={levelPartData?.answers[wordIndex].extraLetters}
        numColumns={9}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, gap: 10 }}
        columnWrapperStyle={{ gap: 5, flexWrap: 'nowrap', justifyContent: 'space-between' }}
        scrollEnabled={false}
        renderItem={({item: letter, index}) => {
          const extraLetterIsChosen = chosenExtraLetters.includes(index);

          return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => extraLetterIsChosen ? null : openLetter(index)}>
              <View key={index} style={[styles.extraLetterContainer, extraLetterIsChosen ? { backgroundColor: '#e9e9e9' } : {}]}>
                <Text style={styles.extraletterText}>{extraLetterIsChosen ? '' :  letter}</Text>
              </View>
            </TouchableOpacity>
          )}}
        />


      <TouchableOpacity activeOpacity={0.5} onPress={deleteLetter}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 5, borderColor: '#BABABA', borderWidth: 1, borderRadius: 12 }}>
          <Feather name="delete" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  extraLetterContainer: {
    paddingHorizontal: 6,
    paddingTop: 4,
    paddingBottom: 6,
    borderRadius: 12,
    minWidth: 34,
    width: 'auto',
    alignItems: 'center',
    borderColor: '#BABABA',
    borderWidth: 1
  },
  extraletterText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'medium',
    includeFontPadding: false,
  }
})