import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Image } from 'expo-image';

export default function LevelPartInputArea() {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 300); // небольшая задержка, чтобы экран успел смонтироваться
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.levelPartInputContainer}>
      <TouchableOpacity activeOpacity={0.8} style={styles.levelPartHintButton}>
        <Image
          style={{
            width: 20,
            height: '100%',
          }}
          source={require("@/assets/images/mindly-lamp.png")}
          contentFit="cover"
          transition={1000}
        />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={styles.levelPartInput}
        cursorColor={'white'}
        selectionColor={'white'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  levelPartInputContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    width: "100%",
    
  },
  levelPartInput: {
    flex: 1,
    backgroundColor: "#3477BD",
    color: "white",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    height: '100%',
    fontSize: 20
  },
  levelPartHintButton: {
    aspectRatio: 1,
    width: 'auto',
    height: '100%',
    backgroundColor: "#3477BD",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12
  }
});
