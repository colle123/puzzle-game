import { renderBoard, updateGuide } from "./board.js";
import {
  createDeck,
  getGoalText,
  getProgressText,
  getTipText,
  updateMessage
} from "./game.js";
import { FLIP_BACK_DELAY, FRUITS, TOTAL_PAIRS, shuffle } from "./utils.js";

const restartButton = document.getElementById("restart-button");

const state = {
  cards: [],
  flippedIndexes: [],
  matchedPairs: 0,
  attemptCount: 0,
  isBoardLocked: false
};

let resetTimerId = null;

function drawScreen() {
  renderBoard(state, TOTAL_PAIRS, flipCard);
  updateGuide(
    getGoalText(state.matchedPairs, TOTAL_PAIRS),
    getProgressText(state, TOTAL_PAIRS),
    getTipText(state.matchedPairs)
  );
}

function finishGame() {
  updateMessage(`축하합니다! ${state.attemptCount}번 만에 모든 과일 페어를 완성했습니다.`);
  drawScreen();
}

function resetOpenCards() {
  state.flippedIndexes = [];
  state.isBoardLocked = false;
  resetTimerId = null;
  updateMessage("다른 카드였습니다. 위치를 기억해 두고 다시 도전해 보세요.");
  drawScreen();
}

function flipCard(index) {
  const card = state.cards[index];

  if (state.isBoardLocked || state.flippedIndexes.includes(index) || card.matched) {
    return;
  }

  state.flippedIndexes.push(index);
  updateMessage(
    state.flippedIndexes.length === 1
      ? "첫 번째 카드를 확인했습니다. 같은 과일 카드를 한 장 더 찾아보세요."
      : "두 번째 카드를 확인했습니다. 같은 과일인지 비교하고 있습니다."
  );
  drawScreen();

  if (state.flippedIndexes.length < 2) {
    return;
  }

  state.isBoardLocked = true;
  state.attemptCount += 1;

  const [firstIndex, secondIndex] = state.flippedIndexes;
  const firstCard = state.cards[firstIndex];
  const secondCard = state.cards[secondIndex];

  if (firstCard.pairId === secondCard.pairId) {
    state.cards[firstIndex].matched = true;
    state.cards[secondIndex].matched = true;
    state.matchedPairs += 1;
    state.flippedIndexes = [];
    state.isBoardLocked = false;

    if (state.matchedPairs === TOTAL_PAIRS) {
      finishGame();
      return;
    }

    updateMessage("같은 과일 페어를 맞췄습니다. 다음 카드를 이어서 찾아보세요.");
    drawScreen();
    return;
  }

  updateMessage("서로 다른 과일 카드입니다. 잠시 후 다시 뒤집힙니다.");

  resetTimerId = window.setTimeout(() => {
    resetOpenCards();
  }, FLIP_BACK_DELAY);
}

function startGame() {
  if (resetTimerId) {
    window.clearTimeout(resetTimerId);
    resetTimerId = null;
  }

  state.cards = createDeck(FRUITS, shuffle);
  state.flippedIndexes = [];
  state.matchedPairs = 0;
  state.attemptCount = 0;
  state.isBoardLocked = false;
  updateMessage("첫 번째 카드를 뒤집어 같은 과일의 위치를 찾아보세요.");
  drawScreen();
}

restartButton.addEventListener("click", startGame);

startGame();
