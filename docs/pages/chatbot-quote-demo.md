# Chatbot Quote Demo 화면 구조

**작성일**: 2026-02-09
**파일**: `src/pages/ChatbotQuoteDemo.tsx`

---

## 1. 화면 개요

견적 요청 챗봇의 전체 대화 흐름을 시뮬레이션하는 데모 페이지입니다.
Foundation(Elevation, Spacing, Skeleton) + Component(Avatar, Label, SegmentedControl, BottomActionBar, Button) 전체를 통합 검증합니다.

---

## 2. 레이아웃 구조

```
┌─ Controls ──────────────────────────┐
│  Bottom Bar: [2 Buttons | 1 Button] │  ← SegmentedControl (hug/md)
└─────────────────────────────────────┘

┌─ Phone Frame (375×700) ────────────┐
│  ┌─ Header ─────────────────────┐  │
│  │  "견적 챗봇"  [진행중] Label  │  │
│  │  [채팅 | 견적 내역] Segment   │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─ Message Area (scroll) ──────┐  │
│  │  👤 AssistantBubble + Options │  │
│  │             UserBubble ────→  │  │
│  │  👤 AssistantBubble + Options │  │
│  │             UserBubble ────→  │  │
│  │  👤 SummaryCard (shadow.s1)   │  │
│  │  👤 SkeletonMessage           │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌─ BottomActionBar ────────────┐  │
│  │  [취소]  [다음 단계]          │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

┌─ Component Showcase ────────────────┐
│  Avatar Samples (s, m, fallback)    │
│  Label Samples (5 roles × 2 styles) │
│  Skeleton Samples (text, card, etc) │
└─────────────────────────────────────┘
```

---

## 3. 메시지 타입 정의

| role | 설명 | 렌더링 |
|------|------|--------|
| `assistant` | 챗봇 응답 | Avatar(m) + 말풍선 + 옵션 버튼(brand-outline/s) |
| `user` | 사용자 입력 | 우측 정렬 파란 말풍선 |
| `card` | 견적 요약 카드 | Avatar(m) + shadow.s1 카드 + Label |
| `skeleton` | 로딩 중 | 원형 Skeleton(40×40) + 텍스트 Skeleton(14px) |

---

## 4. 사용된 토큰 매핑

### 4-1. Foundation 토큰

| 토큰 | 사용처 | 값 |
|------|--------|----|
| `shadow.s1` | SummaryCard, 견적 내역 카드 | 0px 1px 4px rgba(0,0,0,0.08) |
| `shadow.s2` | Phone Frame 외곽 | 0px 2px 10px rgba(0,0,0,0.10) |
| `color.bg.layer-basement` | Phone Frame 배경 | gray.50 |
| `color.bg.layer-default` | Header, SummaryCard 배경 | white |
| `spacing.default` | 말풍선 padding, 메시지 간 gap | 16px |
| `spacing.gutterX` | Message Area 좌우 padding | 16px |
| `skeleton.bg` | Skeleton 배경 | gray.100 |
| `skeleton.shimmer` | Skeleton 반짝임 | gray.200 |
| `skeleton.radius` | Skeleton 모서리 | r2 (8px) |

### 4-2. Color 토큰

| 토큰 | 사용처 |
|------|--------|
| `color.bg.neutral-solid` | AssistantBubble 배경 |
| `color.fg.neutral` | 본문 텍스트 |
| `color.bg.brand-solid` | UserBubble 배경 |
| `color.fg.brand-contrast` | UserBubble 텍스트 (흰색) |
| `color.fg.neutral-muted` | SummaryCard 라벨 텍스트 |
| `color.stroke.neutral-weak` | Header 하단선, 카드 구분선 |
| `color.stroke.neutral-muted` | SummaryCard 항목 구분선 |

### 4-3. Typography 토큰

| 토큰 | 사용처 |
|------|--------|
| `typography.header.h6.bold` | "견적 챗봇" 타이틀 |
| `typography.header.h9.bold` | SummaryCard 타이틀 |
| `typography.body.b6` | 말풍선 본문 |
| `typography.body.b8` | SummaryCard 항목 텍스트 |

### 4-4. Radius 토큰

| 토큰 | 사용처 |
|------|--------|
| `radius.r3` | 말풍선, SummaryCard, 견적 카드 |
| `radius.r4` | Phone Frame 외곽 |

### 4-5. Dimension 토큰

| 토큰 | 사용처 |
|------|--------|
| `dimension.x2` | 말풍선-아바타 gap, 옵션 버튼 gap, SummaryCard 하단 margin |
| `dimension.x3` | Header 내부 gap |
| `dimension.x1_5` | SummaryCard 항목 padding Y |

---

## 5. 인터랙션

| 요소 | 동작 |
|------|------|
| Header SegmentedControl | "채팅" ↔ "견적 내역" 탭 전환 |
| Controls SegmentedControl | BottomActionBar 1/2 버튼 모드 전환 |
| BottomActionBar 버튼 | 시각 확인용 (클릭 동작 없음) |
| 옵션 버튼 (brand-outline) | 시각 확인용 (클릭 동작 없음) |

---

## 6. "견적 내역" 탭 구성

| 요소 | 설명 |
|------|------|
| 견적 카드 | layer-default 배경 + shadow.s1 + 내부 Label 3개 |
| Skeleton 카드 | height=120px, 추가 견적 로딩 시뮬레이션 |

---

## 7. Phone Frame 아래 컴포넌트 쇼케이스

### Avatar Samples
- `size="s"` + `name="김"` → 32px 원형, "김" 이니셜
- `size="m"` + `name="이"` → 40px 원형, "이" 이니셜
- `size="m"` + name 없음 → 40px 원형, "?" 표시
- `size="s"` + `name="Park"` → 32px 원형, "P" 이니셜

### Label Samples
- 5 roles × 2 styles (solid/weak) = 10개 조합 (md)
- brand sm vs md 크기 비교

### Skeleton Samples
- 텍스트 줄 (100%, 60%)
- 프로필 레이아웃 (원형 40×40 + 텍스트 2줄)
- 버튼 높이 (48px)
- 카드 높이 (120px)

---

## 8. 비디멘션(Non-Dimension) 값

아래 값들은 토큰이 아닌 고정값으로, `reports/non-dimension-values.md`에 기록되어 있습니다.

| 값 | 용도 | 사유 |
|----|------|------|
| 375px | Phone Frame width | 디바이스 시뮬레이션 고정값 |
| 700px | Phone Frame height | 디바이스 시뮬레이션 고정값 |
| 75% | UserBubble maxWidth | 비율 기반 레이아웃 |
| 14px | Skeleton 텍스트 줄 height | 콘텐츠별 임의값 |
| 40px | Skeleton 아바타 size | Avatar(m) 크기 매칭 |
| 48px | Skeleton 버튼 height | Button(L) 높이 매칭 |
| 120px | Skeleton 카드 height | 콘텐츠별 임의값 |
| 12px | Controls label fontSize | 보조 UI 고정값 |
| 1px | border-width (Header, Card) | 최소 구분선 |
| 600 | fontWeight (SummaryCard 값) | SemiBold 고정 |
