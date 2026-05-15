import { renderBoard, updateGuide } from "./board.js";
import {
  createDeck,
  getGoalText,
  getProgressText,
  getTimerText,
  getTipText,
  updateMessage
} from "./game.js";
import {
  BOARD_COLUMNS,
  FLIP_BACK_DELAY,
  GAME_DURATION_SECONDS,
  FRUITS,
  TOTAL_PAIRS,
  shuffle
} from "./utils.js";

const restartButton = document.getElementById("restart-button");

const state = {
  cards: [],
  flippedIndexes: [],
  matchedPairs: 0,
  attemptCount: 0,
  isBoardLocked: false,
  timeRemaining: GAME_DURATION_SECONDS,
  timerId: null
};

let resetTimerId = null;

function updateGuideDisplay() {
  updateGuide(
    getGoalText(state.matchedPairs, TOTAL_PAIRS),
    getProgressText(state, TOTAL_PAIRS),
    getTipText(state.matchedPairs, TOTAL_PAIRS, state.timeRemaining),
    getTimerText(state.timeRemaining)
  );
}

function drawScreen() {
  renderBoard(state, TOTAL_PAIRS, BOARD_COLUMNS, flipCard);
  updateGuideDisplay();
}

function stopTimers() {
  if (resetTimerId) {
    window.clearTimeout(resetTimerId);
    resetTimerId = null;
  }

  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function finishGame() {
  stopTimers();
  updateMessage(`축하합니다. ${state.attemptCount}번 만에 모든 과일 짝을 맞췄어요.`);
  drawScreen();
}

function gameOver() {
  stopTimers();
  state.timeRemaining = 0;
  state.flippedIndexes = [];
  state.isBoardLocked = true;
  updateMessage("시간 초과예요. 게임 다시 시작 버튼을 눌러 다시 도전해 보세요.");
  drawScreen();
}

function resetOpenCards() {
  state.flippedIndexes = [];
  state.isBoardLocked = false;
  resetTimerId = null;
  updateMessage("서로 다른 카드예요. 방금 본 위치를 기억하고 다시 도전해 보세요.");
  drawScreen();
}

function flipCard(index) {
  const card = state.cards[index];

  if (
    state.isBoardLocked ||
    state.timeRemaining <= 0 ||
    state.flippedIndexes.includes(index) ||
    card.matched
  ) {
    return;
  }

  state.flippedIndexes.push(index);
  updateMessage(
    state.flippedIndexes.length === 1
      ? "첫 번째 카드를 열었어요. 같은 과일 카드를 찾아보세요."
      : "두 번째 카드를 열었어요. 같은 과일인지 확인하고 있어요."
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

    updateMessage("같은 과일 짝을 찾았어요. 다음 카드를 이어서 찾아보세요.");
    drawScreen();
    return;
  }

  updateMessage("서로 다른 과일 카드예요. 잠시 뒤 다시 뒤집혀요.");
  resetTimerId = window.setTimeout(resetOpenCards, FLIP_BACK_DELAY);
}

function startGame() {
  stopTimers();

  state.cards = createDeck(FRUITS, shuffle);
  state.flippedIndexes = [];
  state.matchedPairs = 0;
  state.attemptCount = 0;
  state.isBoardLocked = false;
  state.timeRemaining = GAME_DURATION_SECONDS;
  updateMessage("첫 번째 카드를 뒤집고 같은 과일이 어디 있는지 찾아보세요.");

  state.timerId = window.setInterval(() => {
    state.timeRemaining -= 1;

    if (state.timeRemaining <= 0) {
      gameOver();
      return;
    }

    updateGuideDisplay();
  }, 1000);

  drawScreen();
}

restartButton.addEventListener("click", startGame);

startGame();
