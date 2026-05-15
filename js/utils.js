export const FRUITS = [
  { name: "사과", image: "assets/images/fruits/apple.svg" },
  { name: "바나나", image: "assets/images/fruits/banana.svg" },
  { name: "포도", image: "assets/images/fruits/grape.svg" },
  { name: "오렌지", image: "assets/images/fruits/orange.svg" },
  { name: "수박", image: "assets/images/fruits/watermelon.svg" },
  { name: "딸기", image: "assets/images/fruits/strawberry.svg" },
  { name: "키위", image: "assets/images/fruits/kiwi.svg" },
  { name: "체리", image: "assets/images/fruits/cherry.svg" }
];
export const TOTAL_PAIRS = FRUITS.length;
export const FLIP_BACK_DELAY = 850;

export function shuffle(array) {
  const next = [...array];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
}
