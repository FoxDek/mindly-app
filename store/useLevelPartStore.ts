import { create } from "zustand";

interface LevePartStore {
  answeredPercent: number;
  solvedHintsWord: string;
  actions: {
    setAnsweredPercent: (percent: number) => void;
    setSolvedHintsWord: (word: string) => void;
  };
}

export const useLevelPartStore = create<LevePartStore>((set, get) => ({
  answeredPercent: 0,
  solvedHintsWord: "",
  actions: {
    setAnsweredPercent: (percent) => set({ answeredPercent: percent }),
    setSolvedHintsWord: (word) => set({ solvedHintsWord: word }),
  },
}));

export const useAnsweredPercent = () => useLevelPartStore((state) => state.answeredPercent);
export const useSolvedHintsWord = () => useLevelPartStore((state) => state.solvedHintsWord);
export const useLevelPartActions = () => useLevelPartStore((state) => state.actions);
