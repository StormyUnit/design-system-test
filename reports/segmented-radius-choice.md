# Segmented Control Radius 선택 리포트

**작성일**: 2026-02-09

---

## 1. 선택한 Radius 값

| Size | Track Radius | Indicator Radius | 수식 |
|------|-------------|-----------------|------|
| **Medium** | `radius.r3` (12px) | `radius.r2` (8px) | 12 - 4 = 8 |
| **Large** | `radius.r3_5` (14px) | `radius.r2_5` (10px) | 14 - 4 = 10 |

---

## 2. 선택 근거

### 수학적 정합성

**Track radius - Track padding = Indicator radius**

- Track padding은 양쪽 다 4px(`dimension.x1`)
- Inner element(Indicator)의 radius = Outer element(Track) radius에서 padding을 빼면 시각적으로 일관된 곡률을 유지
- 이 공식은 iOS/Material 모두에서 nested rounded rectangle의 표준 관행

```
┌─────────────────────────┐  ← Track (r=12px)
│  ┌───────────────────┐  │  ← padding 4px
│  │   Indicator (r=8px)│  │  ← 12-4 = 8 ✓
│  └───────────────────┘  │
└─────────────────────────┘
```

### 버튼과의 톤 맞춤

| 참조 대상 | Radius | 비교 |
|----------|--------|------|
| Button M (height 40px) | `radius.r3` (12px) | = SegControl Medium Track |
| Button L (height 48px) | `radius.r3` (12px) | SegControl Medium Track과 동일 |
| Button XL (height 56px) | `radius.r3_5` (14px) | = SegControl Large Track |

- Medium Track(40px) → Button M(40px)과 같은 높이 → 같은 r3 사용
- Large Track(56px) → Button XL(56px)과 같은 높이 → 같은 r3_5 사용

이렇게 하면 **같은 높이의 요소가 같은 radius**를 갖게 되어 시각적 일관성이 유지됩니다.

---

## 3. 대안 (미채택)

| 대안 | Track | Indicator | 미채택 이유 |
|------|-------|-----------|-----------|
| A) 고정 r3/r2 | 12px / 8px | 12px / 8px | Large Track(56px)에 12px는 너무 작아 보임 |
| B) 고정 r3_5/r3 | 14px / 12px | 14px / 12px | Medium Track(40px)에 14px는 과도한 곡률 |
| C) full/pill | 9999px | 9999px | 버튼이 pill이 아니므로 톤이 안 맞음 |

---

## 4. 사용된 Radius 토큰 목록

| 토큰 | 값 | 원래 정의 용도 | 이번 사용 |
|------|-----|-------------|----------|
| `radius.r2` | 8px | Button XS | SegControl Medium Indicator |
| `radius.r2_5` | 10px | Button S | SegControl Large Indicator |
| `radius.r3` | 12px | Button M/L | SegControl Medium Track |
| `radius.r3_5` | 14px | Button XL | SegControl Large Track |
