import { useLevelInputActions, useLevelInputValue } from "@/store/useLevelInputStore";
import { useLevelData } from "./useLevelData";
import { useUserLevelData } from "./useUserLevelData";
import { useScrollActions } from "@/store/useScrollStore";
import { useShakeAnimation } from "./useShakeAnimation";
import { triggerShakeById } from "@/utils/shakeRegistry";
import { useEffect } from "react";

export function useLevelInput () {
  const { levelPartData } = useLevelData();
  const { setNewWord } = useUserLevelData();
  const { partProgress } = useUserLevelData();
  const inputValue = useLevelInputValue();
  const { setValue } = useLevelInputActions();
  const { scrollToAnswers, horizontalScrollBack, scrollToAnswerVertical } = useScrollActions();

  const handleSendValue = async (extraValue = '') => {
    // 1) не ввёл ничего
    if (inputValue.trim() === '' && extraValue.trim() === '') {
      console.log('слово не введено');
      return;
    }

    console.log('слово введено');
    const normalizedValue = normalizeInputValue(inputValue ? inputValue : extraValue);
    
    const valueIsFound = levelPartData?.answers.find(answer => {
      // console.log(normalizeInputValue(answer.word));
      return normalizeInputValue(answer.word) === normalizedValue || 
        answer?.synonyms && answer?.synonyms.some(synonym => normalizeInputValue(synonym) === normalizedValue);
    });

    const valueIsFoundIndex = levelPartData?.answers.findIndex(answer =>
      normalizeInputValue(answer.word) === normalizedValue ||
      answer?.synonyms?.some(
        (syn) => normalizeInputValue(syn) === normalizedValue
      )
    );

    // 2) слово найдено, индекс в списке определён
    if (valueIsFound && valueIsFoundIndex !== undefined && valueIsFoundIndex >= 0) {
      // 3) слово уже отгадано и есть в прогрессе
      if (partProgress && partProgress?.answered.includes(valueIsFound.word)) {
        scrollToAnswers();
        scrollToAnswerVertical(valueIsFoundIndex);
        // triggerShake();
        setTimeout(() => {
          triggerShakeById(valueIsFoundIndex);
        }, 450);
        setValue('');
        return;
      }

      scrollToAnswers();
      scrollToAnswerVertical(valueIsFoundIndex);

      setTimeout(() => {
        setNewWord(valueIsFound.word)
      }, 600)
      
      setTimeout(() => {
        horizontalScrollBack();
      }, 1300)
      
      setValue('');

      return;
    }
    
    // 4) такого слова нет
    triggerShakeById("header-title");
    setValue('');
  };


  const normalizeInputValue = (rawValue: string) => {
    if (!rawValue || typeof rawValue !== 'string') {
      return '';
    }

    const processedValue = rawValue
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/\s{2,}/g, ' ')
      .trim();

    return processedValue;
  }

  return {
    inputValue,
    setValue,
    handleSendValue
  };
}