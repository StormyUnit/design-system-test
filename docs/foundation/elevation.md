# Elevation (깊이/높이 체계)

**작성일**: 2026-02-09
**참고**: SEED Design System Elevation 원칙

---

## 1. 원칙

UI 요소 간 **시각적 깊이감**을 일관되게 표현하기 위한 규칙.
3가지 표현 방식을 조합하여 elevation을 전달한다:

| 표현 방식 | 설명 | 사용 예 |
|----------|------|---------|
| **Surface Color** | 배경 밝기로 레이어 구분 | 페이지 배경 vs 카드 |
| **Shadow** | 그림자로 떠있는 느낌 | 카드, 드롭다운, 모달 |
| **Stroke** | 테두리로 영역 구분 | 네비게이션, 구분선 |

---

## 2. Global Level (컨테이너 계층)

| Level | 토큰 | 용도 | 표현 |
|-------|------|------|------|
| **0** | `bg.layer-basement` | 최하위 배경 (스크롤 뒤) | Surface: gray.50 |
| **1** | `bg.layer-default` | 기본 표면 (카드, 페이지) | Surface: white |
| **2** | `bg.layer-floating` | 플로팅 요소 (시트, 모달) | Surface: white + shadow.s2 |
| **3** | — | 다이얼로그 (최상위) | Surface: white + shadow.s3 |

---

## 3. Shadow 토큰 (3단계)

| 토큰 | CSS 값 | 용도 |
|------|--------|------|
| `shadow.s1` | `0px 1px 4px 0px rgba(0,0,0,0.08)` | 카드, 리스트 아이템 |
| `shadow.s2` | `0px 2px 10px 0px rgba(0,0,0,0.10)` | 바텀시트, 드롭다운 |
| `shadow.s3` | `0px 4px 16px 0px rgba(0,0,0,0.12)` | 다이얼로그, 플로팅 요소 |

패턴: offset-y 2배씩 증가 (1→2→4), blur 증가 (4→10→16), 투명도 증가 (8%→10%→12%)

---

## 4. 사용 규칙

### DO
- 카드/패널: `shadow.s1` + `bg.layer-default`
- BottomActionBar: `stroke.neutral-weak` (1px border-top)
- 바텀시트/드롭다운: `shadow.s2` + `bg.layer-floating`
- 모달/다이얼로그: `shadow.s3` + `bg.layer-floating`

### DON'T
- 같은 level에서 z-index로 구분하지 않기 — shadow/stroke/surface로 구분
- shadow를 과도하게 사용하지 않기 — 최대 s2까지 일반적

---

## 5. 적용 예시

### 예시 1: 카드 + 바텀 액션바
```
┌─ layer-basement (gray.50) ──────────┐
│  ┌─ layer-default + shadow.s1 ───┐  │
│  │  카드 컨텐츠                    │  │
│  └───────────────────────────────┘  │
│  ┌─ layer-default + shadow.s1 ───┐  │
│  │  카드 컨텐츠                    │  │
│  └───────────────────────────────┘  │
├─ BottomActionBar (stroke top) ──────┤
│  [Cancel]          [Confirm]        │
└─────────────────────────────────────┘
```

### 예시 2: 플로팅 안내 배너
```
┌─ layer-default ─────────────────────┐
│  컨텐츠                              │
│  ┌─ layer-floating + shadow.s2 ──┐  │
│  │  안내 배너 (떠있는 느낌)         │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 6. CSS 변수 참조

```css
/* Surface */
var(--color-bg-layer-basement)   /* gray.50 */
var(--color-bg-layer-default)    /* white */
var(--color-bg-layer-floating)   /* white */

/* Shadow */
var(--shadow-s1)   /* 카드 */
var(--shadow-s2)   /* 시트 */
var(--shadow-s3)   /* 다이얼로그 */
```
