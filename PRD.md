# 프로젝트 : 간단한 퍼즐 게임

## 목표
- 브라우저에서 실행되는 퍼즐 게임

## 기능
- 퍼즐 보드 표시
- 클릭 이벤트 처리
- 클리어 조건 판단
- 4x4 보드에서 같은 과일 카드 2장의 짝을 맞추는 게임

## 기술
- 순수 HTML, CSS, JavaScript
- HTML, CSS, JavaScript를 역할별로 분리해서 관리

## 대상
- 초보자도 이해할 수 있는 구조

## 폴더 구조
```text
puzzle-game/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  ├─ app.js      -- 기존 script.js에서 앱 시작점 관련 소스만 위치 
│  ├─ board.js    -- 퍼즐보드 그리기 영역 
│  ├─ game.js     -- 클릭이벤트, 정답확인, 클리어조건 
│  └─ utils.js    -- 랜덤섞기, 공통함수
├─ assets/
│  └─ images/
└─ PRD.md
```