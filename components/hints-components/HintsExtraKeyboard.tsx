import { FlatList, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useLevelData } from '@/hoocs/useLevelData';
import { mapExtraLettersByWord } from '@/utils/hintsLogic';

interface HintsExtraKeyboardProps {
  word: string;
  currentWord: (string | null)[];
  wordIndex: number;
  setChosenExtraLetters: React.Dispatch<React.SetStateAction<number[]>>;
  chosenExtraLetters: number[];
  setCurrentWord: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  wordLettersOpened: number[];
  extraLettersRemoved: boolean | undefined;
}

export default function HintsExtraKeyboard({word, currentWord, wordIndex, setChosenExtraLetters, chosenExtraLetters, setCurrentWord, wordLettersOpened, extraLettersRemoved }: HintsExtraKeyboardProps) {
  const { levelPartData } = useLevelData();
  const extraLetters = levelPartData?.answers?.[wordIndex]?.extraLetters || [];
  const extraLettersClear = mapExtraLettersByWord(word, extraLetters, wordLettersOpened);
  const {width} = useWindowDimensions();

  const openLetter = (index: number) => {
    const emptyIndex = currentWord.indexOf(null) // первый пустой индекс
    if (emptyIndex === -1) return;

    const newLetter = extraLetters?.[index];
    if (newLetter === undefined) return;
    const newWord = [...currentWord];
    newWord[emptyIndex] = newLetter;
    setChosenExtraLetters([...chosenExtraLetters, index]);
    setCurrentWord(newWord);
  }

  const deleteLetter = () => {
    const lastFilledIndex = [...currentWord]
      .map((ch, i) => (ch !== null ? i : -1))
      .filter(i => i !== -1 && !wordLettersOpened.includes(i))
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
        data={extraLettersRemoved ? extraLettersClear : extraLetters}
        numColumns={9}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, gap: 10 }}
        columnWrapperStyle={{ gap: 5, flexWrap: 'nowrap', justifyContent: 'space-between' }}
        scrollEnabled={false}
        renderItem={({item: letter, index}) => {
          const extraLetterIsChosen = chosenExtraLetters.includes(index);
          const letterIsHidden = extraLetterIsChosen || letter === null;
          // если буква выбрана - null, иначе - ЕСЛИ мы удалили лишние буквы и она не содержится в extraLettersClear, то null, ИНАЧЕ - открываем

          return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => letterIsHidden ? null : openLetter(index)}>
              <View key={index} style={
                [styles.extraLetterContainer,
                letterIsHidden ? { borderColor: 'transparent' } : {},
                {paddingHorizontal: width < 400 ? 4 : 6, paddingVertical: width < 400 ? 8 : 12}
              ]}>
                <Text style={[
                  styles.extraletterText,
                  {fontSize: width < 400 ? 20 : 24},
                ]}>{letterIsHidden ? '' :  letter}</Text>
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
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 34,
    width: 'auto',
    alignItems: 'center',
    borderColor: '#BABABA',
    borderWidth: 1,
    includeFontPadding: false,
  },
  extraletterText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'medium',
    includeFontPadding: false,
  }
})