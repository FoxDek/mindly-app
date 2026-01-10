import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import LevelPartHeader from '../../../components/LevelPartHeader';
import LevelPartQuizArea from '@/components/LevelPartQuizArea';
import { SafeAreaView } from 'react-native-safe-area-context';
import LevelPartInputArea from '@/components/LevelPartInputArea';
import { useLevelInput } from '@/hoocs/useLevelInput';
import { useEffect, useRef, useState } from 'react';
import { useLevelPartActions, useSolvedHintsWord } from '@/store/useLevelPartStore';
import { useLevelData } from '@/hoocs/useLevelData';
import { Image } from 'expo-image';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';


export default function LevelPart() {
  const {handleSendValue} = useLevelInput();
  const solvedHintsWord = useSolvedHintsWord();
  const { setSolvedHintsWord } = useLevelPartActions();
  const { levelPartData } = useLevelData();
  const [showLoader, setShowLoader] = useState(true);
  const imageLoadedRef = useRef(false);
  
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.x;
    },
  });

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [0, 0.2],
      ),
    };
  });
  
  useEffect(() => {
    // solvedHintsWord - слово, которое мы устанавливаем в стейт Hints, чтобы понять, что слово отгадано
    if (solvedHintsWord) {
      console.log(solvedHintsWord)
      handleSendValue(solvedHintsWord);
      setSolvedHintsWord('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solvedHintsWord]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#4091E4' }}>
      <KeyboardAvoidingView style={styles.levelPartContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        
        {
          levelPartData?.image ?
          <View style={{ flex: 1, width: '100%' }}>
            {/* <ImageBackground
              source={{ uri: levelPartData.image }}
              style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center' }}
              contentFit='cover'
              contentPosition={'center'}
            > */}
              <Image
                source={{ uri: levelPartData.image }}
                style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', opacity: showLoader ? 0 : 1 }}
                contentFit='cover'
                contentPosition={'center'}
                cachePolicy={'disk'}
                transition={0}
                // placeholder={require('@/assets/images/images-placeholder.png')}
                // placeholderContentFit='cover'
                onLoadEnd={() => {
                  if (!imageLoadedRef.current) {
                    imageLoadedRef.current = true;
                    setShowLoader(false);
                  }
                }}
              />
              
              <Animated.View style={[{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black' }, overlayStyle]} />

              {showLoader && (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <ActivityIndicator size="large" color="white" />
                </View>
              )}

              <View style={StyleSheet.absoluteFill}>
                <LevelPartHeader />
                <LevelPartQuizArea scrollHandler={scrollHandler}/>
              </View>

          </View>
          :
          <>
            <LevelPartHeader />
            <LevelPartQuizArea scrollHandler={scrollHandler}/>
          </>
        }
        <LevelPartInputArea />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  levelPartContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: '#4091E4',
  },
})