# Figma Variables 적용 가이드

이 문서는 비개발자가 디자인 토큰을 Figma Variables로 변환하는 방법을 단계별로 설명합니다.

---

## 📋 목차

1. [Figma Variables란?](#figma-variables란)
2. [적용 방법 선택](#적용-방법-선택)
3. [방법 1: Plugin 사용 (추천)](#방법-1-plugin-사용-추천)
4. [방법 2: 수동 생성](#방법-2-수동-생성)
5. [Text Styles 생성](#text-styles-생성)
6. [검증 체크리스트](#검증-체크리스트)

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

## 적용 방법 선택

### 방법 1: Plugin 사용 (추천) ⭐
- **소요 시간**: 5~10분
- **장점**: 빠르고 정확, 실수 적음
- **단점**: Plugin 설치 필요

### 방법 2: 수동 생성
- **소요 시간**: 30~60분
- **장점**: Plugin 없이 가능
- **단점**: 시간 소요, 실수 가능성

---

## 방법 1: Plugin 사용 (추천)

### Step 1: Plugin 설치

1. Figma에서 `Plugins` → `Find more plugins` 메뉴 열기
2. 검색창에 **"Variables Import Export"** 입력
3. Plugin 설치 후 실행

**추천 Plugin:**
- [Variables Import/Export](https://www.figma.com/community/plugin/1396023896892891515)
- [JSON to Figma Variables](https://www.figma.com/community/plugin/1254733946670972122)

---

### Step 2: JSON 파일 준비

1. 프로젝트 폴더에서 `figma/variables.json` 파일 열기
2. 전체 내용 복사 (`Cmd+A` → `Cmd+C`)

---

### Step 3: Plugin으로 Import

1. Figma에서 Plugin 실행
2. "Import from JSON" 또는 "Paste JSON" 선택
3. 복사한 내용 붙여넣기
4. "Import" 버튼 클릭

**결과:**
- 5개 Collection 자동 생성
- 약 200개 Variables 자동 생성
- Alias(참조) 자동 연결

---

### Step 4: 확인

Figma 왼쪽 패널에서 `Local variables` 클릭하여 아래 Collection이 생성되었는지 확인:

- ✅ Foundation/Color/Primitive
- ✅ Foundation/Color/Semantic-Foreground
- ✅ Foundation/Color/Semantic-Background
- ✅ Foundation/Color/Semantic-Stroke
- ✅ Foundation/Typography/Base

---

## 방법 2: 수동 생성

Plugin 없이 직접 생성하는 방법입니다.

### Step 1: Local Variables 패널 열기

1. Figma 왼쪽 패널에서 `Local variables` 클릭
2. 우측 상단 `+` 버튼 클릭

---

### Step 2: Collection 생성

#### Collection 1: Foundation/Color/Primitive

1. Collection 이름: `Foundation/Color/Primitive`
2. Mode: `Light` (기본값)
3. Variables 생성:

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
- positive (초록 계열)
- warning (주황 계열)
- critical (빨강 계열)
- informative (파랑 계열)

💡 **팁**: 각 role의 색상값은 `tokens/primitives.json` 파일 참고

---

#### Collection 2: Foundation/Color/Semantic-Foreground

1. Collection 이름: `Foundation/Color/Semantic-Foreground`
2. Mode: `Light`
3. Variables 생성 (예시):

| 변수명 | Type | 값 (Alias) | 설명 |
|--------|------|-----------|------|
| fg/brand-solid | Color | {brand/600} | 브랜드 텍스트 |
| fg/brand-solid-pressed | Color | {brand/700} | 눌렀을 때 |
| fg/neutral | Color | {gray/900} | 기본 텍스트 |
| fg/neutral-muted | Color | {gray/500} | 흐린 텍스트 |

**Alias 연결 방법:**
1. 변수 생성 시 값 입력창에서 `{` 입력
2. 자동완성으로 Primitive 변수 검색
3. 해당 변수 선택 (예: `brand/600`)

💡 **팁**: 전체 리스트는 `tokens/semantic.json` 파일 참고

---

#### Collection 3: Foundation/Color/Semantic-Background

Collection 2와 동일한 방식으로 생성하되, 변수명을 `bg/`로 시작합니다.

**주요 변수 예시:**
- bg/brand-solid → {brand/600}
- bg/neutral → {gray/50}
- bg/positive-weak → {positive/100}

---

#### Collection 4: Foundation/Color/Semantic-Stroke

Collection 2와 동일한 방식으로 생성하되, 변수명을 `stroke/`로 시작합니다.

**주요 변수 예시:**
- stroke/brand-solid → {brand/600}
- stroke/neutral → {gray/300}

---

#### Collection 5: Foundation/Typography/Base

1. Collection 이름: `Foundation/Typography/Base`
2. Mode: `Light`
3. Variables 생성:

**Font Size (10개)**
| 변수명 | Type | 값 |
|--------|------|-----|
| font-size/t1 | Number | 10 |
| font-size/t2 | Number | 11 |
| font-size/t3 | Number | 12 |
| font-size/t4 | Number | 14 |
| font-size/t5 | Number | 15 |
| font-size/t6 | Number | 16 |
| font-size/t7 | Number | 18 |
| font-size/t8 | Number | 20 |
| font-size/t9 | Number | 24 |
| font-size/t10 | Number | 32 |

**Line Height (10개)**
| 변수명 | Type | 값 |
|--------|------|-----|
| line-height/t1 | Number | 16 |
| line-height/t2 | Number | 16 |
| line-height/t3 | Number | 18 |
| line-height/t4 | Number | 20 |
| line-height/t5 | Number | 22 |
| line-height/t6 | Number | 24 |
| line-height/t7 | Number | 28 |
| line-height/t8 | Number | 32 |
| line-height/t9 | Number | 32 |
| line-height/t10 | Number | 40 |

**Font Weight (3개)**
| 변수명 | Type | 값 |
|--------|------|-----|
| font-weight/regular | Number | 400 |
| font-weight/medium | Number | 500 |
| font-weight/bold | Number | 700 |

---

## Text Styles 생성

Typography Variables를 조합하여 Text Styles를 만듭니다.

### Step 1: Text Styles 패널 열기

1. Figma 왼쪽 패널에서 `Local styles` 클릭
2. `Text` 탭 선택
3. `+` 버튼 클릭

---

### Step 2: Scale Styles 생성 (30개)

**예시: t6/regular 생성**

1. Style 이름: `Foundation/Typography/Scale/t6/regular`
2. 속성 설정:
   - Font family: System default (또는 원하는 폰트)
   - Font size: `{font-size/t6}` (Variables 연결)
   - Line height: `{line-height/t6}` (Variables 연결)
   - Font weight: `{font-weight/regular}` (Variables 연결)
3. "Create style" 클릭

**반복:**
- t1.regular, t1.medium, t1.bold
- t2.regular, t2.medium, t2.bold
- ...
- t10.regular, t10.medium, t10.bold

💡 **팁**: 10개 scale × 3개 weight = 30개 스타일

---

### Step 3: Semantic Styles 생성 (선택적)

의미 있는 이름으로 Scale Styles를 참조합니다.

**예시:**

| Style 이름 | 참조 |
|-----------|------|
| Foundation/Typography/Semantic/screenTitle | t10.bold |
| Foundation/Typography/Semantic/body | t6.regular |
| Foundation/Typography/Semantic/caption | t4.regular |

💡 **팁**: 전체 리스트는 `tokens/typography.json` > `semantic` 섹션 참고

---

## 검증 체크리스트

모든 작업 완료 후 아래 항목을 확인하세요.

### Color Variables

- [ ] **Primitive Collection**: 60개 변수 (6 roles × 10 shades)
  - [ ] Gray: 50~900 (10개)
  - [ ] Brand: 50~900 (10개)
  - [ ] Positive: 50~900 (10개)
  - [ ] Warning: 50~900 (10개)
  - [ ] Critical: 50~900 (10개)
  - [ ] Informative: 50~900 (10개)

- [ ] **Semantic Foreground**: 약 30개 변수
  - [ ] brand-solid, brand-solid-pressed, brand-weak, brand-muted, brand-contrast
  - [ ] neutral, neutral-weak, neutral-muted, neutral-subtle, neutral-inverted
  - [ ] 나머지 4개 role 동일 구조

- [ ] **Semantic Background**: 약 25개 변수
  - [ ] brand-solid, brand-solid-pressed, brand-weak, brand-subtle, brand-inverted
  - [ ] neutral, neutral-solid, neutral-weak, neutral-muted, neutral-inverted
  - [ ] 나머지 role 동일 구조

- [ ] **Semantic Stroke**: 약 20개 변수
  - [ ] brand-solid, brand-solid-pressed, brand-weak
  - [ ] neutral, neutral-weak, neutral-muted
  - [ ] 나머지 role 동일 구조

### Typography Variables

- [ ] **Base Collection**: 24개 변수
  - [ ] font-size: t1~t10 (10개)
  - [ ] line-height: t1~t10 (10개)
  - [ ] font-weight: regular, medium, bold (3개)
  - [ ] font-family: default (1개)

### Text Styles

- [ ] **Scale Styles**: 30개
  - [ ] t1: regular, medium, bold (3개)
  - [ ] t2~t10 동일 (27개)

- [ ] **Semantic Styles** (선택): 10~17개
  - [ ] screenTitle, body, caption 등

### Alias 연결 확인

- [ ] Semantic 변수들이 Primitive 변수를 올바르게 참조하는지 확인
  - 예: `fg/brand-solid` → `{brand/600}`
- [ ] Text Styles가 Typography Variables를 올바르게 참조하는지 확인

### 동작 테스트

1. [ ] Primitive 변수 값 변경 시 Semantic 변수도 자동 업데이트되는지 확인
2. [ ] 텍스트에 Text Style 적용 후, Variable 값 변경 시 자동 반영되는지 확인
3. [ ] 색상 변수를 Shape/Text에 적용하여 정상 작동하는지 확인

---

## 문제 해결

### Q: Plugin으로 import 시 에러가 나요

**A:** JSON 형식 문제일 수 있습니다.
1. `figma/variables.json` 파일의 전체 내용을 복사했는지 확인
2. Plugin이 최신 버전인지 확인
3. 다른 Plugin 시도: "JSON to Figma Variables"

### Q: Alias 연결이 안 돼요

**A:** 참조하는 변수가 먼저 생성되어야 합니다.
1. Primitive Collection 먼저 완성
2. 그 다음 Semantic Collection 생성
3. Alias 입력 시 `{변수명}` 형식 사용

### Q: Text Styles에 Variables 연결이 안 돼요

**A:** Figma 버전 확인이 필요합니다.
1. Figma Desktop 최신 버전 사용
2. Text properties에서 Variables 아이콘 클릭
3. 해당 Variable 검색 후 연결

---

## 다음 단계

✅ Variables 생성 완료 후:
1. **컴포넌트에 적용**: 버튼, 카드 등에 Variables 적용
2. **다크모드 준비**: Collection에 "Dark" Mode 추가
3. **Component Token 확장**: 컴포넌트별 토큰 추가

---

## 참고 자료

- [Figma Variables 공식 문서](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Variables Import/Export Plugin](https://www.figma.com/community/plugin/1396023896892891515)
- 프로젝트 토큰 파일:
  - `tokens/primitives.json`
  - `tokens/semantic.json`
  - `tokens/typography.json`

---

**문의사항이 있으면 프로젝트 README 또는 CLAUDE.md를 참고하세요!**
