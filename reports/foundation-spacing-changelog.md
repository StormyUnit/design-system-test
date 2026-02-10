# Foundation Spacing Changelog

**작성일**: 2026-02-09
**변경 파일**: `figma/token-studio.json` (primitive 세트)

---

## 1. 요약

Foundation 레이어에 SEED 스타일의 **Dimension 스케일(2~64px, 32단계)**과 **Semantic Spacing 토큰(5개)**을 추가했습니다.
이를 통해 모든 컴포넌트가 동일한 간격 언어를 공유하게 됩니다.

---

## 2. 추가된 Dimension 스케일 (32개)

2px 단위의 정수 스텝 + half-step(0.5 단위)을 포함합니다.

| 토큰 | 값 | 토큰 | 값 | 토큰 | 값 | 토큰 | 값 |
|------|-----|------|-----|------|-----|------|-----|
| `dimension.x0_5` | 2px | `dimension.x4_5` | 18px | `dimension.x8_5` | 34px | `dimension.x12_5` | 50px |
| `dimension.x1` | 4px | `dimension.x5` | 20px | `dimension.x9` | 36px | `dimension.x13` | 52px |
| `dimension.x1_5` | 6px | `dimension.x5_5` | 22px | `dimension.x9_5` | 38px | `dimension.x13_5` | 54px |
| `dimension.x2` | 8px | `dimension.x6` | 24px | `dimension.x10` | 40px | `dimension.x14` | 56px |
| `dimension.x2_5` | 10px | `dimension.x6_5` | 26px | `dimension.x10_5` | 42px | `dimension.x14_5` | 58px |
| `dimension.x3` | 12px | `dimension.x7` | 28px | `dimension.x11` | 44px | `dimension.x15` | 60px |
| `dimension.x3_5` | 14px | `dimension.x7_5` | 30px | `dimension.x11_5` | 46px | `dimension.x15_5` | 62px |
| `dimension.x4` | 16px | `dimension.x8` | 32px | `dimension.x12` | 48px | `dimension.x16` | 64px |

### 명명 규칙
- `x{N}` = N × 4px (정수 스텝)
- `x{N}_5` = N × 4 + 2px (half-step)
- Token Studio type: `sizing`

---

## 3. 추가된 Semantic Spacing 토큰 (5개)

의미 기반 간격 토큰으로, 모두 dimension을 참조합니다.

| 토큰 | 참조 | 해석값 | 용도 |
|------|------|--------|------|
| `spacing.global-gutter` | `{dimension.x4}` | 16px | 화면 좌우 여백 |
| `spacing.between-text` | `{dimension.x1_5}` | 6px | 텍스트 간 간격 |
| `spacing.component-default` | `{dimension.x3}` | 12px | 컴포넌트 기본 간격 |
| `spacing.nav-to-title` | `{dimension.x5}` | 20px | 네비게이션 → 타이틀 간격 |
| `spacing.screen-bottom` | `{dimension.x14}` | 56px | 화면 하단 여백 |

### 설계 원칙
- Semantic spacing은 **dimension 참조만** 사용 (숫자 직접 입력 금지)
- 최소 개수만 우선 생성, 화면 만들며 필요할 때 추가

---

## 4. 버튼 컴포넌트 치환

버튼의 모든 크기/간격 값을 dimension 참조로 변경했습니다.
상세 내용은 `reports/button-dimension-migration-diff.md` 참고.

---

## 5. Figma 반영 방법

1. Token Studio에서 `figma/token-studio.json` 새로 불러오기 (Sync)
2. `primitive` 세트에 `dimension.*`, `spacing.*` 토큰이 추가됨을 확인
3. Export → Figma Variables로 내보내기
4. 컴포넌트 버튼의 속성이 dimension Variable로 연결되었는지 확인
