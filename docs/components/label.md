# Label 컴포넌트 스펙 (Ride 전용)

**작성일**: 2026-02-09
**참고**: SEED에 명시적 Label 없음 — Ride 전용 정의

---

## 1. Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | (필수) | 라벨 텍스트 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `style` | `'solid' \| 'weak'` | `'weak'` | 스타일 |
| `role` | `'brand' \| 'neutral' \| 'success' \| 'warning' \| 'critical'` | `'neutral'` | 컬러 역할 |

---

## 2. Size 스펙

| Size | paddingX | paddingY | Typography | 토큰 참조 |
|------|----------|----------|------------|----------|
| **Medium** | 10px (`dimension.x2_5`) | 6px (`dimension.x1_5`) | h10/bold (13px Bold) | header.h10.bold |
| **Small** | 8px (`dimension.x2`) | 6px (`dimension.x1_5`) | l3 (12px Medium) | label.l3 |

---

## 3. Color 매핑 (기존 semantic 토큰 재활용)

### Solid (진한 배경 + 대비 텍스트)

| Role | bg | fg |
|------|-----|-----|
| brand | `bg.brand-solid` (blue.600) | `fg.brand-contrast` (white) |
| neutral | `bg.neutral` (gray.900) | `fg.neutral-inverted` (white) |
| success | `bg.success-solid` (green.500) | `fg.success-contrast` (white) |
| warning | `bg.warning-solid` (yellow.400) | `fg.warning-contrast` (gray.900) |
| critical | `bg.critical-solid` (red.600) | `fg.critical-contrast` (white) |

### Weak (연한 배경 + 역할색 텍스트)

| Role | bg | fg |
|------|-----|-----|
| brand | `bg.brand-weak` (blue.100) | `fg.brand-solid` (blue.600) |
| neutral | `bg.neutral-solid` (gray.100) | `fg.neutral` (gray.900) |
| success | `bg.success-weak` (green.100) | `fg.success-solid` (green.600) |
| warning | `bg.warning-weak` (yellow.100) | `fg.warning-solid` (yellow.700) |
| critical | `bg.critical-weak` (red.100) | `fg.critical-solid` (red.600) |

---

## 4. Radius

`radius.r1_5` (6px) — 버튼보다 작은 라운딩으로 badge/tag 느낌

---

## 5. 신규 토큰

없음. 모든 컬러가 기존 semantic 토큰으로 충족됨.
