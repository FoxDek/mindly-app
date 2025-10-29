import { create } from "zustand";

interface LevePartStore {
  answeredPercent: number;
  actions: {
    setAnsweredPercent: (percent: number) => void;
  };
}

export const useLevelPartStore = create<LevePartStore>((set, get) => ({
  answeredPercent: 0,
  actions: {
    setAnsweredPercent: (percent) => set({ answeredPercent: percent }),
  },
}));

export const useAnsweredPercent = () => useLevelPartStore((state) => state.answeredPercent);
export const useLevelPartActions = () => useLevelPartStore((state) => state.actions);
