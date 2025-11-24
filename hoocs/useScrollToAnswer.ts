// import { useScrollActions } from "@/store/useScrollStore";
// import { useRef } from "react";
// import { Dimensions, ScrollView } from "react-native";

// export const useScrollToAnswer = () => {
//   const { width } = Dimensions.get("window");
//   const horizontalScrollRef = useRef<ScrollView>(null);
//   const { setScrollRef } = useScrollActions();

//   const scrollToAnswers = () => {
//     if (horizontalScrollRef.current) {
//       horizontalScrollRef.current.scrollTo({ x: width * 0.88, animated: true });
//     }
//   };

//   return { horizontalScrollRef, scrollToAnswers };
// };
