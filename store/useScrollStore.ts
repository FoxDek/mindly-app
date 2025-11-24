import { create } from "zustand";
import { Dimensions, ScrollView } from "react-native";

const { width } = Dimensions.get("window");

type ScrollState = {
  horizontalScrollRef: React.RefObject<ScrollView> | null;
  verticalScrollRef: React.RefObject<ScrollView> | null;
  actions: {
    setHorizontalScrollRef: (ref: React.RefObject<ScrollView>) => void;
    setVerticalScrollRef: (ref: React.RefObject<ScrollView>) => void;
    scrollToAnswers: () => void;
    scrollToAnswerVertical: (index: number) => void;
    horizontalScrollBack: () => void;
  }
};

export const useScrollStore = create<ScrollState>((set, get) => ({
  horizontalScrollRef: null,
  verticalScrollRef: null,

  actions: {
    setHorizontalScrollRef: (ref) => set({ horizontalScrollRef: ref }),
    setVerticalScrollRef: (ref) => set({ verticalScrollRef: ref }),

    scrollToAnswers: () => {
      const { horizontalScrollRef } = get();
      if (horizontalScrollRef?.current) {
        horizontalScrollRef.current.scrollTo({
          x: width * 0.88,
          animated: true,
        });
      }
    },

    scrollToAnswerVertical: (index: number) => {
      const { verticalScrollRef } = get();
      if (verticalScrollRef?.current) {
        // каждый блок имеет фиксированную высоту, например 60
        const itemHeight = 60; 
        verticalScrollRef.current.scrollTo({
          y: index * itemHeight,
          animated: true,
        });
      }
    },

    horizontalScrollBack: () => {
      const { horizontalScrollRef } = get();
      if (horizontalScrollRef?.current) {
        horizontalScrollRef.current.scrollTo({
          x: 0,
          animated: true,
        });
      }
    },
  },

  
}));

export const useScrollRef = () => useScrollStore((state) => state.horizontalScrollRef);
export const useScrollActions = () => useScrollStore((state) => state.actions);