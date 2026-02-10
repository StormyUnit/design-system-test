# Figma Button Preview 페이지 구성 가이드

**작성일**: 2026-02-08
**대상**: Ride Design System — Button Component Token 검증

---

## 1. 개요

Token Studio에서 버튼 토큰을 Figma Variables로 적용한 뒤,
실제 컴포넌트가 올바르게 보이는지 확인하기 위한 **Preview 페이지 구성 가이드**입니다.

---

## 2. Token Studio 임포트 방법

### Step 1: Token Studio 플러그인 열기
1. Figma 파일에서 **Plugins → Token Studio for Figma** 실행

### Step 2: 버튼 토큰 세트 추가
1. Token Studio 좌측 하단 **"+"** 버튼 클릭
2. **"Import"** 선택
3. `figma/variables.import.components.button.json` 파일 내용 붙여넣기
4. `component-button` 토큰 세트가 추가됩니다

### Step 3: 테마 설정
1. 기존 `ride-light` 테마에 `component-button` 세트를 **enabled**로 추가
2. 또는 별도 `ride-light-component` 테마 사용

### Step 4: Variables 내보내기
1. **Export → Figma Variables** 선택
2. `component-button` 세트의 토큰들이 Figma Variables로 생성됩니다

---

## 3. Preview 페이지 레이아웃

### 3.1 페이지 구조

```
📄 Button Preview
├── Frame: "Size Comparison" (사이즈 비교)
├── Frame: "Variant Gallery" (변형 갤러리)
├── Frame: "State Matrix" (상태 매트릭스)
└── Frame: "Real-world Examples" (실사용 예시)
```

### 3.2 Size Comparison 프레임

**목적**: 5가지 사이즈를 나란히 비교

```
┌──────────────────────────────────────────────────────┐
│  Size Comparison                                      │
│                                                       │
│  [XS 버튼]  [S 버튼]  [M 버튼]  [  L 버튼  ]  [  XL 버튼  ]  │
│   28px      32px      40px       48px        56px     │
│                                                       │
│  B5M-11    B4M-13    B3M-15     B2M-17      B1M-19   │
│  r2(8px)   r2.5(10)  r3(12px)   r3(12px)    r3.5(14) │
└──────────────────────────────────────────────────────┘
```

**바인딩 방법**:
| Figma 속성 | 바인딩할 Variable |
|-----------|-----------------|
| Frame Height | `button.size.{size}.height` |
| Horizontal Padding | `button.size.{size}.paddingX` |
| Vertical Padding | `button.size.{size}.paddingY` |
| Corner Radius | `radius.{r값}` |
| Text Style | 수동 적용: Button/B{n}M-{px} |

### 3.3 Variant Gallery 프레임

**목적**: 7가지 변형의 enabled 상태 비교

```
┌──────────────────────────────────────────────────────┐
│  Variant Gallery (M size 기준)                        │
│                                                       │
│  ┌────────────┐  브랜드 솔리드 (Primary CTA)           │
│  │ Brand Solid│  bg: blue.600, fg: white              │
│  └────────────┘                                       │
│                                                       │
│  ┌────────────┐  브랜드 아웃라인                        │
│  │Brand Outline│  bg: transparent, fg: blue.600        │
│  └────────────┘  stroke: blue.600                     │
│                                                       │
│  ┌────────────┐  중립 솔리드                            │
│  │Neutral Solid│  bg: gray.900, fg: white              │
│  └────────────┘                                       │
│                                                       │
│  ┌────────────┐  중립 아웃라인                          │
│  │Neutral Out │  bg: transparent, fg: gray.900         │
│  └────────────┘  stroke: gray.200                     │
│                                                       │
│  ┌────────────┐  중립 약한                              │
│  │Neutral Weak│  bg: gray.100, fg: gray.900            │
│  └────────────┘                                       │
│                                                       │
│  ┌────────────┐  위험/삭제                              │
│  │Critical    │  bg: red.600, fg: white                │
│  └────────────┘                                       │
│                                                       │
│  ┌────────────┐  고스트                                 │
│  │  Ghost     │  bg: transparent, fg: gray.900         │
│  └────────────┘                                       │
└──────────────────────────────────────────────────────┘
```

**바인딩 방법**:
| Figma 속성 | 바인딩할 Variable |
|-----------|-----------------|
| Fill (배경) | `button.variant.{variant}.enabled.bg` |
| Text Fill | `button.variant.{variant}.enabled.fg` |
| Stroke | `button.variant.{variant}.enabled.stroke` |

### 3.4 State Matrix 프레임

**목적**: 각 변형 × 4가지 상태를 격자로 비교

```
┌──────────────────────────────────────────────────────┐
│  State Matrix (M size)                                │
│                                                       │
│              Enabled    Pressed    Disabled   Loading  │
│  ─────────┼──────────┼──────────┼──────────┼────────  │
│  brand-s  │  ■■■■■   │  ■■■■■   │  ░░░░░   │  ■●■■  │
│  brand-o  │  □□□□□   │  □□□□□   │  ░░░░░   │  □●□□  │
│  neut-s   │  ■■■■■   │  ■■■■■   │  ░░░░░   │  ■●■■  │
│  neut-o   │  □□□□□   │  □□□□□   │  ░░░░░   │  □●□□  │
│  neut-w   │  ▒▒▒▒▒   │  ▒▒▒▒▒   │  ░░░░░   │  ▒●▒▒  │
│  critical │  ■■■■■   │  ■■■■■   │  ░░░░░   │  ■●■■  │
│  ghost    │  ·····   │  ·····   │  ░░░░░   │  ·●··  │
│                                                       │
│  ■ = Solid fill  □ = Outline  ▒ = Weak  · = Ghost     │
│  ░ = Disabled    ● = Spinner                          │
└──────────────────────────────────────────────────────┘
```

**바인딩 방법**:
| Figma 속성 | 바인딩할 Variable |
|-----------|-----------------|
| Fill | `button.variant.{variant}.{state}.bg` |
| Text Fill | `button.variant.{variant}.{state}.fg` |
| Stroke | `button.variant.{variant}.{state}.stroke` |
| Spinner Color | `button.variant.{variant}.loading.spinner` |

---

## 4. Figma Auto Layout 설정

### 버튼 컴포넌트 만들기

1. **Frame** 생성 (Auto Layout 활성화)
2. Auto Layout 설정:
   - Direction: **Horizontal**
   - Padding: Variable로 `paddingX` (좌우), `paddingY` (상하) 바인딩
   - Gap: Variable로 `iconGap` 바인딩
   - Alignment: **Center**
3. Frame 자체:
   - Height: **Fixed** → Variable로 `height` 바인딩
   - Width: **Hug Contents**
   - Corner Radius: Variable로 `radius` 바인딩
   - Fill: Variable로 `bg` 바인딩
   - Stroke: Variable로 `stroke` 바인딩 (outline 변형)
4. Text Layer:
   - Text Style: Button/B{n}M-{px} 수동 적용
   - Fill: Variable로 `fg` 바인딩

---

## 5. 검증 체크리스트

### 5.1 사이즈 검증
- [ ] XS 버튼 높이가 28px인가?
- [ ] S 버튼 높이가 32px인가?
- [ ] M 버튼 높이가 40px인가?
- [ ] L 버튼 높이가 48px인가?
- [ ] XL 버튼 높이가 56px인가?
- [ ] 각 사이즈의 Corner Radius가 올바른가? (XS=8, S=10, M/L=12, XL=14)
- [ ] 각 사이즈의 텍스트 크기가 올바른가?

### 5.2 변형 검증
- [ ] brand-solid: 파란 배경 + 흰색 텍스트
- [ ] brand-outline: 투명 배경 + 파란 텍스트 + 파란 테두리
- [ ] neutral-solid: 진한 회색 배경 + 흰색 텍스트
- [ ] neutral-outline: 투명 배경 + 진한 텍스트 + 연한 테두리
- [ ] neutral-weak: 연한 회색 배경 + 진한 텍스트
- [ ] critical-solid: 빨간 배경 + 흰색 텍스트
- [ ] ghost: 투명 배경 + 진한 텍스트

### 5.3 상태 검증
- [ ] Pressed: 색상이 enabled보다 약간 어두운가?
- [ ] Disabled: 색상이 연하고 상호작용 불가능해 보이는가?
- [ ] Loading: 스피너 색상이 텍스트 색상과 동일한가?

### 5.4 타이포그래피 검증
- [ ] 모든 버튼 텍스트가 Pretendard 폰트인가?
- [ ] 모든 버튼 텍스트가 Medium(500) 굵기인가?
- [ ] XL=19px, L=17px, M=15px, S=13px, XS=11px인가?

---

## 6. 실사용 예시 프레임

Preview 페이지에 실제 사용 시나리오를 추가하면 디자이너가 검증하기 쉽습니다.

### 예시 1: 모달 하단 버튼 그룹
```
┌─────────────────────────────┐
│  정말 삭제하시겠습니까?       │
│                             │
│  [취소 (neutral-outline/M)] │
│  [삭제 (critical-solid/M)]  │
└─────────────────────────────┘
```

### 예시 2: 로그인 화면
```
┌─────────────────────────────┐
│  로그인                      │
│  [이메일 로그인 (brand-solid/L)]  │
│  [카카오 로그인 (neutral-weak/L)] │
│  [비밀번호 찾기 (ghost/S)]        │
└─────────────────────────────┘
```

### 예시 3: 리스트 아이템 내 버튼
```
┌─────────────────────────────┐
│  상품명               [담기 (brand-solid/XS)]  │
│  10,000원             [찜 (ghost/XS)]          │
└─────────────────────────────┘
```

---

## 7. 트러블슈팅

| 문제 | 원인 | 해결 |
|------|------|------|
| Variable이 보이지 않음 | Token Studio에서 Export 안 됨 | Token Studio → Export → Figma Variables |
| 색상이 참조 해석 안 됨 | primitive/semantic 세트가 비활성 | 테마에서 primitive, semantic 세트도 **enabled** 확인 |
| 폰트가 Pretendard가 아님 | 로컬에 폰트 미설치 | Pretendard 폰트 설치 후 Figma 재시작 |
| radius Variable 없음 | radius가 primitive에만 있음 | component-button 세트에 포함된 radius 사용 |
| transparent가 적용 안 됨 | Token Studio 버전 이슈 | Fill 속성을 직접 제거하거나, opacity 0으로 설정 |
