# 신규 생성 컴포넌트 토큰 리포트

**작성일**: 2026-02-08
**대상**: Button Component Tokenization (3차)

---

## 1. 요약

이번 작업에서 기존에 없던 새로운 토큰들이 생성되었습니다.
기존 Primitive/Semantic 레이어에 존재하지 않아 **새로 정의한 토큰**을 아래에 정리합니다.

| 카테고리 | 신규 토큰 수 |
|---------|------------|
| Radius Primitive Scale | **9개** |
| Size 토큰 (button.size.*) | **35개** |
| Disabled State 컬러 | **21개** |
| Loading State (spinner 포함) | **28개** |
| **합계** | **93개** |

---

## 2. 신규 Primitive 토큰: Radius Scale

`tokens/primitives.json`에 추가된 SEED Radius Scale입니다.
기존에는 radius 관련 primitive가 없었습니다.

| 토큰 경로 | 값 | 타입 | 생성 근거 |
|----------|-----|------|----------|
| `radius.r0` | 0px | dimension | SEED 표준 스케일 |
| `radius.r1` | 4px | dimension | SEED 표준 스케일 |
| `radius.r1_5` | 6px | dimension | SEED 표준 스케일 |
| `radius.r2` | 8px | dimension | SEED 표준 — Button XS 사용 |
| `radius.r2_5` | 10px | dimension | SEED 표준 — Button S 사용 |
| `radius.r3` | 12px | dimension | SEED 표준 — Button M, L 사용 |
| `radius.r3_5` | 14px | dimension | SEED 표준 — Button XL 사용 |
| `radius.r4` | 16px | dimension | SEED 표준 스케일 |
| `radius.full` | 9999px | dimension | 완전 원형 (Pill 형태) |

---

## 3. 신규 Component 토큰: Button Size

`tokens/components/button.component.json`에 생성된 사이즈 토큰입니다.
총 5개 사이즈 × 7개 속성 = 35개.

| 토큰 경로 | 용도 | XS | S | M | L | XL |
|----------|------|-----|---|---|---|-----|
| `button.size.{size}.height` | 버튼 높이 | 28px | 32px | 40px | 48px | 56px |
| `button.size.{size}.paddingX` | 좌우 패딩 | 10px | 12px | 16px | 20px | 24px |
| `button.size.{size}.paddingY` | 상하 패딩 | 4px | 6px | 10px | 12px | 14px |
| `button.size.{size}.radius` | 모서리 라운딩 | r2 | r2_5 | r3 | r3 | r3_5 |
| `button.size.{size}.iconSize` | 아이콘 크기 | 14px | 16px | 18px | 20px | 22px |
| `button.size.{size}.iconGap` | 아이콘-텍스트 간격 | 4px | 4px | 6px | 6px | 8px |
| `button.size.{size}.typography` | 타이포그래피 참조 | b5 | b4 | b3 | b2 | b1 |

---

## 4. 신규 Component 토큰: Disabled State 컬러

기존 Semantic 레이어에는 disabled 상태 전용 컬러가 없었습니다.
버튼 컴포넌트 레벨에서 각 변형의 연한 팔레트 shade를 직접 참조하여 정의했습니다.

### 설계 원칙
- **Solid 버튼 disabled**: 해당 역할의 200 shade 배경 + 흰색 텍스트
- **Outline/Ghost disabled**: 투명 배경 + 해당 역할의 300~400 shade 텍스트/테두리
- opacity 기반이 아닌 **고정 색상**으로 정의 (Token Studio 호환성)

| 변형 | 토큰 | Disabled 참조값 | 해석 Hex |
|------|------|----------------|----------|
| brand-solid | `.disabled.bg` | `{color.blue.200}` | #e2f2ff |
| brand-solid | `.disabled.fg` | `{color.common.white}` | #ffffff |
| brand-outline | `.disabled.fg` | `{color.blue.300}` | #d4ecff |
| brand-outline | `.disabled.stroke` | `{color.blue.200}` | #e2f2ff |
| neutral-solid | `.disabled.bg` | `{color.gray.200}` | #e7edf0 |
| neutral-solid | `.disabled.fg` | `{color.common.white}` | #ffffff |
| neutral-outline | `.disabled.fg` | `{color.gray.400}` | #aeb7bc |
| neutral-outline | `.disabled.stroke` | `{color.gray.200}` | #e7edf0 |
| neutral-weak | `.disabled.bg` | `{color.gray.100}` | #f1f4f6 |
| neutral-weak | `.disabled.fg` | `{color.gray.400}` | #aeb7bc |
| critical-solid | `.disabled.bg` | `{color.red.200}` | #f2b2b2 |
| critical-solid | `.disabled.fg` | `{color.common.white}` | #ffffff |
| ghost | `.disabled.fg` | `{color.gray.400}` | #aeb7bc |

> 모든 disabled 상태의 `stroke`가 transparent인 경우 별도 신규 토큰으로 집계하지 않았습니다.

---

## 5. 신규 Component 토큰: Loading State

Loading 상태는 enabled와 동일한 bg/fg/stroke에 추가로 **spinner 색상** 토큰이 있습니다.

| 변형 | spinner 색상 | Hex |
|------|-------------|-----|
| brand-solid | `{color.common.white}` | #ffffff |
| brand-outline | `{color.blue.600}` | #0a93ff |
| neutral-solid | `{color.common.white}` | #ffffff |
| neutral-outline | `{color.gray.600}` | #5e686e |
| neutral-weak | `{color.gray.600}` | #5e686e |
| critical-solid | `{color.common.white}` | #ffffff |
| ghost | `{color.gray.600}` | #5e686e |

### Spinner 색상 규칙
- **Solid 변형 (어두운 배경)**: 흰색 스피너
- **Outline/Weak/Ghost 변형 (밝은/투명 배경)**: 해당 역할의 600 shade 스피너

---

## 6. brand-weak Variant 추가 (2026-02-09)

### 6-1. 요약

Button variant에 `brand-weak`(옅은 브랜드 배경 + 브랜드 텍스트)를 추가했습니다.

| 카테고리 | 신규 토큰 수 |
|---------|------------|
| NEW Semantic 토큰 | **1개** |
| Component 토큰 (brand-weak 4 states) | **13개** |
| **합계** | **14개** |

### 6-2. NEW Semantic 토큰

기존 semantic 레이어에 없어서 새로 추가한 토큰입니다.

| 토큰 경로 | 값 | 타입 | 추가 위치 | 생성 근거 |
|----------|-----|------|----------|----------|
| `color.bg.brand-weak-pressed` | `{color.blue.200}` (#e2f2ff) | color | `figma/token-studio.json` semantic.color.bg | neutral-weak 패턴 동일 적용: enabled(blue.100) → pressed(blue.200) 한 단계 진하게 |

### 6-3. brand-weak 컬러 매핑 (4 States)

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| **enabled** | `{color.bg.brand-weak}` (blue.100 #ebf6ff) | `{color.fg.brand-solid}` (blue.600 #0a93ff) | transparent | — |
| **pressed** | `{color.bg.brand-weak-pressed}` (**NEW** blue.200 #e2f2ff) | `{color.fg.brand-solid-pressed}` (blue.700 #0679df) | transparent | — |
| **disabled** | `{color.blue.50}` (#f6fbff) | `{color.blue.300}` (#d4ecff) | transparent | — |
| **loading** | `{color.bg.brand-weak}` (blue.100 #ebf6ff) | `{color.fg.brand-solid}` (blue.600 #0a93ff) | transparent | `{color.blue.600}` (#0a93ff) |

### 6-4. 설계 결정 사항

1. **bg 패턴**: neutral-weak(gray.100→gray.200) 패턴을 brand에 적용 → blue.100→blue.200
2. **fg 패턴**: brand-outline과 동일하게 `fg.brand-solid`/`fg.brand-solid-pressed` 사용 (읽기 쉬운 진한 브랜드 텍스트)
3. **stroke**: weak 계열은 테두리 없음(transparent) — outline과 명확히 구분
4. **disabled**: neutral fallback 없이 brand 계열 유지 (blue.50 + blue.300)
5. **spinner**: brand-outline과 동일한 `blue.600` (밝은 배경 위 브랜드 스피너)

### 6-5. neutral-weak과의 차이점

| 속성 | neutral-weak | brand-weak |
|------|-------------|------------|
| bg (enabled) | gray.100 (#f1f4f6) | blue.100 (#ebf6ff) |
| fg (enabled) | gray.900 (#222629) | blue.600 (#0a93ff) |
| 용도 | 범용 low-emphasis | 브랜드 연관 low~medium emphasis |
| 시각적 인상 | 회색 톤 | 옅은 파란 톤 |

### 6-6. 파일 변경 요약

| 파일 | 변경 유형 | 내용 |
|------|----------|------|
| `figma/token-studio.json` | **수정** | `color.bg.brand-weak-pressed` 1개 추가 |
| `figma/variables.import.components.button.json` | **수정** | `variant.brand-weak` 4 states 추가 |
| `tokens/components/button.component.json` | **수정** | `variant.brand-weak` 4 states 추가 |
| `src/components/Button.tsx` | **수정** | ButtonVariant 타입에 `brand-weak` 추가 |
| `src/pages/Buttons.tsx` | **수정** | VARIANTS/VARIANT_LABEL에 `brand-weak` 추가 |

---

## 7. 기존 Semantic 토큰 재활용 목록

아래 토큰들은 **새로 만들지 않고** 기존 Semantic 레이어에서 그대로 참조했습니다.

| 토큰 | 사용처 |
|------|--------|
| `color.bg.brand-solid` | brand-solid enabled/loading bg |
| `color.bg.brand-solid-pressed` | brand-solid pressed bg |
| `color.bg.brand-subtle` | brand-outline pressed bg |
| `color.fg.brand-contrast` | brand-solid fg (흰색) |
| `color.fg.brand-solid` | brand-outline enabled/loading fg |
| `color.fg.brand-solid-pressed` | brand-outline pressed fg |
| `color.stroke.brand-solid` | brand-outline enabled/loading stroke |
| `color.stroke.brand-solid-pressed` | brand-outline pressed stroke |
| `color.bg.neutral` | neutral-solid enabled/loading bg |
| `color.fg.neutral-inverted` | neutral-solid fg (흰색) |
| `color.fg.neutral` | neutral-outline/weak/ghost fg |
| `color.bg.neutral-solid` | neutral-weak enabled/loading bg |
| `color.bg.neutral-weak` | neutral-weak pressed bg |
| `color.bg.neutral-subtle` | neutral-outline/ghost pressed bg |
| `color.stroke.neutral-weak` | neutral-outline stroke |
| `color.bg.critical-solid` | critical-solid enabled/loading bg |
| `color.bg.critical-solid-pressed` | critical-solid pressed bg |
| `color.fg.critical-contrast` | critical-solid fg (흰색) |

---

## 7. Avatar 컴포넌트 (2026-02-09)

### 신규 토큰: 없음

Avatar는 기존 semantic 토큰만으로 구성됩니다.

| 요소 | 사용 토큰 | 비고 |
|------|----------|------|
| Size S | `dimension.x8` (32px) | 기존 dimension |
| Size M | `dimension.x10` (40px) | 기존 dimension |
| Fallback BG | `color.bg.neutral-solid` | 기존 semantic |
| Fallback FG | `color.fg.neutral-muted` | 기존 semantic |

---

## 8. Label 컴포넌트 (2026-02-09)

### 신규 토큰: 없음

Label은 기존 semantic 토큰만으로 5개 역할 × 2개 스타일 = 10개 조합을 모두 지원합니다.

| Size | paddingX | paddingY | Typography |
|------|----------|----------|------------|
| Medium | `dimension.x2_5` (10px) | `dimension.x1_5` (6px) | h10/bold (13px Bold) |
| Small | `dimension.x2` (8px) | `dimension.x1_5` (6px) | l3 (12px Medium) |

**Radius**: `radius.r1_5` (6px)

**Typography 매핑**:
- "h10/bold" → `typography.header.h10.bold` (13px, Bold, 18px lineHeight)
- "i3" → `typography.label.l3` (12px, Medium, 12px lineHeight) — 시스템에 "i3" 없어서 l3 사용

---

## 9. Skeleton 컴포넌트 (2026-02-09)

### 참조 토큰 (Foundation에서 추가됨)

| 토큰 | 참조 | CSS 변수 |
|------|------|---------|
| `skeleton.bg` | `{color.gray.100}` | `--skeleton-bg` |
| `skeleton.shimmer` | `{color.gray.200}` | `--skeleton-shimmer` |
| `skeleton.radius` | `{radius.r2}` | `--skeleton-radius` |

상세는 `reports/newly-created-foundation-tokens.md` 참조.

---

## 10. 파일 변경 요약 (전체)

| 파일 | 변경 유형 | 내용 |
|------|----------|------|
| `tokens/primitives.json` | **수정** | radius scale 9개 추가 |
| `tokens/components/button.component.json` | **신규** | 버튼 컴포넌트 토큰 전체 |
| `figma/variables.import.components.button.json` | **신규** | Token Studio 임포트용 |
| `figma/token-studio.json` | **수정** | shadow, layer, spacing, skeleton 토큰 추가 |
| `src/components/Avatar.tsx` | **신규** | 챗봇용 아바타 컴포넌트 |
| `src/components/Label.tsx` | **신규** | Ride 전용 라벨 컴포넌트 |
| `src/components/Skeleton.tsx` | **신규** | 스켈레톤 로딩 컴포넌트 |
