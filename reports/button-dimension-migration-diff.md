# Button Dimension Migration Diff

**작성일**: 2026-02-09
**대상 파일**: `tokens/components/button.component.json`, `figma/variables.import.components.button.json`

---

## 1. 요약

버튼 컴포넌트의 모든 크기/간격 값을 **숫자 직접 입력 → dimension 토큰 참조**로 변경했습니다.
**UI 결과값은 동일합니다** (같은 px 값으로 해석됨).

---

## 2. 변경 전후 비교 (Size 토큰)

### XS (28px)

| 속성 | 변경 전 | 변경 후 | 해석값 | UI 변경 |
|------|--------|--------|--------|---------|
| height | `28px` | `{dimension.x7}` | 28px | 없음 |
| paddingX | `10px` | `{dimension.x2_5}` | 10px | 없음 |
| paddingY | `4px` | `{dimension.x1}` | 4px | 없음 |
| iconSize | `14px` | `{dimension.x3_5}` | 14px | 없음 |
| iconGap | `4px` | `{dimension.x1}` | 4px | 없음 |
| radius | `{radius.r2}` | `{radius.r2}` | 8px | 변경 없음 |
| typography | `{typography.button.b5}` | `{typography.button.b5}` | 11px/M | 변경 없음 |

### S (32px)

| 속성 | 변경 전 | 변경 후 | 해석값 | UI 변경 |
|------|--------|--------|--------|---------|
| height | `32px` | `{dimension.x8}` | 32px | 없음 |
| paddingX | `12px` | `{dimension.x3}` | 12px | 없음 |
| paddingY | `6px` | `{dimension.x1_5}` | 6px | 없음 |
| iconSize | `16px` | `{dimension.x4}` | 16px | 없음 |
| iconGap | `4px` | `{dimension.x1}` | 4px | 없음 |
| radius | `{radius.r2_5}` | `{radius.r2_5}` | 10px | 변경 없음 |
| typography | `{typography.button.b4}` | `{typography.button.b4}` | 13px/M | 변경 없음 |

### M (40px)

| 속성 | 변경 전 | 변경 후 | 해석값 | UI 변경 |
|------|--------|--------|--------|---------|
| height | `40px` | `{dimension.x10}` | 40px | 없음 |
| paddingX | `16px` | `{dimension.x4}` | 16px | 없음 |
| paddingY | `10px` | `{dimension.x2_5}` | 10px | 없음 |
| iconSize | `18px` | `{dimension.x4_5}` | 18px | 없음 |
| iconGap | `6px` | `{dimension.x1_5}` | 6px | 없음 |
| radius | `{radius.r3}` | `{radius.r3}` | 12px | 변경 없음 |
| typography | `{typography.button.b3}` | `{typography.button.b3}` | 15px/M | 변경 없음 |

### L (48px)

| 속성 | 변경 전 | 변경 후 | 해석값 | UI 변경 |
|------|--------|--------|--------|---------|
| height | `48px` | `{dimension.x12}` | 48px | 없음 |
| paddingX | `20px` | `{dimension.x5}` | 20px | 없음 |
| paddingY | `12px` | `{dimension.x3}` | 12px | 없음 |
| iconSize | `20px` | `{dimension.x5}` | 20px | 없음 |
| iconGap | `6px` | `{dimension.x1_5}` | 6px | 없음 |
| radius | `{radius.r3}` | `{radius.r3}` | 12px | 변경 없음 |
| typography | `{typography.button.b2}` | `{typography.button.b2}` | 17px/M | 변경 없음 |

### XL (56px)

| 속성 | 변경 전 | 변경 후 | 해석값 | UI 변경 |
|------|--------|--------|--------|---------|
| height | `56px` | `{dimension.x14}` | 56px | 없음 |
| paddingX | `24px` | `{dimension.x6}` | 24px | 없음 |
| paddingY | `14px` | `{dimension.x3_5}` | 14px | 없음 |
| iconSize | `22px` | `{dimension.x5_5}` | 22px | 없음 |
| iconGap | `8px` | `{dimension.x2}` | 8px | 없음 |
| radius | `{radius.r3_5}` | `{radius.r3_5}` | 14px | 변경 없음 |
| typography | `{typography.button.b1}` | `{typography.button.b1}` | 19px/M | 변경 없음 |

---

## 3. 결론

- **모든 25개 size 속성**이 dimension 참조로 치환됨 (radius, typography 제외 — 이미 참조)
- **UI 변경: 0건** — 해석되는 최종 px 값이 모두 동일
- **별도 icon-size 스케일 불필요** — 모든 아이콘 크기가 dimension 스케일에 존재 (14/16/18/20/22px)
- Variant × State 컬러 토큰은 이번 변경에 포함되지 않음 (이미 semantic 참조)

---

## 4. Figma 검증 체크리스트

- [ ] XS~XL 버튼의 높이가 이전과 동일한가? (28/32/40/48/56)
- [ ] 좌우 패딩이 이전과 동일한가?
- [ ] 아이콘 크기/간격이 이전과 동일한가?
- [ ] Token Studio에서 dimension 참조가 올바르게 해석되는가?
- [ ] Figma Variables 패널에서 dimension.* 변수가 보이는가?
