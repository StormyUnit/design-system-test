# 작업 기록 (Work Log)

## 2026-02-06 (회사 컴퓨터)

### ✅ 완료 작업

**프로젝트 초기 설정 + Foundation Token 시스템 구축**

---

### 📂 생성된 파일 (7개)

#### 1. 토큰 JSON 파일 (3개)
- `tokens/primitives.json` - Color palette (60개) + Typography base (24개)
- `tokens/semantic.json` - 역할 기반 Color 토큰 (80개)
- `tokens/typography.json` - Typography scale (30개) + semantic (17개)

#### 2. Figma 적용 파일 (2개)
- `figma/variables.json` - Figma Variables import용 JSON (Plugin 사용)
- `figma/mapping.md` - 비개발자용 Figma 적용 가이드 (수동/Plugin 방법)

#### 3. 문서 (2개)
- `docs/token-system.md` - 토큰 시스템 설계 문서 (전체 구조, 네이밍 규칙, 확장 방법)
- `README.md` - 프로젝트 설명 전면 개편

---

### 📊 토큰 통계

**총 211개 디자인 토큰 생성**

#### Color Tokens (140개)
- **Primitive**: 60개
  - Gray: 10 shades
  - Brand: 10 shades
  - Positive: 10 shades
  - Warning: 10 shades
  - Critical: 10 shades
  - Informative: 10 shades

- **Semantic**: 80개
  - Foreground (fg): 30개
  - Background (bg): 28개
  - Stroke: 20개

#### Typography Tokens (71개)
- **Base**: 24개
  - Font Size: t1~t10 (10px~32px)
  - Line Height: t1~t10 (최적 행간)
  - Font Weight: regular, medium, bold
  - Font Family: default (시스템 폰트)

- **Scale**: 30개 (10 size × 3 weight)
  - t1.regular ~ t10.bold

- **Semantic**: 17개
  - screenTitle, pageTitle, sectionTitle, heading, subheading
  - body, bodyEmphasis, bodyLarge, bodySmall
  - label, caption, captionEmphasis, footnote, micro
  - buttonLarge, buttonMedium, buttonSmall

---

### 🎯 주요 설계 원칙

1. **Token Layer 구조**
   - Primitive → Semantic → Component (1차는 Primitive + Semantic)
   - 컴포넌트는 Primitive를 직접 참조하지 않고 Semantic을 참조

2. **Color 네이밍 규칙**
   - `color.{property}.{role}-{variant}(-{state})`
   - Property: fg, bg, stroke
   - Role: brand, neutral, positive, warning, critical, informative
   - Variant: solid, weak, muted, subtle, contrast, inverted
   - State: default, pressed

3. **Typography 네이밍 규칙**
   - Base: `font-size.t{n}`, `line-height.t{n}`, `font-weight.{weight}`
   - Scale: `typography.scale.t{n}.{weight}`
   - Semantic: `typography.semantic.{name}`

4. **확장 가능성**
   - 다크모드: Primitive 유지, Semantic에 Dark Mode 추가
   - Component Token: 새로운 Layer 추가
   - 추가 Foundation: Spacing, Shadow 등

---

### 🔧 기술 스택 & 참조

- **참조 규칙**: SEED Design System, 당근마켓 Foundation
- **형식**: Design Tokens Community Group format
- **Figma 연동**: Variables Import/Export Plugin 호환
- **버전 관리**: GitHub (StormyUnit/design-system-test)

---

### 📝 다음 단계 (집에서 할 일)

#### 1️⃣ Figma 적용
- [ ] `figma/mapping.md` 가이드 읽기
- [ ] Figma Variables Import/Export Plugin 설치
- [ ] `figma/variables.json` 파일로 Variables import
- [ ] 또는 수동으로 Variables 생성 (mapping.md 참고)

#### 2️⃣ Text Styles 생성
- [ ] 30개 Scale Text Styles 생성 (t1~t10 × regular/medium/bold)
- [ ] 17개 Semantic Text Styles 생성 (screenTitle, body 등)

#### 3️⃣ 검증
- [ ] Variables 개수 확인 (약 200개)
- [ ] Alias 연결 확인 (Semantic → Primitive)
- [ ] Text Styles 개수 확인 (30개 + 17개)

---

### 🔮 2차 목표 (추후 계획)

1. **다크모드 지원**
   - Collection에 "Dark" Mode 추가
   - Semantic Layer에 Dark 값 설정

2. **Component Token**
   - Button, Card, Input 등 컴포넌트별 토큰
   - Semantic을 참조하는 새로운 Layer

3. **Spacing System**
   - 4px 기반 여백 토큰
   - Padding, Margin, Gap

4. **Shadow System**
   - Elevation 기반 그림자
   - 컴포넌트별 매핑

---

### 💡 참고 사항

**파일 읽는 순서 (집에서):**
1. `README.md` - 전체 개요 파악
2. `figma/mapping.md` - Figma 적용 방법
3. `docs/token-system.md` - 깊은 이해 필요 시

**빠른 시작:**
```bash
# 집 컴퓨터에서
git clone https://github.com/StormyUnit/design-system-test.git
cd design-system-test
```

**Figma Plugin 링크:**
- https://www.figma.com/community/plugin/1396023896892891515

---

### 📌 커밋 정보

- **커밋 해시**: 6b41ee4
- **브랜치**: main
- **메시지**: `feat(foundation): add Color and Typography token system`
- **파일**: 7개 (새 파일 6개 + README.md 수정)

---

**작업자**: StormyUnit
**협업**: Claude Code (Anthropic)
**날짜**: 2026-02-06
**장소**: 회사 컴퓨터 → GitHub → 집 컴퓨터에서 이어서
