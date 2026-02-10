# Spacing (간격 규칙)

**작성일**: 2026-02-09
**정책**: 3단계 안정성 우선, 16px 고정

---

## 1. 원칙

3단계(견적기 챗봇 화면)에서는 spacing semantic을 복잡하게 나누지 않는다.
**기본값 16px(`dimension.x4`)로 고정**하고, 예외가 필요하면 사유를 문서/코드에 남긴다.

---

## 2. Semantic Spacing 토큰

| 토큰 | 참조 | 해석값 | 용도 |
|------|------|--------|------|
| `spacing.default` | `{dimension.x4}` | 16px | 모든 기본 간격 |
| `spacing.gutterX` | `{dimension.x4}` | 16px | 화면 좌우 여백 |
| `spacing.gutterY` | `{dimension.x4}` | 16px | 화면 상하 여백 |

> 3개 모두 같은 16px이지만, 의미를 분리해두어 추후 독립 조정 가능.

---

## 3. 적용 규칙

### 기본 (항상 16px)
| 사용처 | 토큰 |
|--------|------|
| 화면 좌우 여백 | `spacing.gutterX` |
| 화면 상하 여백 | `spacing.gutterY` |
| 섹션 간 간격 | `spacing.default` |
| 카드 내부 패딩 | `spacing.default` |
| 리스트 아이템 간 간격 | `spacing.default` |
| 메시지 간 간격 | `spacing.default` |

### 예외 허용 (사유 필수)
| 예외 | 사유 | 사용할 값 |
|------|------|----------|
| BottomActionBar 내부 | 전용 스펙 확정 (8px/20px) | 컴포넌트 토큰 사용 |
| SegmentedControl 내부 | 전용 스펙 확정 (4px/12px) | 컴포넌트 토큰 사용 |
| 버튼 내부 패딩 | 버튼 size 토큰 사용 | 컴포넌트 토큰 사용 |
| 아이콘-텍스트 간격 | iconography 규칙 (4px) | `dimension.x1` |

---

## 4. 금지 사항

- 임의 간격값 사용 금지 (예: `margin: 13px`)
- spacing semantic을 우회하여 dimension 직접 참조 금지 (컴포넌트 내부 제외)
- 예외 사용 시 사유 없이 적용 금지

---

## 5. CSS 변수 참조

```css
var(--spacing-default)    /* 16px */
var(--spacing-gutterX)    /* 16px */
var(--spacing-gutterY)    /* 16px */
```

---

## 6. 코드 예시

```tsx
// 화면 좌우 여백
<div style={{ paddingLeft: 'var(--spacing-gutterX)', paddingRight: 'var(--spacing-gutterX)' }}>

// 섹션 간 간격
<div style={{ marginBottom: 'var(--spacing-default)' }}>

// 카드 내부 패딩
<div style={{ padding: 'var(--spacing-default)' }}>
```
