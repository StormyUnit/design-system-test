# Bottom Action Bar 컴포넌트 스펙

**작성일**: 2026-02-09
**상태**: 구현 완료

---

## 1. 개요

하단 Sticky Bar. 버튼 1개 또는 2개를 배치하는 MVP 구조.
주요 액션(확인, 다음, 저장 등)을 화면 하단에 고정 배치할 때 사용.

---

## 2. Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | (필수) | 내부 버튼 (1~2개) |
| `safeArea` | `boolean` | `false` | iOS safe area 하단 여백 적용 |

---

## 3. Layout 스펙

| 속성 | 값 | 토큰 참조 |
|------|-----|----------|
| 좌/우 screen inset | 20px | `dimension.x5` |
| 상단 내부 여백 (top) | 8px | `dimension.x2` |
| 하단 여백 (bottom) | 20px | `dimension.x5` |
| 버튼 간 gap (2개일 때) | 10px | `dimension.x2_5` |

---

## 4. Button 배치 규칙

### 1개 버튼
- Full width (좌우 20px inset 적용)

### 2개 버튼
- 동일 너비 2개 (flex: 1)
- 좌 20px inset, 중간 gap 10px, 우 20px inset

### 버튼 Size
- 기본: L (height 48px)
- 버튼 컴포넌트의 size prop 사용

---

## 5. Color 매핑

| 요소 | 스펙 명칭 | 사용 토큰 | 해석값 |
|------|----------|----------|--------|
| Bar BG | bg.surface | `color.common.white` | #ffffff |
| Top divider | stroke.divider | `color.stroke.neutral-weak` | gray.200 #e7edf0 |

> `bg.surface`, `stroke.divider` 토큰은 현재 시스템에 없어서 가장 가까운 기존 토큰으로 매핑.

---

## 6. Safe Area

- `safeArea={true}` 시 `padding-bottom`에 `env(safe-area-inset-bottom)` 추가
- Web preview에서는 prop으로 on/off 가능
- 실제 모바일 환경에서만 효과 있음
