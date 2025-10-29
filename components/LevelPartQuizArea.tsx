import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useLevelData } from "@/hoocs/useLevelData";
import LevelPartQuizAnswers from "./LevelPartQuizAnswers";

export default function LevelPartQuizArea() {
  const { levelPartData } = useLevelData();
  const { width } = Dimensions.get("window");

  if (!levelPartData) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.quizContainer}
      contentContainerStyle={{ gap: 20, flexGrow: 1 }}
      nestedScrollEnabled
      keyboardShouldPersistTaps="always"
    >
      <View style={[styles.questionContainer, { width: width * 0.88 }]}>
        <Text style={styles.questionText}>{levelPartData.question}</Text>
      </View>

      <LevelPartQuizAnswers />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  quizContainer: {
    width: "100%",
    height: "100%",
  },
  questionContainer: {
    marginLeft: 20,
    width: "100%",
    height: "100%",
    flex: 1,
    minHeight: "50%",
    padding: 20,
    // backgroundColor: 'green',
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
});
