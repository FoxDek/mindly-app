import { levels } from '@/assets/data/levels-data';
import { create } from 'zustand'

export interface UserGameProgress {
  [level: string]: {
    // completed: boolean;
    parts: {
      [part: string]: {
        answered: string[];
        isCompleted: boolean;
        usedHints: { lettersOpened: number[]; extraLettersRemoved: boolean; }
      };
    };
  };
}

interface UserData {
  // stars: number;
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

function createDefaultUserData(): UserData {
  const progress: UserData["progress"] = {};

  levels.forEach((level) => {
    const parts: UserData["progress"][string]["parts"] = {};

    level.parts.forEach((part) => {
      parts[String(part.id)] = {
        answered: [],
        isCompleted: false,
        usedHints: {
          lettersOpened: [1],
          extraLettersRemoved: false,
        }
      };
    });

    progress[String(level.id)] = {
      // completed: false,
      parts,
    };
  });

  return {
    // stars: 0, // не храним, т.к. получаем динамически в useUserLevelData из количества пройденных подуровней
    balance: 600,
    progress,
  };
}

const DEFAULT_USER_DATA = createDefaultUserData();

// const DEFAULT_USER_DATA: UserData = {
//   stars: 2,
//   balance: 600,
//   progress: {
//     "1": {
//       parts: {
//         "1": { answered: ["корзина", "плед", "еда", "напитки", "шашлык", "уголь", "посуда"], isCompleted: true, usedHints: { lettersOpened: [0], extraLettersRemoved: false } },
//         "2": { answered: ["гриль"], isCompleted: true, usedHints: { lettersOpened: [0], extraLettersRemoved: false } },
//         "3": { answered: [], isCompleted: false, usedHints: { lettersOpened: [0], extraLettersRemoved: false } }
//       }
//     }
//   }
// };

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