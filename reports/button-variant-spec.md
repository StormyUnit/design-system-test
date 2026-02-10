# Button Variant 전체 사양서

**작성일**: 2026-02-09
**Variant 수**: 8개 (brand-weak 추가 포함)
**Size 수**: 5개 (xs, s, m, l, xl)
**State 수**: 4개 (enabled, pressed, disabled, loading)

---

## 1. Variant 요약표

| # | Variant | Emphasis | 배경 특성 | 텍스트 특성 | 테두리 | 용도 |
|---|---------|----------|----------|-----------|--------|------|
| 1 | **brand-solid** | High | 진한 브랜드(blue.600) | 흰색 | 없음 | CTA, 핵심 액션 |
| 2 | **brand-outline** | Medium | 투명 | 브랜드(blue.600) | 브랜드(blue.600) | 보조 브랜드 액션 |
| 3 | **brand-weak** | Low~Medium | 연한 브랜드(blue.100) | 브랜드(blue.600) | 없음 | 브랜드 톤의 약한 강조 |
| 4 | **neutral-solid** | High | 진한 중립(gray.900) | 흰색 | 없음 | 주요 범용 액션 |
| 5 | **neutral-outline** | Medium | 투명 | 기본(gray.900) | 중립(gray.200) | 보조 범용 액션 |
| 6 | **neutral-weak** | Low | 연한 중립(gray.100) | 기본(gray.900) | 없음 | 약한 강조 범용 |
| 7 | **critical-solid** | High | 위험(red.500) | 흰색 | 없음 | 삭제, 경고 액션 |
| 8 | **ghost** | Minimal | 투명 | 기본(gray.900) | 없음 | 최소 강조, 텍스트 링크형 |

---

## 2. 상세 컬러 매핑 (State별)

### 2-1. brand-solid

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | `bg.brand-solid` (blue.600) | `fg.brand-contrast` (white) | transparent | — |
| pressed | `bg.brand-solid-pressed` (blue.700) | `fg.brand-contrast` (white) | transparent | — |
| disabled | `blue.200` | `common.white` | transparent | — |
| loading | `bg.brand-solid` (blue.600) | `fg.brand-contrast` (white) | transparent | white |

### 2-2. brand-outline

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | transparent | `fg.brand-solid` (blue.600) | `stroke.brand-solid` (blue.600) | — |
| pressed | `bg.brand-subtle` (blue.50) | `fg.brand-solid-pressed` (blue.700) | `stroke.brand-solid-pressed` (blue.700) | — |
| disabled | transparent | `blue.300` | `blue.200` | — |
| loading | transparent | `fg.brand-solid` (blue.600) | `stroke.brand-solid` (blue.600) | blue.600 |

### 2-3. brand-weak

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | `bg.brand-weak` (blue.100) | `fg.brand-solid` (blue.600) | transparent | — |
| pressed | `bg.brand-weak-pressed` (blue.200) | `fg.brand-solid-pressed` (blue.700) | transparent | — |
| disabled | `blue.50` | `blue.300` | transparent | — |
| loading | `bg.brand-weak` (blue.100) | `fg.brand-solid` (blue.600) | transparent | blue.600 |

### 2-4. neutral-solid

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | `bg.neutral` (gray.900) | `fg.neutral-inverted` (white) | transparent | — |
| pressed | `gray.800` | `fg.neutral-inverted` (white) | transparent | — |
| disabled | `gray.200` | `common.white` | transparent | — |
| loading | `bg.neutral` (gray.900) | `fg.neutral-inverted` (white) | transparent | white |

### 2-5. neutral-outline

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | transparent | `fg.neutral` (gray.900) | `stroke.neutral-weak` (gray.200) | — |
| pressed | `bg.neutral-subtle` (gray.50) | `fg.neutral` (gray.900) | `stroke.neutral-weak` (gray.200) | — |
| disabled | transparent | `gray.400` | `gray.200` | — |
| loading | transparent | `fg.neutral` (gray.900) | `stroke.neutral-weak` (gray.200) | gray.600 |

### 2-6. neutral-weak

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | `bg.neutral-solid` (gray.100) | `fg.neutral` (gray.900) | transparent | — |
| pressed | `bg.neutral-weak` (gray.200) | `fg.neutral` (gray.900) | transparent | — |
| disabled | `gray.100` | `gray.400` | transparent | — |
| loading | `bg.neutral-solid` (gray.100) | `fg.neutral` (gray.900) | transparent | gray.600 |

### 2-7. critical-solid

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | `bg.critical-solid` (red.500) | `fg.critical-contrast` (white) | transparent | — |
| pressed | `bg.critical-solid-pressed` (red.600) | `fg.critical-contrast` (white) | transparent | — |
| disabled | `red.200` | `common.white` | transparent | — |
| loading | `bg.critical-solid` (red.500) | `fg.critical-contrast` (white) | transparent | white |

### 2-8. ghost

| State | bg | fg | stroke | spinner |
|-------|-----|-----|--------|---------|
| enabled | transparent | `fg.neutral` (gray.900) | transparent | — |
| pressed | `bg.neutral-subtle` (gray.50) | `fg.neutral` (gray.900) | transparent | — |
| disabled | transparent | `gray.400` | transparent | — |
| loading | transparent | `fg.neutral` (gray.900) | transparent | gray.600 |

---

## 3. Emphasis 계층 비교

```
High emphasis    ████████████  brand-solid, neutral-solid, critical-solid
Medium emphasis  ████████      brand-outline, neutral-outline
Low~Med emphasis ██████        brand-weak
Low emphasis     ████          neutral-weak
Minimal emphasis ██            ghost
```

### Brand 계열 비교 (같은 "브랜드" 역할, 강조도 다름)

| 속성 | brand-solid | brand-outline | brand-weak |
|------|-------------|---------------|------------|
| bg | 진한 파란(blue.600) | 투명 | 옅은 파란(blue.100) |
| fg | 흰색 | 파란(blue.600) | 파란(blue.600) |
| stroke | 없음 | 파란(blue.600) | 없음 |
| 강조도 | High | Medium | Low~Medium |
| 구분 포인트 | 배경이 진한 브랜드색 | 테두리가 브랜드색 | 배경이 연한 브랜드색 |

### Weak 계열 비교 (brand-weak vs neutral-weak)

| 속성 | brand-weak | neutral-weak |
|------|------------|--------------|
| bg enabled | blue.100 (#ebf6ff) | gray.100 (#f1f4f6) |
| bg pressed | blue.200 (#e2f2ff) | gray.200 (#e7edf0) |
| fg enabled | blue.600 (#0a93ff) | gray.900 (#222629) |
| 시각 톤 | 옅은 파란 | 옅은 회색 |
| 의미 | 브랜드 연관 약한 강조 | 범용 약한 강조 |

---

## 4. 토큰 수 통계

| 항목 | 개수 |
|------|------|
| Size 토큰 (5 sizes × 7 props) | 35 |
| Variant 토큰 (8 variants × 4 states × 3~4 props) | 109 |
| **총 Component Button 토큰** | **144** |

---

## 5. 관련 파일

| 파일 | 역할 |
|------|------|
| `tokens/components/button.component.json` | DTCG 형식 소스 |
| `figma/variables.import.components.button.json` | Token Studio Figma 임포트용 |
| `figma/token-studio.json` | Foundation (Primitive + Semantic) |
| `src/components/Button.tsx` | Web Preview 버튼 컴포넌트 |
| `src/pages/Buttons.tsx` | Web Preview 버튼 갤러리 페이지 |
