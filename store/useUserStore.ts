import { create } from 'zustand'

export interface UserGameProgress {
  [level: string]: {
    completed: boolean;
    parts: {
      [part: string]: {
        answered: string[];
        isCompleted: boolean;
      };
    };
  };
}

interface UserData {
  stars: number;
  balance: number;
  progress: UserGameProgress;
}

interface UserStore {
  userData: UserData;
  actions: {
    loadUserData: () => Promise<void>;
    updateUserData: (newData: Partial<UserData>) => Promise<void>;
  }
}

const DEFAULT_USER_DATA: UserData = {
  stars: 2,
  balance: 600,
  progress: {
    "1": {
      completed: false,
      parts: {
        "1": { answered: ["корзина", "плед", "еда", "напитки", "шашлык", "уголь", "посуда"], isCompleted: true },
        "2": { answered: ["гриль"], isCompleted: true },
        "3": { answered: [], isCompleted: false }
      }
    }
  }
};

export const useUserStore = create<UserStore>((set, get) => ({
  userData: DEFAULT_USER_DATA,

  actions: {
    loadUserData: async () => { // подгрузка данных с хранилища
      try {
        
      } catch (error) {
        console.error('Ошибка: ', error);
      }
    },
    updateUserData: async (newData) => {
      const updated = { ...get().userData, ...newData };
      set({ userData: updated });
    }
  },
}))

export const useUserData = () => useUserStore((state) => state.userData);
export const useUserProgress = () => useUserStore((state) => state.userData.progress);

export const useUserActions = () => useUserStore((state) => state.actions);