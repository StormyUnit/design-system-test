# Skeleton (로딩 스켈레톤)

**작성일**: 2026-02-09
**정책**: gray 기반(semantic neutral)으로 임의값 구성

---

## 1. 개요

로딩/대기 상태에서 컨텐츠 영역을 미리 보여주는 placeholder UI.
실제 컨텐츠의 레이아웃을 미리 암시하여 사용자 체감 로딩 시간을 줄인다.

---

## 2. 토큰

| 토큰 | 참조 | 해석값 | 용도 |
|------|------|--------|------|
| `skeleton.bg` | `{color.gray.100}` | #f1f4f6 | 스켈레톤 기본 배경 |
| `skeleton.shimmer` | `{color.gray.200}` | #e7edf0 | 시머 애니메이션 하이라이트 |
| `skeleton.radius` | `{radius.r2}` | 8px | 기본 라운딩 |

---

## 3. Height Presets (임의값)

| Preset | 높이 | 참고 |
|--------|------|------|
| `textLine` | 14px | body 텍스트 1줄 |
| `avatar` | 40px | Avatar M 크기 |
| `button` | 48px | Button L 높이 |
| `card` | 120px | 카드 컨텐츠 영역 |

> 이 값들은 임의값이며 reports/non-dimension-values.md에 기록.

---

## 4. 시머 애니메이션

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--skeleton-bg) 25%,
    var(--skeleton-shimmer) 50%,
    var(--skeleton-bg) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
```

- 속도: 1.5초 (과하지 않게)
- 방향: 좌→우 수평 이동
- 성능: `will-change: background-position` 또는 GPU 레이어 활용

---

## 5. 사용 규칙

### DO
- 컨텐츠 로딩 중: 실제 레이아웃과 유사한 형태로 배치
- 텍스트: 2~3줄, 마지막 줄은 짧게 (60~80%)
- 아바타: 원형 (`border-radius: 50%`)
- 카드: 직사각형 + `skeleton.radius`

### DON'T
- 스켈레톤에 텍스트/아이콘을 넣지 않기
- 3초 이상 스켈레톤 노출 시 → 에러 상태로 전환 고려
- 모든 곳에 스켈레톤 적용 금지 → 주요 컨텐츠 영역만

---

## 6. 적용 예시 (챗봇)

```
┌──────────────────────────────┐
│ ○ ░░░░░░░░░░░░░░░░░░░░      │  ← avatar + text line
│   ░░░░░░░░░░░░               │  ← text line (짧게)
└──────────────────────────────┘
```

어시스턴트 메시지 로딩 시, 아바타 원형 + 텍스트 라인 2~3줄로 구성.
