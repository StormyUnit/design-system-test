# Figma Variables 적용 가이드

이 문서는 비개발자가 디자인 토큰을 Figma Variables로 변환하는 방법을 단계별로 설명합니다.

---

## 목차

1. [Figma Variables란?](#figma-variables란)
2. [적용 방법: Token Studio Plugin 사용](#적용-방법-token-studio-plugin-사용)
3. [수동 생성 (대안)](#수동-생성-대안)
4. [Text Styles 생성](#text-styles-생성)
5. [검증 체크리스트](#검증-체크리스트)

---

## Figma Variables란?

**Figma Variables**는 디자인 시스템의 값(색상, 크기, 텍스트 등)을 변수로 저장하고 재사용할 수 있는 기능입니다.

**장점:**
- 한 곳에서 값을 수정하면 연결된 모든 디자인이 자동 업데이트
- 다크모드/라이트모드 전환 가능
- 일관된 디자인 유지

**구조:**
```
Collection (컬렉션) - 변수 그룹
  ├─ Mode (모드) - Light/Dark 등
  └─ Variables (변수) - 실제 값들
```

---

## 적용 방법: Token Studio Plugin 사용

> 이전에 사용했던 "Variables Import/Export" 플러그인은 형식 호환 문제로 에러가 발생했습니다.
> **Token Studio for Figma** 플러그인을 사용하세요.

### Step 1: Token Studio 플러그인 설치

1. Figma Desktop 앱 열기
2. 상단 메뉴 `Plugins` → `Find more plugins` 클릭
3. 검색창에 **"Tokens Studio for Figma"** 입력
4. 플러그인 설치

---

### Step 2: 플러그인 실행 및 JSON 불러오기

1. Figma에서 `Plugins` → `Tokens Studio for Figma` 실행
2. 처음 실행하면 "Get started" 화면이 나옴
3. **토큰 저장 방식 선택**: 아래 2가지 중 하나 선택

#### 방법 A: JSON 직접 붙여넣기 (간단)

1. 플러그인 왼쪽 하단의 `Settings` (톱니바퀴) 클릭
2. `Token storage` → `URL or File` 선택
3. VS Code에서 `figma/token-studio.json` 파일 열기
4. 전체 내용 복사 (`Cmd+A` → `Cmd+C`)
5. 플러그인에 붙여넣기

#### 방법 B: GitHub 연동 (추천 - 자동 동기화)

1. 플러그인 왼쪽 하단의 `Settings` (톱니바퀴) 클릭
2. `Token storage` → `GitHub` 선택
3. 아래 정보 입력:
   - **Repository**: `StormyUnit/design-system-test`
   - **Branch**: `main`
   - **File path**: `figma/token-studio.json`
   - **Personal Access Token**: GitHub에서 발급 필요 (아래 참고)
4. `Save` 클릭

> **GitHub Personal Access Token 발급 방법:**
> 1. GitHub → Settings → Developer Settings → Personal Access Tokens → Generate new token
> 2. 권한: `repo` 체크
> 3. 생성된 토큰 복사 후 플러그인에 입력

---

### Step 3: 토큰 확인

플러그인이 JSON을 읽으면 왼쪽에 **토큰 세트(Token Sets)**가 표시됩니다:

- **primitive** - 기본 색상 팔레트 + 타이포그래피 기본값
- **semantic** - 역할 기반 색상 + 타이포그래피 조합

각 세트를 클릭하면 안에 있는 토큰들을 볼 수 있어요.

---

### Step 4: Figma Variables/Styles로 내보내기

1. 플러그인 하단의 `Styles & Variables` 버튼 클릭
2. `Export Styles & Variables` 선택
3. 내보낼 항목 선택:
   - **Color variables**: 체크 (Figma Variables로 내보내기)
   - **Typography styles**: 체크 (Figma Text Styles로 내보내기)
   - **Font sizes**: 체크
   - **Line heights**: 체크
   - **Font weights**: 체크
4. `Export` 클릭

**결과:**
- Color Variables가 Figma Local Variables에 생성됨
- Typography가 Figma Text Styles로 생성됨
- Semantic 토큰의 참조(alias)가 자동 연결됨

---

### Step 5: 테마 적용 확인

1. 플러그인 상단의 세트 목록에서:
   - `primitive` → 체크 표시 (source)
   - `semantic` → 체크 표시 (enabled)
2. 이렇게 하면 semantic 토큰이 primitive를 참조하는 구조가 작동합니다

---

## 수동 생성 (대안)

Plugin 없이 직접 생성하는 방법입니다.

### Step 1: Local Variables 패널 열기

1. Figma 왼쪽 패널에서 `Local variables` 클릭
2. 우측 상단 `+` 버튼 클릭

---

### Step 2: Collection 생성

#### Collection 1: Primitive Color

1. Collection 이름: `primitive/color`
2. Mode: `Light` (기본값)

**Gray Scale (10개)**
| 변수명 | Type | 값 |
|--------|------|-----|
| gray/50 | Color | #F9FAFB |
| gray/100 | Color | #F3F4F6 |
| gray/200 | Color | #E5E7EB |
| gray/300 | Color | #D1D5DB |
| gray/400 | Color | #9CA3AF |
| gray/500 | Color | #6B7280 |
| gray/600 | Color | #4B5563 |
| gray/700 | Color | #374151 |
| gray/800 | Color | #1F2937 |
| gray/900 | Color | #111827 |

**Brand (10개)**
| 변수명 | Type | 값 |
|--------|------|-----|
| brand/50 | Color | #EFF6FF |
| brand/100 | Color | #DBEAFE |
| brand/200 | Color | #BFDBFE |
| brand/300 | Color | #93C5FD |
| brand/400 | Color | #60A5FA |
| brand/500 | Color | #3B82F6 |
| brand/600 | Color | #2563EB |
| brand/700 | Color | #1D4ED8 |
| brand/800 | Color | #1E40AF |
| brand/900 | Color | #1E3A8A |

**나머지 4개 Role도 동일한 방식으로 생성:**
- positive (초록 계열) - `tokens/primitives.json` 참고
- warning (주황 계열)
- critical (빨강 계열)
- informative (파랑 계열)

---

#### Collection 2: Semantic Color

1. Collection 이름: `semantic/color`
2. Mode: `Light`

| 변수명 | Type | 값 (Alias) | 설명 |
|--------|------|-----------|------|
| fg/brand-solid | Color | {color.brand.600} | 브랜드 텍스트 |
| fg/brand-solid-pressed | Color | {color.brand.700} | 눌렀을 때 |
| fg/neutral | Color | {color.gray.900} | 기본 텍스트 |
| fg/neutral-muted | Color | {color.gray.500} | 흐린 텍스트 |
| bg/brand-solid | Color | {color.brand.600} | 브랜드 배경 |
| bg/neutral | Color | {color.gray.50} | 기본 배경 |
| stroke/neutral | Color | {color.gray.300} | 기본 테두리 |

> 전체 리스트는 `tokens/semantic.json` 파일 참고

**Alias 연결 방법:**
1. 변수 생성 시 값 입력창에서 `{` 입력
2. 자동완성으로 Primitive 변수 검색
3. 해당 변수 선택 (예: `brand/600`)

---

## Text Styles 생성

Token Studio 플러그인을 사용하면 Typography 토큰이 **자동으로 Text Styles로 생성**됩니다.

수동으로 만들 경우 아래를 참고하세요.

### Scale Styles (30개)

| Style 이름 | Font Size | Line Height | Weight |
|-----------|----------|------------|--------|
| t1/regular | 10px | 16px | Regular |
| t1/medium | 10px | 16px | Medium |
| t1/bold | 10px | 16px | Bold |
| t2/regular | 11px | 16px | Regular |
| ... | ... | ... | ... |
| t10/bold | 32px | 40px | Bold |

### Semantic Styles (17개)

| Style 이름 | 참조 Scale | 용도 |
|-----------|----------|------|
| screenTitle | t10/bold | 화면 최상단 제목 |
| pageTitle | t9/bold | 페이지 제목 |
| sectionTitle | t8/bold | 섹션 제목 |
| heading | t7/bold | 소제목 |
| subheading | t6/medium | 부제목 |
| body | t6/regular | 기본 본문 |
| bodyEmphasis | t6/medium | 강조 본문 |
| bodyLarge | t7/regular | 큰 본문 |
| bodySmall | t5/regular | 작은 본문 |
| label | t5/medium | 라벨 |
| caption | t4/regular | 캡션/설명 |
| captionEmphasis | t4/medium | 강조 캡션 |
| footnote | t3/regular | 각주 |
| micro | t2/regular | 아주 작은 텍스트 |
| buttonLarge | t6/medium | 큰 버튼 텍스트 |
| buttonMedium | t5/medium | 중간 버튼 텍스트 |
| buttonSmall | t4/medium | 작은 버튼 텍스트 |

---

## 검증 체크리스트

### Color Variables

- [ ] **Primitive 컬러**: 60개 변수 (6 roles x 10 shades)
  - [ ] Gray: 50~900 (10개)
  - [ ] Brand: 50~900 (10개)
  - [ ] Positive: 50~900 (10개)
  - [ ] Warning: 50~900 (10개)
  - [ ] Critical: 50~900 (10개)
  - [ ] Informative: 50~900 (10개)

- [ ] **Semantic Foreground**: 30개 변수
- [ ] **Semantic Background**: 28개 변수
- [ ] **Semantic Stroke**: 20개 변수

### Typography

- [ ] **Base**: font-size t1~t10 (10개), line-height t1~t10 (10개), font-weight 3개
- [ ] **Scale Text Styles**: 30개 (10 scale x 3 weight)
- [ ] **Semantic Text Styles**: 17개

### Alias 연결 확인

- [ ] Semantic 변수가 Primitive를 올바르게 참조하는지 확인
  - 예: `fg/brand-solid` → `{color.brand.600}` → `#2563EB`
- [ ] Primitive 값 변경 시 Semantic도 자동 업데이트되는지 확인

---

## 문제 해결

### Q: Token Studio에서 토큰이 안 보여요

**A:**
1. JSON 파일 전체를 빠짐없이 복사했는지 확인
2. 플러그인 Settings에서 토큰 소스가 올바르게 설정되었는지 확인
3. 토큰 세트(primitive, semantic) 옆의 체크박스가 활성화되었는지 확인

### Q: Semantic 토큰의 색상이 안 나와요 (빈 값)

**A:** primitive 세트가 "source"로 활성화되어 있어야 합니다.
1. 플러그인에서 `primitive` 세트 체크
2. `semantic` 세트 체크
3. 참조 경로 확인: `{color.brand.600}` 형식

### Q: Typography Styles가 안 만들어져요

**A:** Token Studio에서 Export할 때 Typography 관련 옵션을 모두 체크했는지 확인하세요.
- 기본 폰트(`Inter`)가 Figma에 설치되어 있어야 합니다
- 다른 폰트를 쓰고 싶으면 `token-studio.json`의 `font-family.default` 값을 변경하세요

### Q: "Variables Import/Export" 플러그인은 안 되나요?

**A:** 해당 플러그인은 형식 호환 문제로 에러가 발생합니다 ("Something went wrong...").
Token Studio for Figma 플러그인을 사용해주세요.

---

## 파일 안내

| 파일 | 용도 |
|------|------|
| `figma/token-studio.json` | Token Studio 플러그인용 JSON (이 파일 사용) |
| `figma/variables.json` | (구) Variables Import/Export용 (사용하지 않음) |
| `tokens/primitives.json` | 개발용 Primitive 토큰 원본 |
| `tokens/semantic.json` | 개발용 Semantic 토큰 원본 |
| `tokens/typography.json` | 개발용 Typography 토큰 원본 |

---

## 다음 단계

Variables 생성 완료 후:
1. **컴포넌트에 적용**: 버튼, 카드 등에 Variables 적용
2. **다크모드 준비**: Token Studio에서 "Dark" 테마 추가
3. **Component Token 확장**: 컴포넌트별 토큰 추가

---

**문의사항이 있으면 프로젝트 README 또는 CLAUDE.md를 참고하세요!**
