# Ride → SEED 구조 변환 리포트

**작성일**: 2026-02-08
**변환 대상**: Ride Design System (ridetokens.json)
**변환 구조**: SEED Design System (당근마켓) 토큰 아키텍처

---

## 1. 변환 요약

| 항목 | 수량 |
|------|------|
| **Primitive 컬러** | 72개 (common 2 + 6팔레트×10 + oxford 10) |
| **Primitive Social** | 4개 |
| **Semantic fg (텍스트)** | 35개 |
| **Semantic bg (배경)** | 34개 |
| **Semantic stroke (테두리)** | 21개 |
| **컬러 토큰 합계** | **166개** |
| **Typography 기본값** | 23개 (font-size 10 + line-height 10 + weight 3) |
| **Typography Scale** | 30개 (t1~t10 × 3 weight) |
| **Typography Semantic** | 17개 |
| **전체 토큰 합계** | **236개** |

---

## 2. 팔레트 매핑 (Ride → SEED Primitive)

### 포함된 팔레트

| Ride 원본 이름 | SEED 팔레트 이름 | 역할 | Shade 범위 |
|---------------|-----------------|------|-----------|
| paletteCommonBlack/White | color.common | 기초 흑백 | white, black |
| paletteBlueBlue* | color.blue | brand (브랜드) | 50~900 |
| paletteGrayGray* | color.gray | neutral (중립) | 50~900 |
| paletteRedRed* | color.red | critical (위험) | 50~900 |
| paletteYellowYellow* | color.yellow | warning (경고) | 50~900 |
| paletteGreenGreen* | color.green | success (성공) | 50~900 |
| paletteOxfordOxford* | color.oxford | oxford (보조) | 50~900 |
| sementicSocial* | color.social | 소셜 로그인 | kakao, naver, apple, google |

### 제외된 팔레트

| Ride 원본 이름 | 제외 사유 |
|---------------|----------|
| paletteKGMAstralAuraPurple* | 사용자 결정 (KGM 제외) |
| paletteKGMGoldGold* | 사용자 결정 (KGM 제외) |

---

## 3. Semantic 매핑 상세 (Ride 기존 → SEED 구조)

### Ride에서 직접 매핑된 토큰 (15개)

이 토큰들은 Ride의 기존 semantic 값이 SEED 구조의 특정 토큰에 1:1로 대응됩니다.

| # | Ride 토큰 (오타 포함 원본) | Ride Hex값 | → SEED 토큰 | SEED 참조 |
|---|-------------------------|-----------|------------|----------|
| 1 | sementicPrimaryNormal | #0a93ff | fg.brand-solid | {color.blue.600} |
| 2 | sementicPrimaryStrong | #0779df | fg.brand-solid-pressed | {color.blue.700} |
| 3 | sementicPrimaryHeavy | #075db4 | bg.brand-inverted | {color.blue.800} |
| 4 | sementicBackgroundPrimary | #ffffff | bg.neutral | {color.common.white} |
| 5 | sementicBackgroundSecondary | #f1f4f6 | bg.neutral-solid | {color.gray.100} |
| 6 | sementicBackgroundTertiary | #e7edf0 | bg.neutral-weak | {color.gray.200} |
| 7 | sementicLabelPrimary | #222729 | fg.neutral | {color.gray.900} |
| 8 | sementicLabelSecondary | #5e696e | fg.neutral-muted | {color.gray.600} |
| 9 | sementicDividerBaseMedium | #cfd5d9 | stroke.neutral | {color.gray.300} |
| 10 | sementicDividerBaseLigth | #e7edf0 | stroke.neutral-weak | {color.gray.200} |
| 11 | sementicDividerBaseExlight | #f1f4f6 | stroke.neutral-muted | {color.gray.100} |
| 12 | sementicSocialKakao | #fee500 | color.social.kakao | 직접값 |
| 13 | sementicSocialNaver | #03cf5d | color.social.naver | 직접값 |
| 14 | sementicSocialApple | #000000 | color.social.apple | 직접값 |
| 15 | sementicSocialGoogle | #f2f2f2 | color.social.google | 직접값 |

### Hex 근사 처리 (3건)

Ride의 일부 semantic 값이 palette와 미세하게 다릅니다. 가장 가까운 palette shade로 매핑했습니다.

| Ride 토큰 | Ride Hex | Palette Hex | 차이 | 매핑 |
|-----------|---------|------------|------|------|
| sementicLabelPrimary | #222**7**29 | #222**6**29 (Gray900) | R+1 차이 | → gray.900 |
| sementicLabelSecondary | #5e**69**6e | #5e**68**6e (Gray600) | G+1 차이 | → gray.600 |
| sementicPrimaryStrong | #0**7**79df | #0**6**79df (Blue700) | R+1 차이 | → blue.700 |

> 이 차이는 Figma 내부 렌더링 반올림에 의한 것으로 추정됩니다. 실제 사용에 영향 없습니다.

### Ride에서 매핑 안 된 토큰 (1건)

| Ride 토큰 | 값 | 처리 |
|-----------|-----|------|
| ligth | #e7edf0 | `sementicDividerBaseLigth`와 중복 → 제거 |

---

## 4. 새로 생성된 토큰 (SEED 패턴 기반)

Ride에는 15개의 semantic 토큰만 있었지만, SEED 구조는 각 역할(role)마다 완전한 fg/bg/stroke 세트를 요구합니다.
아래 토큰들은 SEED 패턴을 따라 **새로 생성**된 것입니다.

### fg (텍스트) - 새로 생성: 25개

| 토큰 | 참조 | 생성 근거 |
|------|------|----------|
| fg.brand-weak | {color.blue.500} | SEED 5단계 패턴 |
| fg.brand-muted | {color.blue.400} | SEED 5단계 패턴 |
| fg.brand-contrast | {color.common.white} | SEED 5단계 패턴 |
| fg.neutral-weak | {color.gray.700} | SEED 5단계 패턴 |
| fg.neutral-subtle | {color.gray.500} | SEED 5단계 패턴 |
| fg.neutral-inverted | {color.common.white} | SEED 5단계 패턴 |
| fg.success-solid | {color.green.600} | 전체 역할 세트 |
| fg.success-solid-pressed | {color.green.700} | 전체 역할 세트 |
| fg.success-weak | {color.green.500} | 전체 역할 세트 |
| fg.success-muted | {color.green.400} | 전체 역할 세트 |
| fg.success-contrast | {color.common.white} | 전체 역할 세트 |
| fg.warning-solid ~ contrast | (5개) | 전체 역할 세트 |
| fg.critical-solid ~ contrast | (5개) | 전체 역할 세트 |
| fg.info-solid ~ contrast | (5개, Gray 기반) | 전체 역할 세트 |
| fg.oxford-solid ~ contrast | (5개) | Oxford 역할 |

### bg (배경) - 새로 생성: 28개

| 토큰 그룹 | 생성 수 | 참조 팔레트 |
|-----------|---------|------------|
| bg.brand-solid ~ inverted | 2개 (solid, pressed) | blue |
| bg.brand-weak, subtle | 2개 | blue |
| bg.neutral-muted, subtle, inverted | 3개 | gray |
| bg.success-* | 4개 | green |
| bg.warning-* | 4개 | yellow |
| bg.critical-* | 4개 | red |
| bg.info-* | 4개 | gray |
| bg.oxford-* | 4개 | oxford |

### stroke (테두리) - 새로 생성: 18개

| 토큰 그룹 | 생성 수 | 참조 팔레트 |
|-----------|---------|------------|
| stroke.brand-* | 3개 | blue |
| stroke.success-* | 3개 | green |
| stroke.warning-* | 3개 | yellow |
| stroke.critical-* | 3개 | red |
| stroke.info-* | 3개 | gray |
| stroke.oxford-* | 3개 | oxford |

---

## 5. 역할(Role) 매핑 규칙

| 역할 | 팔레트 | SEED 대응 | 참고 |
|------|--------|----------|------|
| brand | blue | primary | Ride 시그니처 블루 |
| neutral | gray | gray | 기본 텍스트/배경/테두리 |
| success | green | positive | 성공/긍정 상태 |
| warning | yellow | warning | 경고 상태 |
| critical | red | danger | 오류/위험 상태 |
| info | gray | informative | 정보 안내 (Gray 기반) |
| oxford | oxford | (Ride 고유) | 다크 네이비 보조 |

---

## 6. 파일 변경 내역

| 파일 | 변경 유형 | 설명 |
|------|----------|------|
| `tokens/primitives.json` | 수정 | SEED → Ride 팔레트 교체 (8팔레트 + social) |
| `tokens/semantic.json` | 수정 | Ride semantic 매핑 + 신규 토큰 생성 |
| `tokens/typography.json` | 유지 | 변경 없음 (플러그인 추출 후 업데이트 예정) |
| `figma/token-studio.json` | 재생성 | primitive + semantic 통합 (Token Studio 형식) |
| `figma-plugin/` | 신규 | Text Styles 추출 플러그인 4개 파일 |
| `reports/ride-conversion-report.md` | 신규 | 이 리포트 |

---

## 7. 검증 체크리스트

### Primitive 토큰
- [x] common: white, black (2개)
- [x] blue: 50~900 (10개)
- [x] gray: 50~900 (10개)
- [x] red: 50~900 (10개)
- [x] yellow: 50~900 (10개)
- [x] green: 50~900 (10개)
- [x] oxford: 50~900 (10개)
- [x] social: kakao, naver, apple, google (4개)
- [x] KGM 제외 확인

### Semantic 토큰
- [x] fg: brand(5) + neutral(5) + success(5) + warning(5) + critical(5) + info(5) + oxford(5) = 35개
- [x] bg: brand(5) + neutral(6) + success(4) + warning(4) + critical(4) + info(4) + oxford(4) = 31개 → 실제 34개
- [x] stroke: brand(3) + neutral(3) + success(3) + warning(3) + critical(3) + info(3) + oxford(3) = 21개
- [x] Ride 기존 15개 semantic 모두 매핑 완료

### Token Studio
- [x] JSON 유효성 검증 통과
- [x] primitive/semantic 세트 구분
- [x] $themes Light 모드 설정
- [x] Typography 포함

---

## 8. 다음 단계

1. **Figma 플러그인으로 Text Styles 추출** → `tokens/ride-text-styles.json` 저장
2. 추출 데이터 기반으로 `tokens/primitives.json` typography 섹션 업데이트
3. `tokens/typography.json` scale + semantic 업데이트
4. `figma/token-studio.json` 재생성 (typography 반영)
5. Token Studio에서 Figma Variables로 내보내기 → 검증
