# 신규 생성 Foundation 토큰 리포트

**작성일**: 2026-02-09
**대상**: 3단계 진입 준비 (Elevation, Spacing, Skeleton)

---

## 1. 요약

| 카테고리 | 신규 토큰 수 | 추가 위치 |
|---------|------------|----------|
| Shadow (Primitive) | **3개** | `figma/token-studio.json` primitive.shadow |
| Layer Surface (Semantic) | **3개** | `figma/token-studio.json` semantic.color.bg |
| Spacing Semantic | **3개** | `figma/token-studio.json` semantic.spacing |
| Skeleton (Semantic) | **3개** | `figma/token-studio.json` semantic.skeleton |
| **합계** | **12개** | |

---

## 2. Shadow 토큰 (Primitive)

SEED Elevation 원칙에 따라 3단계 shadow 토큰을 추가했습니다.

| 토큰 | 값 | 용도 |
|------|-----|------|
| `shadow.s1` | `0px 1px 4px 0px rgba(0,0,0,0.08)` | 카드, 리스트 아이템 |
| `shadow.s2` | `0px 2px 10px 0px rgba(0,0,0,0.10)` | 바텀시트, 드롭다운 |
| `shadow.s3` | `0px 4px 16px 0px rgba(0,0,0,0.12)` | 다이얼로그, 플로팅 요소 |

### 설계 근거
- SEED 표준: offset-y 2배 증가 (1→2→4), blur 증가 (4→10→16), 투명도 점진 (8%→10%→12%)
- Token Studio type: `boxShadow`

---

## 3. Layer Surface 토큰 (Semantic)

Elevation 표현 방식 중 "Surface Color" 토큰입니다.

| 토큰 | 참조 | 해석값 | 용도 |
|------|------|--------|------|
| `color.bg.layer-basement` | `{color.gray.50}` | #f7f9fa | 최하위 배경 (스크롤 뒤) |
| `color.bg.layer-default` | `{color.common.white}` | #ffffff | 기본 표면 (카드, 페이지) |
| `color.bg.layer-floating` | `{color.common.white}` | #ffffff | 플로팅 요소 (모달, 시트) |

### 설계 근거
- Light 모드에서는 layer-default와 layer-floating이 동일 (white)
- Dark 모드 도입 시 layer-floating을 더 밝게 설정하여 깊이감 표현 가능
- SEED의 "Surface Color" 표현 방식 적용

---

## 4. Spacing Semantic 토큰

3단계 안정성 우선 정책: **16px 고정**.

| 토큰 | 참조 | 해석값 | 용도 |
|------|------|--------|------|
| `spacing.default` | `{dimension.x4}` | 16px | 모든 기본 간격 |
| `spacing.gutterX` | `{dimension.x4}` | 16px | 화면 좌우 여백 |
| `spacing.gutterY` | `{dimension.x4}` | 16px | 화면 상하 여백 |

### 설계 근거
- 3개 모두 같은 16px이지만 의미를 분리하여 추후 독립 조정 가능
- 기존 primitive spacing 토큰(global-gutter 등)과 병존 — 충돌 없음

---

## 5. Skeleton 토큰 (Semantic)

로딩 스켈레톤용 임의값 토큰입니다.

| 토큰 | 참조 | 해석값 | 용도 |
|------|------|--------|------|
| `skeleton.bg` | `{color.gray.100}` | #f1f4f6 | 스켈레톤 기본 배경 |
| `skeleton.shimmer` | `{color.gray.200}` | #e7edf0 | 시머 하이라이트 |
| `skeleton.radius` | `{radius.r2}` | 8px | 기본 라운딩 |

### 설계 근거
- gray 기반(neutral)으로 구성 — 시각적 방해 최소화
- shimmer는 bg보다 한 단계 진한 gray로 미묘한 움직임 표현
- radius는 카드/버튼과 동일한 r2 사용

---

## 6. CSS 변수 매핑

```css
/* Shadow (Primitive) */
--shadow-s1: 0px 1px 4px 0px rgba(0,0,0,0.08);
--shadow-s2: 0px 2px 10px 0px rgba(0,0,0,0.10);
--shadow-s3: 0px 4px 16px 0px rgba(0,0,0,0.12);

/* Layer Surface (Semantic) */
--color-bg-layer-basement: var(--color-gray-50);
--color-bg-layer-default: var(--color-common-white);
--color-bg-layer-floating: var(--color-common-white);

/* Spacing (Semantic) */
--spacing-default: var(--dimension-x4);
--spacing-gutterX: var(--dimension-x4);
--spacing-gutterY: var(--dimension-x4);

/* Skeleton (Semantic) */
--skeleton-bg: var(--color-gray-100);
--skeleton-shimmer: var(--color-gray-200);
--skeleton-radius: var(--radius-r2);
```

---

## 7. 스크립트 변경

`scripts/generate-tokens.mjs`에 3개 섹션 추가:
- `Primitive: Shadow`
- `Semantic: Spacing`
- `Semantic: Skeleton`

총 CSS 변수 수: 666 → **678** (12개 증가)
