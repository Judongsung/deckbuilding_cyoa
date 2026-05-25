# ⚔️ 덱빌딩 자동전투 RPG

> **포트폴리오 프로젝트** — Svelte + TypeScript로 구현한 로그라이크 덱빌딩 게임

카드를 수집해 덱을 구성하고, 시너지와 스탯 총합으로 자동 전투를 이겨내는 RPG입니다.  
게임 구현보다 **확장 가능한 아키텍처 설계**와 **기술적 의사결정 과정**에 집중한 프로젝트입니다.

🔗 **[플레이하기](#https://ikkuffu.neocities.org/deckbuilding/)** (배포 링크)

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | Svelte 5 + Vite |
| 언어 | TypeScript |
| 상태 관리 | Svelte Writable Store |
| 스타일 | Vanilla CSS |
| 저장 | localStorage 자동 저장 |

---

## 🔧 유지보수성 & 확장성

이 프로젝트의 설계 목표는 **"새 기능을 추가할 때 기존 코드를 최대한 건드리지 않는다"** 입니다.

### 변경 영향 범위 (Blast Radius)

| 하고 싶은 것 | 건드려야 할 파일 |
|---|---|
| 새 카드 추가 | `data/cards.json` 만 |
| 새 카드 효과 타입 추가 | `systems/effectHandlers.ts` 에 핸들러 1개 추가 |
| 새 이벤트 추가 | `data/events.json` 만 |
| 새 유물 추가 | `data/relics.json` 만 |
| 새 적 추가 | `data/enemies.json` 만 |
| 새 캐릭터 추가 | `data/characters.json` 만 |
| UI 텍스트 수정 | `constants/translations_kr.ts` 만 |
| 밸런스 수치 수정 | `constants/gameConfig.ts` 만 |
| 새 노드 타입 추가 | `gameConfig.ts` + `mapSystem.ts` 라우팅 1곳 |

이 구조가 가능한 이유는 **로직, 데이터, 설정, 텍스트**가 각자의 위치에 완전히 분리되어 있기 때문입니다.
각 시스템은 단일 책임을 가지며, 다른 시스템의 내부 구현을 알지 못해도 독립적으로 수정할 수 있습니다.

---

## 🏗️ 아키텍처

### Pure Delegation 패턴

`gameStore`는 상태를 직접 변경하지 않습니다. 모든 비즈니스 로직은 독립 시스템 모듈에 **100% 위임**합니다.  
전투 로직을 수정하더라도 `battleSystem.ts` 만 열면 됩니다. 상점 버그를 고칠 때 전투 코드를 볼 필요가 없습니다.

```typescript
// gameStore.ts — 인터페이스만 담당
const gameStore = {
    startBattle: () => update(state => executeBattle(state)),
    buyCardFromShop: (i) => update(state => buyCardFromShop(state, i)),
    selectNode: (node) => update(state => selectNode(state, node)),
    // ...
};
```

```
gameStore (인터페이스)
├── battleSystem    — 전투 시뮬레이션
├── mapSystem       — 맵 생성 및 노드 라우팅
├── statSystem      — 플레이어 스탯 계산
├── effectHandlers  — 카드 효과 실행
├── rewardSystem    — 보상 생성 및 처리
├── shopSystem      — 상점 거래
├── actionSystem    — 휴식처 / 이벤트 처리
├── potionSystem    — 포션 사용
├── relicSystem     — 유물 효과 발동
├── treasureSystem  — 보물 처리
├── deckSystem      — 덱 조작
└── gameSystem      — 게임 생명주기 (시작/초기화)
```

각 시스템은 `(state: GameState, ...args) => GameState` 형태의 순수 함수로 구성되어 있어 **독립적으로 테스트하고 교체**할 수 있습니다.

---

### 데이터 주도 설계 (Data-Driven Design)

카드 효과는 코드가 아닌 JSON 데이터로 정의됩니다.  
**새 카드를 추가할 때 코드를 전혀 수정하지 않아도 됩니다.** 기획 변경이 코드 변경으로 이어지는 연결을 끊은 것이 핵심입니다.

```jsonc
// src/data/cards.json
{
    "id": "card_shield_bash",
    "name": "방패 밀치기",
    "effects": [{
        "trigger": "PRE_BATTLE",
        "action": "ADD_STAT_BASED_ON_OTHER_STAT",
        "statType": "ATTACK",
        "sourceStat": "DEFENSE",
        "multiplier": 0.5
    }]
}
```

`effectHandlers.ts`에 등록된 핸들러가 `action` 문자열을 보고 해당 로직을 실행합니다. 새 효과 타입이 필요하면 **핸들러 하나만 추가**하면 됩니다.

---

### Effect Handler Phase 시스템

카드 효과 간 **계산 순서 의존성** 문제를 해결하기 위해 phase 기반 실행 순서를 도입했습니다.  
새 효과 타입을 추가할 때 기존 핸들러를 수정하지 않고 **새 항목을 추가하기만** 하면 됩니다. (OCP, Open/Closed Principle)

```typescript
// effectHandlers.ts
const CardEffectHandlers = {
    ADD_KEYWORD:              { phase: 1, execute: ... }, // 키워드 전파 (먼저)
    INCREASE_STAT:            { phase: 2, execute: ... }, // 스탯 증감
    MULTIPLY_STAT:            { phase: 3, execute: ... }, // 배율 적용 (나중에)
    ADD_STAT_BASED_ON_OTHER:  { phase: 3, execute: ... }, // 타 스탯 참조 (나중에)
};

// 정렬 후 순서대로 실행 → 키워드가 전파된 뒤 그 키워드를 조건으로 쓰는 효과가 발동됨
allEffects.sort((a, b) => a.phase - b.phase);
```

예시: `"피의 전염병"` 카드가 모든 `[ATTACK]` 카드에 `[POISON]` 키워드를 부여한 뒤, `"독의 시너지"` 카드가 `[POISON]` 카드 수를 세어 스탯을 올리는 조합이 정확히 동작합니다.

---

### 스탯 키 일관성

카드 JSON의 `statType`과 player 객체 키를 **동일한 네이밍 규칙(camelCase)** 으로 통일해, 별도 매핑 테이블 없이 단순 문자열 변환만으로 player 속성에 접근합니다.

```typescript
// 매핑 테이블 없이 한 줄로 해결
function statTypeToKey(type: string): string {
    return type.toLowerCase().replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    // "ATTACK_GROWTH" → "attackGrowth"
}
```

---

### Allow-list 자동 저장

localStorage에 저장할 필드를 명시적으로 허용 목록으로 관리합니다. 라이브러리 데이터(카드 목록 등 수십KB)가 실수로 저장되는 것을 방지합니다.

```typescript
// gameStore.ts — 저장할 필드만 명시
const saveData = {
    player: state.player,
    deck: state.deck,
    map: state.map,
    runStatus: state.runStatus,
    // cardLibrary, relicLibrary 등은 제외
};
localStorage.setItem('deck_rpg_save', JSON.stringify(saveData));
```

---

### 로컬라이징 (i18n)

게임 내 모든 텍스트는 로직과 완전히 분리되어 있습니다.  
언어를 추가하려면 `translations_en.ts` 같은 파일 하나만 추가하면 됩니다.

**설계 구조**

```
constants/
├── translation_keys.ts     ← 타입 안전 키 상수 (I18N_KEY)
├── translations_kr.ts      ← 한국어 번역 텍스트
└── translations_en.ts      ← (추가 예시) 영어 번역 텍스트

utils/
└── i18n.ts                 ← 로드 / 조회 / 데이터 합성 로직
```

**주요 설계 포인트**

**① 동적 import + 자동 폴백**  
언어 파일을 런타임에 동적으로 로드합니다. 해당 언어 파일이 없으면 기본 언어로 자동 폴백해 앱이 터지지 않습니다.

```typescript
// i18n.ts
const module = await import(`../constants/translations_${lang}.ts`);
// 실패 시 → DEFAULT_LANGUAGE로 재시도
```

**② Proxy로 비동기를 동기처럼**  
`initLanguage()`는 비동기지만, 컴포넌트에서는 `TRANSLATIONS.UI.TITLE`처럼 일반 객체로 사용합니다.  
내부적으로 Proxy가 캐시된 번역 객체를 대리 조회합니다.

```typescript
export const TRANSLATIONS = new Proxy({}, {
    get(target, prop) {
        return translationsCache?.[prop]; // 로드 전이면 안전하게 빈 객체 반환
    }
});
```

**③ 데이터와 텍스트 분리 — `hydrateLibraries`**  
카드·유물·이벤트 JSON에는 게임 로직 데이터만 담고, 이름·설명 같은 표시 텍스트는 번역 파일에 보관합니다.  
로드 시점에 `hydrateLibraries()`가 두 데이터를 합성해 하나의 객체로 만듭니다.

```typescript
// 게임 데이터 (cards.json) — 로직만
{ "id": "card_strike_01", "baseStats": { "attack": 5, ... } }

// 번역 파일 (translations_kr.ts) — 텍스트만
DATA: { CARDS: { card_strike_01: { name: "기본 공격", flavor: "..." } } }

// 합성 결과
{ "id": "card_strike_01", "name": "기본 공격", "baseStats": { "attack": 5, ... } }
```

덕분에 동일한 게임 로직으로 텍스트만 교체해 다국어를 지원할 수 있습니다.

**④ 타입 안전 키 상수**  
컴포넌트에서 번역 키를 문자열로 직접 쓰지 않고 `I18N_KEY` 상수를 통해 접근합니다.  
오타가 런타임 오류가 아닌 **컴파일 타임 오류**로 잡힙니다.

```typescript
// ❌ 오타가 나도 에러가 런타임에만 드러남
t("STATS_ATTAKC", { base: 10 })

// ✅ 오타 시 TypeScript가 즉시 감지
t(I18N_KEY.UI.STATS_ATTACK, { base: 10 })
```

---

## 🎮 게임 구조

```
메인 메뉴 → 캐릭터 선택 → 맵 탐색 (16층)
                              ├── ⚔️ 일반 전투  → 카드/골드 보상
                              ├── 💀 엘리트     → 카드/골드/유물 보상
                              ├── 🛒 상점        → 카드·유물·포션 구매, 카드 제거
                              ├── ⛺ 휴식처     → 체력 회복 or 카드 강화
                              ├── 💎 보물        → 무료 보상
                              └── ❓ 미지의 장소 → 랜덤 이벤트
                                    ↓
                               👑 보스 전투 → 클리어
```

### 핵심 메카닉: 전개력(Deployment)

단순히 강한 카드를 많이 쌓는 것이 항상 유리하지 않습니다.

```
전투 배율 = deployment / deckSize
```

카드를 추가하면 스탯은 올라가지만 `deckSize`도 커져 배율이 낮아집니다.  
**덱 압축**(상점에서 카드 제거)과 **전개력 카드**를 전략적으로 활용해야 합니다.

---

## 📁 프로젝트 구조

```
src/
├── components/       # Svelte UI 컴포넌트
├── constants/        # GAME_CONFIG (매직 넘버 제거), 번역 키
├── data/             # cards / relics / enemies / events / potions / characters (JSON)
├── stores/           # gameStore — 단일 진입점
├── systems/          # 게임 로직 (12개 시스템 모듈)
├── types/            # GameState, Player, Card 등 TypeScript 타입
└── utils/            # i18n, 카드 텍스트 생성
```

---

## 🚀 로컬 실행

```bash
npm install
npm run dev
```

---

## 📌 회고 및 개선 포인트

직접 개발하며 인식한 한계점과 개선 방향입니다.

- **State 불변성**: 시스템 함수들이 state를 직접 변이합니다. Svelte `update()` 내에서만 호출되므로 동작은 정상이지만, `structuredClone` 또는 Immer를 도입해 경계를 명확히 하는 것이 더 안전합니다.
- **전투 연출 부재**: 현재 전투는 버튼 클릭 한 번에 결과가 나옵니다. 로그를 순차적으로 표시하는 연출을 추가하면 게임 몰입감이 높아질 것입니다.
- **단일 캐릭터**: 캐릭터 선택 화면과 데이터 구조는 갖춰져 있으나 현재 전사 한 종류만 구현되어 있습니다.
