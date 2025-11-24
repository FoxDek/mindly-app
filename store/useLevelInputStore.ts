import { create } from "zustand";


interface LevelInputStore {
  inputValue: string;
  actions: {
    setValue: (value: string) => void;
  };
}

export const useLevelInputStore = create<LevelInputStore>((set, get) => ({
  inputValue: "",
  actions: {
    setValue: (value: string) => set({ inputValue: value }),
  },
}));

export const useLevelInputValue = () => useLevelInputStore((state) => state.inputValue);
export const useLevelInputActions = () => useLevelInputStore((state) => state.actions);