import { useUserActions, useUserData } from "@/store/useUserStore"
import { useRouter } from "expo-router";

const actionsCosts = {
  openHints: 30,
  displayLetter: 30,
  removeExtraLetters: 50,
  revealWord: 80
}

export function useUserBalance() {
  const userData = useUserData();
  const balance = userData.balance;
  const { updateUserData } = useUserActions();
  const router = useRouter();

  const updateBalance = (newBalance: number) => {
    if (newBalance < 0) {
      router.push({pathname: '/(modals)/universal-alert-modal', params: {message: 'Недостаточно средств'}});
      return
    }

    updateUserData({balance: newBalance})
  }

  const buyOpenHints = () => updateBalance(balance - actionsCosts.openHints);

  const buyDisplayLetter = () => updateBalance(balance - actionsCosts.displayLetter);

  const buyRemoveExtraLetters = () => updateBalance(balance - actionsCosts.removeExtraLetters);

  const buyRevealWord = () => updateBalance(balance - actionsCosts.revealWord);

  return {
    balance,
    buyOpenHints,
    buyDisplayLetter,
    buyRemoveExtraLetters,
    buyRevealWord
  }
}