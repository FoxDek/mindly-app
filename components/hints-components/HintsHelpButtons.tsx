import { actionsCosts } from "@/assets/data/game-economic-data";
import { useLevelHints } from "@/hoocs/useLevelHints";
import { useUserBalance } from "@/hoocs/useUserBalance";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HintsHelpButtonsProps {
  word: string;
  wordLength: number;
  wordIndex: number;
  setCurrentWord: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  currentWord: (string | null)[];
  extraLettersRemoved: boolean;
}

export default function HintsHelpButtons({
  word,
  wordLength,
  wordIndex,
  currentWord,
  setCurrentWord,
  extraLettersRemoved,
}: HintsHelpButtonsProps) {
  const { buyDisplayLetter, buyRemoveExtraLetters, buyRevealWord } =
    useUserBalance();
  const { displayNewLetter, deleteExtraLetters } = useLevelHints();

  const handleOpenLetter = () => {
    if (buyDisplayLetter() === false) return;
    const newLetterIndex = displayNewLetter(wordIndex, wordLength);

    if (newLetterIndex) {
      const newWord = [...currentWord];
      newWord[newLetterIndex] = word[newLetterIndex];
      setCurrentWord(newWord);
    }
  };

  const handleDeleteExtraLetters = () => {
    if (extraLettersRemoved) return;
    if (buyRemoveExtraLetters() === false) return;
    deleteExtraLetters(wordIndex);
  };

  const handleRevealWord = () => {
    if (buyRevealWord() === false) return;
    setCurrentWord(word.split(""));
  };

  return (
    <View style={styles.helpButtons}>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={handleOpenLetter}
      >
        <View style={[styles.helpButton, { backgroundColor: "#A3D977" }]}>
          <Text style={styles.helpButtonText}>Показать букву</Text>
        </View>
        <View style={styles.costLabel}>
          <Text style={styles.costLabelText}>{actionsCosts.displayLetter}</Text>
          <View style={styles.costLabelIcon}></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={handleDeleteExtraLetters}
      >
        <View style={[styles.helpButton, { backgroundColor: "#FF9E6B" }]}>
          <Text style={styles.helpButtonText}>Удалить лишние</Text>
        </View>
        <View style={styles.costLabel}>
          <Text style={styles.costLabelText}>
            {actionsCosts.removeExtraLetters}
          </Text>
          <View style={styles.costLabelIcon}></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={0.8}
        onPress={handleRevealWord}
      >
        <View style={[styles.helpButton, { backgroundColor: "#118AB2" }]}>
          <Text style={styles.helpButtonText}>Открыть слово</Text>
        </View>
        <View style={styles.costLabel}>
          <Text style={styles.costLabelText}>{actionsCosts.revealWord}</Text>
          <View style={styles.costLabelIcon}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  helpButtons: {
    marginTop: "auto",
    flexDirection: "row",
    paddingBottom: 30,
    gap: 10,
  },
  helpButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  helpButtonText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    flexWrap: "wrap",
  },
  costLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    position: "absolute",
    top: "90%",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    backgroundColor: "white",
    padding: 4,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 5,
  },
  costLabelText: {
    color: "black",
    fontSize: 12,
    includeFontPadding: false,
  },
  costLabelIcon: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: "#F9DE74",
  },
});
