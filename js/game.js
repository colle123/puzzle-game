const messageElement = document.getElementById("message");

export function createDeck(fruits, shuffle) {
  return shuffle(
    fruits.flatMap((fruit, pairId) => [
      { id: `${pairId}-a`, fruit, pairId, matched: false },
      { id: `${pairId}-b`, fruit, pairId, matched: false }
    ])
  );
}

export function updateMessage(text) {
  messageElement.textContent = text;
}

export function getGoalText(matchedPairs, totalPairs) {
  return matchedPairs === totalPairs ? "모든 과일 짝 맞추기 완료" : "같은 과일 카드 짝 찾기";
}

export function getProgressText(state, totalPairs) {
  if (state.matchedPairs === totalPairs) {
    return `${state.attemptCount}번 만에 모든 짝을 맞췄어요.`;
  }

  if (state.timeRemaining <= 0) {
    return "시간이 모두 지나서 게임이 끝났어요.";
  }

  if (state.flippedIndexes.length === 0 && state.attemptCount === 0) {
    return "첫 카드를 골라 게임을 시작해 보세요.";
  }

  if (state.flippedIndexes.length === 1) {
    return "한 장을 열었어요. 같은 과일을 찾아보세요.";
  }

  if (state.isBoardLocked) {
    return "두 카드를 비교하는 중이에요.";
  }

  return `${state.matchedPairs}쌍 성공, ${state.attemptCount}번 시도`;
}

export function getTipText(matchedPairs, totalPairs, timeRemaining) {
  const halfPairs = Math.floor(totalPairs / 2);

  if (timeRemaining <= 15) {
    return "시간이 얼마 남지 않았어요. 기억나는 짝부터 빠르게 찾아보세요.";
  }

  if (matchedPairs >= totalPairs - 3) {
    return "이제 거의 다 왔어요. 남은 카드 자리를 잘 기억해 보세요.";
  }

  if (matchedPairs >= halfPairs) {
    return "절반을 넘겼어요. 방금 본 카드 위치를 함께 기억해 보세요.";
  }

  return "뒤집은 카드의 위치와 과일 이름을 함께 기억하면 쉬워져요.";
}

export function getTimerText(timeInSeconds) {
  const safeTime = Math.max(0, timeInSeconds);
  const minutes = Math.floor(safeTime / 60);
  const seconds = safeTime % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
