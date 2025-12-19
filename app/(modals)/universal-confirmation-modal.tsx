import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useUserBalance } from '@/hoocs/useUserBalance';
import { useLevelHints } from '@/hoocs/useLevelHints';

export default function ConfirmationModal() {
  const params = useLocalSearchParams();
  const message = params.message as string || '';
  const type = params.type as string || '';
  const word = params.word as string || '';
  const level = Number(params.level);
  const levelPart = Number(params.levelPart);
  const wordIndex = Number(params.wordIndex) || 0;
  const question = params.question as string || '';
  const { buyOpenHints } =  useUserBalance()
  const {createUsedHints} = useLevelHints()

  const openHints = () => {
    buyOpenHints();
    createUsedHints(wordIndex);

    router.dismiss(); // закрываем модалку

    setTimeout(() => {
      router.push({
        pathname: "/[level]/[levelPart]/hints/[wordIndex]",
        params: {
          level,
          levelPart,
          wordIndex,
          word,
          question
        }
      });
    }, 0);
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.backdrop} />
      <View style={styles.modal}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.back()}
          >
            <Feather name="x" size={40} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={type === 'purchase' ? openHints : () => router.back()}
          >
            <Feather name="check" size={40} color="white" />

            {type === 'purchase' && <View style={styles.costLabel}>
              <Text style={styles.costLabelText}>30</Text>
              <View style={styles.costLabelIcon}/>
            </View>}
          </TouchableOpacity>
        </View>

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
    width: '70%',
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
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    backgroundColor: '#4091E4',
    width: '50%',
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  costLabel: {
    position: 'absolute',
    top: '100%',
    right: '60%',
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 1000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    transform: [{ translateY: 30 }]
  },
  costLabelText: {
    color: 'black',
    fontSize: 14
  },
  costLabelIcon: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: '#F9DE74'
  }
})