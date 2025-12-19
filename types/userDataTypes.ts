interface wordHints {
  lettersOpened?: number[];
  extraLettersRemoved?: boolean;
}

interface PartProgress {
  answered: string[];
  isCompleted: boolean;
  hintsOpened: number[];
  usedHints: {
    [wordIndex: string]: wordHints;
  };
}

interface UserGameProgress {
  [level: string]: {
    // completed: boolean;
    parts: {
      [part: string]: PartProgress;
    };
  };
}

interface UserData {
  // stars: number;
  balance: number;
  progress: UserGameProgress;
}

export { PartProgress, UserGameProgress, UserData };
