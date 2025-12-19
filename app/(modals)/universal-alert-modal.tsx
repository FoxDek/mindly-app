import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function AlertModal() {
  const params = useLocalSearchParams();
  const message = params.message as string || '';
  const starsNeed = Number(params.starsNeed) || null;

  return (
    <View style={styles.overlay}>
      <View style={styles.backdrop} />
      <View style={styles.modal}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
          {starsNeed && <Text style={styles.message}>Наберите ещё: <Text style={{ fontWeight: 'bold' }}>{starsNeed}</Text></Text>}
        </View>
        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Feather name="check" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 20,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#4091E4',
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})