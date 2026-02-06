# Design Token System 설계 문서

## 개요

이 문서는 SEED/당근 Foundation 규칙을 따라 설계된 디자인 토큰 시스템을 설명합니다.

## Token Layer 구조

### 1. Primitive Layer (원시값)
실제 값(hex, rem, number)을 저장합니다.
컴포넌트에서 직접 참조하지 않습니다.

**예시:**
```json
{
  "color": {
    "gray": {
      "50": "#F9FAFB",
      "500": "#6B7280",
      "900": "#111827"
    }
  }
}
```

### 2. Semantic Layer (의미값)
역할 기반 이름으로 Primitive를 참조합니다.
컴포넌트는 이 Layer를 참조합니다.

**예시:**
```json
{
  "color": {
    "fg": {
      "neutral": "{color.gray.900}"
    }
  }
}
```

### 3. Component Layer (선택적)
컴포넌트 문맥별 별칭을 만듭니다.
1차 목표에서는 생략하고 추후 확장 가능하도록 구조 설계합니다.

---

## Color Token 구조

### Naming Convention
```
color.{property}.{role}-{variant}(-{state})
```

### Property (3가지)
- `fg`: Foreground - 텍스트, 아이콘
- `bg`: Background - 배경
- `stroke`: 테두리

### Role (6가지)
- `brand`: 브랜드 색상 (주요 액션, CTA)
- `neutral`: 중립 색상 (텍스트, 배경, 구분선)
- `positive`: 성공/긍정 메시지 (초록)
- `warning`: 경고 메시지 (노랑/주황)
- `critical`: 오류/위험 메시지 (빨강)
- `informative`: 정보 메시지 (파랑)

### Variant (6가지)
- `solid`: 강한 대비 (기본 상태)
- `weak`: 약한 대비
- `muted`: 흐린/회색빛
- `subtle`: 매우 연한 (배경용)
- `contrast`: 반전 대비
- `inverted`: 색상 반전 (다크모드 대응)

### State (2가지)
- `default`: 기본 상태 (생략 가능)
- `pressed`: 눌렀을 때 (인터랙션)

### 예시
```
color.fg.brand-solid          # 브랜드 색 텍스트
color.fg.brand-solid-pressed  # 눌렀을 때
color.bg.neutral-subtle       # 연한 회색 배경
color.bg.brand-solid          # 브랜드 색 배경 (버튼 등)
color.stroke.critical-solid   # 빨간 테두리 (에러)
```

### Primitive Color Palette

**Gray Scale (neutral용)**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Brand (파랑 계열)**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Positive (초록 계열)**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Warning (주황 계열)**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Critical (빨강 계열)**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

**Informative (파랑 계열, brand와 다른 톤)**
- 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

---

## Typography Token 구조

### 1. Base Token

#### Font Size (10가지)
```
font-size.t1: 0.625rem   (10px)
font-size.t2: 0.6875rem  (11px)
font-size.t3: 0.75rem    (12px)
font-size.t4: 0.875rem   (14px)
font-size.t5: 0.9375rem  (15px)
font-size.t6: 1rem       (16px) ← 기본
font-size.t7: 1.125rem   (18px)
font-size.t8: 1.25rem    (20px)
font-size.t9: 1.5rem     (24px)
font-size.t10: 2rem      (32px)
```

#### Line Height (10가지)
각 font-size에 최적화된 행간:
```
line-height.t1: 1rem      (16px)
line-height.t2: 1rem      (16px)
line-height.t3: 1.125rem  (18px)
line-height.t4: 1.25rem   (20px)
line-height.t5: 1.375rem  (22px)
line-height.t6: 1.5rem    (24px)
line-height.t7: 1.75rem   (28px)
line-height.t8: 2rem      (32px)
line-height.t9: 2rem      (32px)
line-height.t10: 2.5rem   (40px)
```

#### Font Weight (3가지)
```
font-weight.regular: 400
font-weight.medium: 500
font-weight.bold: 700
```

#### Font Family (1가지, 확장 가능)
```
font-family.default: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### 2. Scale Text Style

10개 scale × 3개 weight = 30개 조합

**Naming Convention:**
```
typography.scale.{size}.{weight}
```

**예시:**
```
typography.scale.t1.regular
typography.scale.t1.medium
typography.scale.t1.bold
typography.scale.t2.regular
...
typography.scale.t10.bold
```

각 style은 아래 속성을 포함:
- font-size: {해당 scale}
- line-height: {해당 scale}
- font-weight: {해당 weight}
- font-family: {default}

### 3. Semantic Text Style

의미 있는 이름으로 scale style을 참조합니다.

**예시:**
```
typography.semantic.screenTitle → scale.t10.bold
typography.semantic.sectionTitle → scale.t8.bold
typography.semantic.heading → scale.t7.bold
typography.semantic.subheading → scale.t6.medium
typography.semantic.body → scale.t6.regular
typography.semantic.bodyEmphasis → scale.t6.medium
typography.semantic.caption → scale.t4.regular
typography.semantic.label → scale.t5.medium
typography.semantic.footnote → scale.t3.regular
typography.semantic.micro → scale.t2.regular
```

---

## Figma Variables 매핑

### Collection 구조

**Collection 1: Foundation/Color/Primitive**
- Group: Gray (10개 변수)
- Group: Brand (10개 변수)
- Group: Positive (10개 변수)
- Group: Warning (10개 변수)
- Group: Critical (10개 변수)
- Group: Informative (10개 변수)

**Collection 2: Foundation/Color/Semantic**
- Group: Foreground (fg) - 36개 변수
- Group: Background (bg) - 36개 변수
- Group: Stroke - 36개 변수

**Collection 3: Foundation/Typography/Base**
- Group: Font Size (10개 변수)
- Group: Line Height (10개 변수)
- Group: Font Weight (3개 변수)
- Group: Font Family (1개 변수)

**Collection 4: Foundation/Typography/Scale**
- Group: t1 (regular, medium, bold)
- Group: t2 (regular, medium, bold)
- ...
- Group: t10 (regular, medium, bold)

**Collection 5: Foundation/Typography/Semantic**
- Group: Semantic Styles (10개 변수)

---

## 확장 가능성

### Dark Mode 대응
- Primitive는 유지
- Semantic에 mode별 값 추가:
  ```
  color.fg.neutral (light): gray.900
  color.fg.neutral (dark): gray.50
  ```

### Component Token 추가
- 새로운 Layer 추가:
  ```
  button.primary.bg → color.bg.brand-solid
  button.primary.text → color.fg.contrast
  ```

### 추가 Role/Variant
- 현재 구조를 유지하면서 새로운 role/variant 추가 가능

---

## 파일 구조

```
design-system-test/
├── tokens/
│   ├── primitives.json       # Primitive Layer
│   ├── semantic.json          # Semantic Layer (Color)
│   └── typography.json        # Typography (all layers)
├── figma/
│   ├── variables.json         # Figma Variables import용
│   └── mapping.md             # Figma 적용 가이드
└── docs/
    └── token-system.md        # 이 문서
```

---

## 다음 단계

1. ✅ 토큰 구조 설계 완료
2. ⏳ primitives.json 생성
3. ⏳ semantic.json 생성
4. ⏳ typography.json 생성
5. ⏳ figma.variables.json 생성
6. ⏳ mapping.md 생성
7. ⏳ README.md 업데이트
