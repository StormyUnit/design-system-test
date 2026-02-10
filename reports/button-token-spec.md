# Ride Button Component Token Spec

**작성일**: 2026-02-08
**구조 기반**: SEED Action Button 패턴
**참조 파일**: `tokens/components/button.component.json`

---

## 1. 개요

Ride 디자인 시스템의 버튼 컴포넌트 토큰입니다.
SEED(당근마켓) Action Button 구조를 따르며, **5가지 사이즈 × 7가지 변형 × 4가지 상태**로 구성됩니다.

### 토큰 수량

| 카테고리 | 수량 |
|---------|------|
| Size 토큰 (5 사이즈 × 7 속성) | **35개** |
| Variant × State 컬러 (7 변형 × 4 상태 × 3~4 속성) | **91개** |
| Radius Primitive | **9개** |
| **전체** | **135개** |

---

## 2. Size 토큰

### 사이즈별 상세

| 속성 | XS (28) | S (32) | M (40) | L (48) | XL (56) |
|------|---------|--------|--------|--------|---------|
| **height** | 28px | 32px | 40px | 48px | 56px |
| **paddingX** | 10px | 12px | 16px | 20px | 24px |
| **paddingY** | 4px | 6px | 10px | 12px | 14px |
| **radius** | r2 (8px) | r2_5 (10px) | r3 (12px) | r3 (12px) | r3_5 (14px) |
| **iconSize** | 14px | 16px | 18px | 20px | 22px |
| **iconGap** | 4px | 4px | 6px | 6px | 8px |
| **typography** | button.b5 | button.b4 | button.b3 | button.b2 | button.b1 |

### 타이포그래피 매핑 (Figma 원본 검증 완료)

| 토큰 | 폰트 | 크기 | 행간 | 굵기 | Figma 스타일명 |
|------|------|------|------|------|--------------|
| button.b1 | Pretendard | 19px | 26px | Medium (500) | Button/B1M-19 |
| button.b2 | Pretendard | 17px | 24px | Medium (500) | Button/B2M-17 |
| button.b3 | Pretendard | 15px | 20px | Medium (500) | Button/B3M-15 |
| button.b4 | Pretendard | 13px | 18px | Medium (500) | Button/B4M-13 |
| button.b5 | Pretendard | 11px | 16px | Medium (500) | Button/B5M-11 |

### SEED Radius Scale (신규)

| 토큰 | 값 | 용도 |
|------|-----|------|
| radius.r0 | 0px | 라운딩 없음 |
| radius.r1 | 4px | 최소 라운딩 |
| radius.r1_5 | 6px | 작은 라운딩 |
| radius.r2 | 8px | Button XS |
| radius.r2_5 | 10px | Button S |
| radius.r3 | 12px | Button M, L |
| radius.r3_5 | 14px | Button XL |
| radius.r4 | 16px | 큰 라운딩 |
| radius.full | 9999px | 완전 원형 (Pill) |

---

## 3. Variant (변형) 토큰

### 7가지 변형

| # | 변형 | 설명 | 배경 특성 | 테두리 |
|---|------|------|----------|--------|
| 1 | **brand-solid** | 브랜드 채움 버튼 (Primary) | Blue 배경 | 없음 |
| 2 | **brand-outline** | 브랜드 아웃라인 버튼 | 투명 | Blue 테두리 |
| 3 | **neutral-solid** | 중립 채움 버튼 | Gray 900 배경 | 없음 |
| 4 | **neutral-outline** | 중립 아웃라인 버튼 | 투명 | Gray 테두리 |
| 5 | **neutral-weak** | 중립 약한 배경 버튼 | Gray 100 배경 | 없음 |
| 6 | **critical-solid** | 위험/삭제 버튼 | Red 배경 | 없음 |
| 7 | **ghost** | 고스트 버튼 (텍스트만) | 투명 | 없음 |

---

## 4. State (상태) 토큰 — Variant × State 매트릭스

### 4.1 brand-solid

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | `{color.bg.brand-solid}` → blue.600 | `{color.fg.brand-contrast}` → white | transparent |
| **pressed** | `{color.bg.brand-solid-pressed}` → blue.700 | `{color.fg.brand-contrast}` → white | transparent |
| **disabled** | `{color.blue.200}` → #e2f2ff | `{color.common.white}` → white | transparent |
| **loading** | `{color.bg.brand-solid}` → blue.600 | `{color.fg.brand-contrast}` → white | transparent |

### 4.2 brand-outline

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | transparent | `{color.fg.brand-solid}` → blue.600 | `{color.stroke.brand-solid}` → blue.600 |
| **pressed** | `{color.bg.brand-subtle}` → blue.50 | `{color.fg.brand-solid-pressed}` → blue.700 | `{color.stroke.brand-solid-pressed}` → blue.700 |
| **disabled** | transparent | `{color.blue.300}` → #d4ecff | `{color.blue.200}` → #e2f2ff |
| **loading** | transparent | `{color.fg.brand-solid}` → blue.600 | `{color.stroke.brand-solid}` → blue.600 |

### 4.3 neutral-solid

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | `{color.bg.neutral}` → gray.900 | `{color.fg.neutral-inverted}` → white | transparent |
| **pressed** | `{color.gray.800}` → #353b3f | `{color.fg.neutral-inverted}` → white | transparent |
| **disabled** | `{color.gray.200}` → #e7edf0 | `{color.common.white}` → white | transparent |
| **loading** | `{color.bg.neutral}` → gray.900 | `{color.fg.neutral-inverted}` → white | transparent |

### 4.4 neutral-outline

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | transparent | `{color.fg.neutral}` → gray.900 | `{color.stroke.neutral-weak}` → gray.200 |
| **pressed** | `{color.bg.neutral-subtle}` → gray.50 | `{color.fg.neutral}` → gray.900 | `{color.stroke.neutral-weak}` → gray.200 |
| **disabled** | transparent | `{color.gray.400}` → #aeb7bc | `{color.gray.200}` → #e7edf0 |
| **loading** | transparent | `{color.fg.neutral}` → gray.900 | `{color.stroke.neutral-weak}` → gray.200 |

### 4.5 neutral-weak

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | `{color.bg.neutral-solid}` → gray.100 | `{color.fg.neutral}` → gray.900 | transparent |
| **pressed** | `{color.bg.neutral-weak}` → gray.200 | `{color.fg.neutral}` → gray.900 | transparent |
| **disabled** | `{color.gray.100}` → #f1f4f6 | `{color.gray.400}` → #aeb7bc | transparent |
| **loading** | `{color.bg.neutral-solid}` → gray.100 | `{color.fg.neutral}` → gray.900 | transparent |

### 4.6 critical-solid

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | `{color.bg.critical-solid}` → red.600 | `{color.fg.critical-contrast}` → white | transparent |
| **pressed** | `{color.bg.critical-solid-pressed}` → red.700 | `{color.fg.critical-contrast}` → white | transparent |
| **disabled** | `{color.red.200}` → #f2b2b2 | `{color.common.white}` → white | transparent |
| **loading** | `{color.bg.critical-solid}` → red.600 | `{color.fg.critical-contrast}` → white | transparent |

### 4.7 ghost

| 상태 | bg | fg | stroke |
|------|-----|-----|--------|
| **enabled** | transparent | `{color.fg.neutral}` → gray.900 | transparent |
| **pressed** | `{color.bg.neutral-subtle}` → gray.50 | `{color.fg.neutral}` → gray.900 | transparent |
| **disabled** | transparent | `{color.gray.400}` → #aeb7bc | transparent |
| **loading** | transparent | `{color.fg.neutral}` → gray.900 | transparent |

---

## 5. 참조 의존성 (Reference Chain)

```
Component Layer (button.component.json)
  └─ Semantic Layer (semantic.json)
       └─ Primitive Layer (primitives.json)
```

**예시**: `button.variant.brand-solid.enabled.bg`
→ `{color.bg.brand-solid}` (semantic)
→ `{color.blue.600}` (primitive)
→ `#0a93ff` (최종 hex)

---

## 6. 파일 위치

| 파일 | 용도 |
|------|------|
| `tokens/components/button.component.json` | DTCG 표준 형식 (소스) |
| `figma/variables.import.components.button.json` | Token Studio 임포트 형식 |
| `tokens/primitives.json` | radius scale 추가됨 |

---

## 7. 정책 사항

1. **info 역할 미포함**: 버튼에서는 info(정보) 역할을 사용하지 않습니다
2. **Foundation 미수정**: `figma/token-studio.json`은 수정하지 않았습니다
3. **별도 파일 분리**: 버튼 컴포넌트 토큰은 별도 파일에 작성했습니다
4. **loading = enabled 비주얼**: 로딩 상태는 enabled와 동일한 색상에 spinner만 추가
5. **disabled 컬러**: 각 변형의 연한 팔레트 shade를 사용 (opacity 대신 고정 색상)
