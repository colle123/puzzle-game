export const FRUITS = [
  { name: "사과", image: "assets/images/fruits/apple.svg" },
  { name: "바나나", image: "assets/images/fruits/banana.svg" },
  { name: "체리", image: "assets/images/fruits/cherry.svg" },
  { name: "포도", image: "assets/images/fruits/grape.svg" },
  { name: "키위", image: "assets/images/fruits/kiwi.svg" },
  { name: "오렌지", image: "assets/images/fruits/orange.svg" },
  { name: "딸기", image: "assets/images/fruits/strawberry.svg" },
  { name: "수박", image: "assets/images/fruits/watermelon.svg" },
  { name: "레몬", image: "assets/images/fruits/lemon.svg" },
  { name: "복숭아", image: "assets/images/fruits/peach.svg" },
  { name: "배", image: "assets/images/fruits/pear.svg" },
  { name: "파인애플", image: "assets/images/fruits/pineapple.svg" },
  { name: "자두", image: "assets/images/fruits/plum.svg" },
  { name: "라임", image: "assets/images/fruits/lime.svg" },
  { name: "망고", image: "assets/images/fruits/mango.svg" },
  { name: "블루베리", image: "assets/images/fruits/blueberry.svg" },
  { name: "라즈베리", image: "assets/images/fruits/raspberry.svg" },
  { name: "코코넛", image: "assets/images/fruits/coconut.svg" }
];

export const TOTAL_PAIRS = FRUITS.length;
export const BOARD_COLUMNS = 6;
export const FLIP_BACK_DELAY = 850;
export const GAME_DURATION_SECONDS = 120;

export function shuffle(array) {
  const next = [...array];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
  }

  return next;
}
