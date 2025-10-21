import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Level() {
  const { level } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <Text>Level {level}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})