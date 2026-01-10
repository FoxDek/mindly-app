import { actionsCosts, userRewards } from "@/assets/data/game-economic-data";
import { useUserActions, useUserData } from "@/store/useUserStore";
import { useRouter } from "expo-router";

export function useUserBalance() {
  const userData = useUserData();
  const balance = userData.balance;
  const { updateUserData } = useUserActions();
  const router = useRouter();

  const updateBalance = (newBalance: number) => {
    if (newBalance < 0) {
      router.push({
        pathname: "/(modals)/universal-alert-modal",
        params: { message: "Недостаточно средств" },
      });
      return false;
    }

    updateUserData({ balance: newBalance });

    return true;
  };

  const buyOpenHints = () => updateBalance(balance - actionsCosts.openHints);

  const buyDisplayLetter = () =>
    updateBalance(balance - actionsCosts.displayLetter);

  const buyRemoveExtraLetters = () =>
    updateBalance(balance - actionsCosts.removeExtraLetters);

  const buyRevealWord = () => updateBalance(balance - actionsCosts.revealWord);

  const accrueForLevelPart = () => updateBalance(balance + userRewards.levelPartCompleted);

  const accrueForLevel = () => updateBalance(balance + userRewards.levelCompleted);

  return {
    balance,
    buyOpenHints,
    buyDisplayLetter,
    buyRemoveExtraLetters,
    buyRevealWord,
    accrueForLevelPart,
    accrueForLevel,
  };
}
