const boardElement = document.getElementById("game-board");
const attemptCountElement = document.getElementById("attempt-count");
const matchCountElement = document.getElementById("match-count");
const gameStatusElement = document.getElementById("game-status");
const currentGoalElement = document.getElementById("current-goal");
const progressSummaryElement = document.getElementById("progress-summary");
const playTipElement = document.getElementById("play-tip");

export function renderBoard(state, totalPairs, onFlipCard) {
  boardElement.innerHTML = "";

  state.cards.forEach((card, index) => {
    const button = document.createElement("button");
    const isFlipped = state.flippedIndexes.includes(index);

    button.type = "button";
    button.className = "card";
    button.setAttribute("aria-label", `${index + 1}번 카드 뒤집기`);

    if (isFlipped) {
      button.classList.add("is-flipped");
    }

    if (card.matched) {
      button.classList.add("is-matched");
    }

    button.disabled = state.isBoardLocked || isFlipped || card.matched;
    button.addEventListener("click", () => onFlipCard(index));

    const front = document.createElement("span");
    front.className = "card-face card-front";

    const frontImage = document.createElement("img");
    frontImage.className = "card-front-image";
    frontImage.src = card.fruit.image;
    frontImage.alt = card.fruit.name;
    front.appendChild(frontImage);

    const back = document.createElement("span");
    back.className = "card-face card-back";
    back.textContent = "뒤집기";

    button.append(front, back);
    boardElement.appendChild(button);
  });

  attemptCountElement.textContent = String(state.attemptCount);
  matchCountElement.textContent = `${state.matchedPairs} / ${totalPairs}`;
  gameStatusElement.textContent = state.matchedPairs === totalPairs ? "클리어" : "진행 중";
}

export function updateGuide(goalText, progressText, tipText) {
  currentGoalElement.textContent = goalText;
  progressSummaryElement.textContent = progressText;
  playTipElement.textContent = tipText;
}
