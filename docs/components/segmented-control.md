# Segmented Control 컴포넌트 스펙

**작성일**: 2026-02-09
**상태**: 구현 완료

---

## 1. 개요

Track(컨테이너) + Indicator(선택 pill) + Items(텍스트) 구조의 세그먼트 컨트롤.
iOS 스타일의 탭 전환 UI로, 2~3개 항목을 전환할 때 사용.

---

## 2. Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `items` | `string[]` | (필수) | 탭 항목 텍스트 배열 |
| `value` | `number` | (필수) | 선택된 항목 인덱스 |
| `onChange` | `(index: number) => void` | (필수) | 선택 변경 콜백 |
| `size` | `'md' \| 'lg'` | `'md'` | 크기 |
| `layout` | `'full' \| 'hug'` | `'full'` | 레이아웃 모드 |
| `disabled` | `boolean` | `false` | 비활성 상태 |

---

## 3. Size 스펙

### Large (`lg`)

| 속성 | 값 | 토큰 참조 |
|------|-----|----------|
| Track Height | 56px | `dimension.x14` |
| Indicator Height | 48px | `dimension.x12` |
| Track Padding | 4px (all sides) | `dimension.x1` |
| Track PaddingX (hug) | 12px | `dimension.x3` |
| Track Radius | 14px | `radius.r3_5` |
| Indicator Radius | 10px | `radius.r2_5` |

### Medium (`md`)

| 속성 | 값 | 토큰 참조 |
|------|-----|----------|
| Track Height | 40px | `dimension.x10` |
| Indicator Height | 32px | `dimension.x8` |
| Track Padding | 4px (all sides) | `dimension.x1` |
| Track PaddingX (hug) | 12px | `dimension.x3` |
| Track Radius | 12px | `radius.r3` |
| Indicator Radius | 8px | `radius.r2` |

### Radius 설계 근거

`Track radius - Track padding = Indicator radius`

- Large: r3_5(14px) - 4px = r2_5(10px)
- Medium: r3(12px) - 4px = r2(8px)

→ 버튼 L(r3=12px), XL(r3_5=14px)과 톤이 맞음.

---

## 4. Layout 모드

### Full Width (`full`)
- Track width: 100%
- Items: flex:1로 동일 폭 분배

### Hug Content (`hug`)
- Track width: 컨텐츠 기반
- Track 좌우 PaddingX: 12px (`dimension.x3`)
- Items: 컨텐츠 기반 폭

---

## 5. Color 매핑

| 요소 | 스펙 명칭 | 사용 토큰 | 해석값 |
|------|----------|----------|--------|
| Track BG | bg.neutral-weak | `color.bg.neutral-weak` | gray.200 #e7edf0 |
| Indicator BG | bg.surface | `color.common.white` | #ffffff |
| Text (selected) | fg.primary | `color.fg.brand-solid` | blue.600 #0a93ff |
| Text (default) | fg.neutral | `color.fg.neutral` | gray.900 #222629 |
| Text (disabled) | fg.disabled | `color.fg.neutral-muted` | gray.600 #5e686e |

> `bg.surface`, `fg.primary`, `fg.disabled` 토큰은 현재 시스템에 없어서 가장 가까운 기존 토큰으로 매핑.

---

## 6. Typography

| Size | 토큰 | 해석 |
|------|------|------|
| Medium | `typography.button.b4` | 13px Medium |
| Large | `typography.button.b3` | 15px Medium |

---

## 7. Interaction

- `onChange` 콜백으로 선택 변경
- Indicator 이동 애니메이션: 150ms ease-out (CSS transition)
- disabled 시 클릭 불가 + 텍스트 색상 흐림 처리
