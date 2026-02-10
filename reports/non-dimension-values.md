# Non-Dimension Values 리포트

**작성일**: 2026-02-09
**대상**: SegmentedControl, BottomActionBar 컴포넌트

---

## 1. 요약

이번 컴포넌트 구현에서 **dimension 토큰으로 매핑되지 않은 값**을 기록합니다.

---

## 2. Dimension 토큰으로 매핑된 값 (정상)

스펙의 모든 치수가 dimension 토큰으로 참조되었습니다.

### SegmentedControl

| 값 | 토큰 참조 | 용도 |
|---:|----------|------|
| 56px | `dimension.x14` | Track Height (lg) |
| 48px | `dimension.x12` | Indicator Height (lg) |
| 40px | `dimension.x10` | Track Height (md) |
| 32px | `dimension.x8` | Indicator Height (md) |
| 12px | `dimension.x3` | Hug Content PaddingX |
| 4px | `dimension.x1` | Track Padding (all sides) |

### BottomActionBar

| 값 | 토큰 참조 | 용도 |
|---:|----------|------|
| 20px | `dimension.x5` | 좌/우 screen inset |
| 20px | `dimension.x5` | 하단 paddingY |
| 10px | `dimension.x2_5` | 버튼 간 gap |
| 8px | `dimension.x2` | 상단 내부 여백 (top) |

---

## 3. Dimension 토큰에 없는 값

### 3-1. Border Width: 1px

| 컴포넌트 | 속성 | 값 | 상태 |
|----------|------|----|------|
| BottomActionBar | `border-top` | 1px | 숫자 유지 |

**이유**: 1px은 border width로, spacing/sizing dimension 스케일(2px 단위)과 성격이 다릅니다.
dimension 스케일의 최소값은 2px(`x0_5`)이므로 1px은 토큰으로 표현할 수 없습니다.

**권장**: border-width 전용 토큰 스케일 도입 시 매핑 가능 (예: `border.thin = 1px`).
현재는 숫자 그대로 유지합니다.

### 3-2. Animation Duration: 150ms

| 컴포넌트 | 속성 | 값 | 상태 |
|----------|------|----|------|
| SegmentedControl | `transition` | 150ms ease-out | 숫자 유지 |

**이유**: duration은 시간 값으로, dimension(길이) 토큰과 무관합니다.
별도의 motion/duration 토큰 스케일이 필요합니다.

### 3-3. Box Shadow 값

| 컴포넌트 | 속성 | 값 | 상태 |
|----------|------|----|------|
| SegmentedControl Indicator | `box-shadow` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | 숫자 유지 |

**이유**: elevation/shadow는 별도의 토큰 스케일이 필요합니다.
현재 시스템에 shadow 토큰이 없으므로 숫자 그대로 유지합니다.

---

## 4. 누락 Semantic 토큰 매핑

스펙에서 언급했지만 시스템에 존재하지 않는 semantic 토큰입니다.
기존 토큰으로 대체하여 구현했습니다.

| 스펙 명칭 | 존재 여부 | 대체 토큰 | 해석값 |
|----------|----------|----------|--------|
| `color.bg.surface` | 없음 | `color.common.white` | #ffffff |
| `color.fg.primary` | 없음 | `color.fg.brand-solid` | blue.600 #0a93ff |
| `color.fg.disabled` | 없음 | `color.fg.neutral-muted` | gray.600 #5e686e |
| `color.stroke.divider` | 없음 | `color.stroke.neutral-weak` | gray.200 #e7edf0 |

**권장**: 위 4개 토큰은 범용적으로 자주 쓰이므로, semantic 레이어에 추가하는 것을 고려하세요.

---

## 5. Chatbot Quote Demo 비디멘션 값 (2026-02-09)

### 5-1. Phone Frame 시뮬레이션 고정값

| 값 | 용도 | 상태 |
|---:|------|------|
| 375px | Phone Frame width | 디바이스 시뮬레이션 목적 |
| 700px | Phone Frame height | 디바이스 시뮬레이션 목적 |
| 75% | UserBubble maxWidth | 비율 기반 레이아웃 |

**이유**: 디바이스 화면 시뮬레이션을 위한 고정 치수로, 디자인 토큰과 무관합니다.

### 5-2. Skeleton Height Presets

| 값 | 용도 | 상태 |
|---:|------|------|
| 14px | 텍스트 줄 Skeleton | 콘텐츠별 임의값 |
| 40px | 아바타 Skeleton | Avatar(m) = dimension.x10 매칭 |
| 48px | 버튼 Skeleton | Button(L) height 매칭 |
| 120px | 카드 Skeleton | 콘텐츠별 임의값 |

**이유**: Skeleton 높이는 대체할 콘텐츠의 크기에 맞추는 임의값입니다.
40px, 48px은 기존 dimension 토큰(x10, x12)에 대응하지만, Skeleton props는 px 숫자로 전달합니다.
14px, 120px은 dimension 스케일에 정확히 매핑되지 않는 콘텐츠 고유 크기입니다.

### 5-3. 기타 고정값

| 값 | 용도 | 상태 |
|---:|------|------|
| 12px | Controls 영역 label fontSize | 보조 UI 텍스트 |
| 600 | SummaryCard 값 fontWeight | SemiBold 고정 |
| 8px | SkeletonMessage 내부 gap | dimension.x2 상당 |
| 12px | Avatar/Label showcase gap | dimension.x3 상당 |

**이유**: 데모 페이지 레이아웃 보조 요소로, 토큰 참조 대신 직접값을 사용했습니다.
프로덕션 전환 시 해당 dimension 토큰 참조로 교체하는 것을 권장합니다.
