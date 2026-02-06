# Design System Test

SEED/당근 Foundation 규칙을 따르는 디자인 토큰 시스템 (1차: Color + Typography)

## 📖 프로젝트 개요

이 프로젝트는 **Claude Code**가 생성한 디자인 토큰을 **Figma Variables**로 반영하기 위한 Foundation Layer 구현입니다.

**1차 목표:**
- Color Token 시스템 (Primitive + Semantic)
- Typography Token 시스템 (Base + Scale + Semantic)
- Figma Variables 적용 가능한 JSON 파일
- 비개발자용 Figma 적용 가이드

**참조 규칙:**
- SEED Design System
- 당근마켓 Foundation
- Token Layer 구조 (Primitive → Semantic → Component)

---

## 🎨 구현 범위

### Color Tokens
- **Primitive**: 60개 색상 (6 roles × 10 shades)
  - Gray, Brand, Positive, Warning, Critical, Informative
- **Semantic**: 80개 역할 기반 토큰
  - Foreground (fg): 텍스트/아이콘
  - Background (bg): 배경
  - Stroke: 테두리

### Typography Tokens
- **Base**: 24개 기본 토큰
  - Font Size: t1~t10 (10px~32px)
  - Line Height: 최적 행간
  - Font Weight: regular, medium, bold
- **Scale**: 30개 조합 (10 size × 3 weight)
- **Semantic**: 17개 의미 기반 스타일
  - screenTitle, body, caption 등

---

## 📂 프로젝트 구조

```
design-system-test/
├── CLAUDE.md                  # 프로젝트 협업 가이드
├── README.md                  # 이 문서
├── tokens/                    # 디자인 토큰 JSON 파일
│   ├── primitives.json        # 원시값 (hex, rem, number)
│   ├── semantic.json          # 역할 기반 Color 토큰
│   └── typography.json        # Typography 토큰 (전체)
├── figma/                     # Figma 적용 파일
│   ├── variables.json         # Figma Variables import용 JSON
│   └── mapping.md             # Figma 적용 가이드 (비개발자용)
└── docs/                      # 설계 문서
    └── token-system.md        # 토큰 시스템 설계 문서
```

---

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/StormyUnit/design-system-test.git
cd design-system-test
```

### 2. Figma에 적용

**방법 1: Plugin 사용 (추천)**
1. Figma에서 "Variables Import/Export" Plugin 설치
2. `figma/variables.json` 파일 내용 복사
3. Plugin에서 Import 실행

**방법 2: 수동 생성**
1. [`figma/mapping.md`](figma/mapping.md) 가이드 참고
2. Figma Local Variables 패널에서 수동 생성
3. 단계별 체크리스트 따라 진행

---

## 📚 문서

### 비개발자용
- **[Figma 적용 가이드](figma/mapping.md)** - Figma Variables 생성 방법 (Plugin / 수동)

### 개발자용
- **[토큰 시스템 설계](docs/token-system.md)** - 전체 구조, 네이밍 규칙, 확장 방법

### 토큰 파일
- **[primitives.json](tokens/primitives.json)** - Color palette + Typography base
- **[semantic.json](tokens/semantic.json)** - 역할 기반 Color 토큰
- **[typography.json](tokens/typography.json)** - Typography scale + semantic

---

## 🎯 사용 예시

### Figma에서 사용

**Color 적용:**
```
버튼 배경: {bg/brand-solid}
버튼 텍스트: {fg/brand-contrast}
구분선: {stroke/neutral}
```

**Typography 적용:**
```
화면 제목: Foundation/Typography/Semantic/screenTitle
본문: Foundation/Typography/Semantic/body
캡션: Foundation/Typography/Semantic/caption
```

### 코드에서 사용 (CSS)

```css
/* Semantic 토큰 참조 */
.button-primary {
  background-color: var(--color-bg-brand-solid);
  color: var(--color-fg-brand-contrast);
  font-size: var(--font-size-t6);
  font-weight: var(--font-weight-medium);
}
```

---

## ✅ 완료 체크리스트

### 토큰 생성
- [x] Primitive Color (60개)
- [x] Semantic Color (80개)
- [x] Typography Base (24개)
- [x] Typography Scale (30개)
- [x] Typography Semantic (17개)

### 파일 생성
- [x] tokens/primitives.json
- [x] tokens/semantic.json
- [x] tokens/typography.json
- [x] figma/variables.json
- [x] figma/mapping.md
- [x] docs/token-system.md

### Figma 적용 (당신이 할 일)
- [ ] Figma Variables 생성
- [ ] Text Styles 생성
- [ ] 컴포넌트에 적용

---

## 🔮 다음 단계 (2차 목표)

1. **다크모드 지원**
   - Primitive 유지, Semantic에 Dark Mode 추가
   - Collection에 "Dark" Mode 생성

2. **Component Token**
   - 버튼, 카드, 입력 등 컴포넌트별 토큰
   - Semantic을 참조하는 새로운 Layer

3. **간격(Spacing) 시스템**
   - Padding, Margin, Gap 토큰
   - 4px 기반 Scale

4. **그림자(Shadow) 시스템**
   - Elevation 단계별 Shadow
   - 컴포넌트별 Shadow 매핑

---

## 🤝 협업 방식

- **기획**: GPT로 진행
- **코드**: Claude Code로 구현
- **협업 규칙**: [CLAUDE.md](CLAUDE.md) 참고

---

## 📞 문의 및 이슈

- GitHub Issues: [프로젝트 이슈 페이지](https://github.com/StormyUnit/design-system-test/issues)
- 협업 가이드: [CLAUDE.md](CLAUDE.md)

---

## 📄 라이선스

MIT License (또는 원하는 라이선스 추가)

---

**만든 사람**: StormyUnit
**협업**: Claude Code (Anthropic)
**참조**: SEED Design System, 당근 Foundation
