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
  return matchedPairs === totalPairs ? "모든 짝 맞추기 완료" : "같은 과일 카드 두 장 찾기";
}

export function getProgressText(state, totalPairs) {
  if (state.matchedPairs === totalPairs) {
    return `${state.attemptCount}번 만에 클리어했습니다.`;
  }

  if (state.flippedIndexes.length === 0 && state.attemptCount === 0) {
    return "첫 카드를 골라 시작하세요.";
  }

  if (state.flippedIndexes.length === 1) {
    return "한 장을 확인했습니다.";
  }

  if (state.isBoardLocked) {
    return "카드를 확인 중입니다.";
  }

  return `${state.matchedPairs}쌍 성공, ${state.attemptCount}번 시도`;
}

export function getTipText(matchedPairs) {
  if (matchedPairs >= 6) {
    return "이제 거의 다 왔어요.";
  }

  if (matchedPairs >= 3) {
    return "위치를 묶어서 기억해 보세요.";
  }

  return "본 카드 위치를 기억해 보세요.";
}
