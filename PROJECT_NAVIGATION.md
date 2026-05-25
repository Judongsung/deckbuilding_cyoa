# DeckBuilding CYOA Project Navigation

이 문서는 AI 에이전트 및 개발자가 프로젝트 구조를 쉽게 파악하고 네비게이팅할 수 있도록 작성된 가이드입니다. 

이 프로젝트는 **Svelte**와 **Vite**, **TypeScript**를 기반으로 작성된 덱빌딩 게임 웹 어플리케이션입니다.

## 📂 최상위 디렉토리 (Root Directory)

- `src/` : 게임의 핵심 소스 코드가 포함된 폴더입니다.
- `public/` : 빌드 시 그대로 복사되어 제공되는 정적 에셋(이미지, 아이콘 등)이 있는 폴더입니다.
- `package.json`, `package-lock.json` : 프로젝트의 의존성(npm 패키지) 및 스크립트를 관리합니다.
- `svelte.config.js`, `vite.config.js` : Svelte와 Vite의 빌드 및 개발 환경 설정 파일입니다.
- `tsconfig.json` : TypeScript 컴파일러 설정 파일입니다.
- `README.md` : 프로젝트에 대한 기본 설명서입니다.
- `card_ideas_memo.md` : 카드 기획 및 아이디어가 정리된 메모 파일입니다.

---

## 📁 `src/` (Source Directory)

소스 코드는 크게 UI(Component), 상태(Store), 로직(System), 데이터(Data), 타입(Type)으로 분리되어 있습니다.

### 파일
- `App.svelte` : 어플리케이션의 최상위 루트 컴포넌트입니다. 전체적인 레이아웃 및 뷰 라우팅을 담당합니다.
- `app.css` : 전역으로 적용되는 CSS 스타일 파일입니다.
- `main.ts` : Svelte 앱을 DOM에 마운트하는 진입점(Entry point) 파일입니다.

### 하위 폴더별 역할

#### 1. `components/` (UI 컴포넌트)
게임의 화면과 UI 요소들을 렌더링하는 Svelte 컴포넌트들이 모여있습니다.
- **화면 및 패널**
  - `LeftPanel.svelte`, `CenterPanel.svelte`, `RightPanel.svelte` : 메인 화면을 구성하는 3단 레이아웃 패널입니다.
  - `MainMenu.svelte` : 게임 시작 시 보이는 메인 메뉴 화면입니다.
  - `GameEndOverlay.svelte` : 게임 오버 또는 클리어 시 나타나는 결과 화면입니다.
- **게임 보드 (상태별 화면)**
  - `BattleBoard.svelte` : 전투 진행 화면입니다.
  - `MapBoard.svelte` : 맵(노드) 선택 화면입니다.
  - `DeckBoard.svelte` : 플레이어가 보유한 덱(카드 목록)을 확인하는 화면입니다.
  - `EventBoard.svelte` : 랜덤 이벤트 발생 시 나타나는 화면입니다.
  - `RestBoard.svelte` : 휴식처(캠프파이어 등) 화면입니다.
  - `CardShop.svelte` : 상점에서 카드나 유물을 구매하는 화면입니다.
  - `TreasureBoard.svelte` : 보물상자 발견 시 나타나는 화면입니다.
- **UI 요소**
  - `CardItem.svelte` : 개별 카드의 UI를 렌더링합니다.
  - `BattleReward.svelte` : 전투 승리 후 보상 선택 UI입니다.
  - `StatsBoard.svelte` : 플레이어의 현재 스탯(체력, 골드 등)을 보여주는 UI입니다.

#### 2. `systems/` (핵심 게임 로직)
UI와 상태(Store) 사이에서 실제 게임의 규칙과 로직을 처리하는 함수들의 모음입니다.
- `gameSystem.ts` : 게임의 전반적인 흐름(시작, 종료, 턴 관리 등)을 제어합니다.
- `battleSystem.ts` : 전투(공격, 방어, 적 AI 등)와 관련된 로직을 처리합니다.
- `actionSystem.ts` : 플레이어가 취하는 행동(카드 사용 등)을 처리합니다.
- `effectHandlers.ts` : 카드나 유물의 다양한 효과(버프, 디버프 등)를 실제로 적용하는 핸들러입니다.
- `deckSystem.ts` : 덱 관리(셔플, 드로우, 덱에 카드 추가/제거) 로직입니다.
- `mapSystem.ts` : 맵 노드 생성 및 이동 로직을 담당합니다.
- `shopSystem.ts` : 상점의 상품 생성 및 구매 로직을 처리합니다.
- `rewardSystem.ts` : 전투 승리 후 주어지는 보상을 생성합니다.
- `relicSystem.ts`, `potionSystem.ts`, `treasureSystem.ts`, `statSystem.ts` : 각각 유물, 포션, 보물, 스탯 계산과 관련된 전용 로직을 담당합니다.

#### 3. `stores/` (상태 관리)
전역 게임 상태를 관리하는 Svelte Store 파일들이 위치합니다.
- `gameStore.ts` : 플레이어 상태, 현재 진행 중인 화면 상태, 인벤토리 등 게임의 전반적인 데이터를 담고 있으며 컴포넌트와 시스템 간의 상태 공유를 돕습니다.

#### 4. `data/` (정적 데이터)
게임 내 등장하는 엔티티들의 기본 데이터가 JSON 형태로 저장되어 있습니다.
- `cards.json`, `card_ideas.json` : 게임에서 사용되는 카드들의 정보와 기획 데이터입니다.
- `characters.json` : 플레이어블 캐릭터의 기본 스탯 및 초기 설정 데이터입니다.
- `enemies.json` : 몬스터/적의 패턴 및 스탯 데이터입니다.
- `events.json` : 랜덤 이벤트의 선택지와 결과 데이터입니다.
- `relics.json`, `potions.json` : 유물 및 포션 데이터입니다.

#### 5. `constants/` (상수 및 다국어)
코드 내에서 하드코딩을 피하기 위한 설정값 및 다국어 지원 파일입니다.
- `gameConfig.ts` : 게임의 밸런스, 초기값, 기본 설정 상수들이 정의되어 있습니다.
- `translation_keys.ts`, `translations_kr.ts` : 다국어 지원을 위한 텍스트 키 및 한국어 번역 맵 파일입니다.

#### 6. `types/` (타입스크립트 타입 정의)
프로젝트 전반에서 사용되는 데이터 구조와 타입 인터페이스를 정의합니다.
- `models.ts` : 카드, 몬스터, 유물 등 엔티티의 데이터 모델(Interface)을 정의합니다.
- `state.ts` : 게임의 상태(상점 상태, 전투 상태 등)와 관련된 타입을 정의합니다.

#### 7. `utils/` (유틸리티 함수)
특정 로직에 종속되지 않고 범용적으로 쓰이는 헬퍼 함수들입니다.
- `cardTextGenerator.ts` : 카드 효과 데이터를 바탕으로 UI에 표시될 텍스트를 동적으로 생성합니다.
- `i18n.ts` : 다국어 번역을 적용하고 반환하는 유틸리티 함수입니다.

---

## 📁 `public/` (Public Directory)

웹 서버 루트 경로에 직접 호스팅되는 정적 파일들입니다.
- `favicon.svg`, `icons.svg` : 웹사이트 아이콘과 SVG 아이콘 에셋입니다.
- `map_bg.png` : 맵 보드 등에 쓰이는 배경 이미지입니다.
- `images/` : 기타 필요한 이미지 에셋들이 저장됩니다.
