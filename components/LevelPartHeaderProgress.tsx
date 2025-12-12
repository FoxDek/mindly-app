import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { useAnsweredPercent } from '@/store/useLevelPartStore';

interface HeaderProgressProps {
  circleSize: number,
  textSize: number
}

export default function LevelPartHeaderProgress({circleSize, textSize}: HeaderProgressProps) {
  const answeredPercent = useAnsweredPercent();

  
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Progress.Circle
        progress={answeredPercent / 100}
        size={circleSize}
        thickness={circleSize / 12}
        color="#A0D73A"
        unfilledColor="rgba(255,255,255,0.2)"
        borderWidth={0}
        showsText={false} // скрываем встроенный текст
      />
      <Text
        style={[styles.progressText, { fontSize: textSize }]}
      >
        {Math.round(answeredPercent)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  progressText: {
    position: 'absolute',
    color: '#fff',
    // fontSize: 12 ,
    fontWeight: '600',
  }
})