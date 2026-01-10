import { ScrollView, StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import { useLevelData } from "@/hoocs/useLevelData";
import LevelPartQuizAnswers from "./LevelPartQuizAnswers";
import { useScrollActions } from "@/store/useScrollStore";
import { useEffect, useRef, useState } from "react";
import ImageViewing from "react-native-image-viewing";
import Animated from "react-native-reanimated";

export default function LevelPartQuizArea({scrollHandler}: {scrollHandler: any}) {
  const { levelPartData } = useLevelData();
  const { width } = Dimensions.get("window");
  const horizontalScrollRef = useRef<Animated.ScrollView>(null);
  const { setHorizontalScrollRef } = useScrollActions();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHorizontalScrollRef(horizontalScrollRef as React.RefObject<ScrollView>);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!levelPartData) return null;

  // Если есть изображение, рендерим ImageBackground
  if (levelPartData.image) {
    return (
      <Animated.ScrollView
        ref={horizontalScrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.quizContainer}
        contentContainerStyle={{ gap: 20, flexGrow: 1 }}
        nestedScrollEnabled
        keyboardShouldPersistTaps="always"
      >
        <Pressable onPress={() => setVisible(true)}>
          <View style={[styles.questionContainer, { width: width * 0.88, padding: levelPartData.image ? 0 : 20 }]}>
            {levelPartData.question && <Text style={styles.questionText}>{levelPartData.question}</Text>}
          </View>
        </Pressable>
        <LevelPartQuizAnswers />

        <ImageViewing
          images={[{ uri: levelPartData?.image }]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />

      </Animated.ScrollView>
    );
  }

  // Если нет изображения, рендерим ScrollView
  return (
    <ScrollView
      ref={horizontalScrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.quizContainer}
      contentContainerStyle={{ gap: 20, flexGrow: 1 }}
      nestedScrollEnabled
      keyboardShouldPersistTaps="always"
    >
      <View style={[styles.questionContainer, { width: width * 0.88, padding: levelPartData.image ? 0 : 20 }]}>
        {levelPartData.question && <Text style={styles.questionText}>{levelPartData.question}</Text>}
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
  questionImageContainer: {
    width: "100%",
    overflow: 'hidden',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginVertical: 'auto'
  },
  questionImage: {
    width: "100%",
    height: "100%",
    
  },
});
