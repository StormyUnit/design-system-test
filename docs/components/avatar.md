# Avatar 컴포넌트 스펙 (챗봇용)

**작성일**: 2026-02-09

---

## 1. Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `src` | `string` | — | 이미지 URL |
| `name` | `string` | — | fallback 이니셜용 이름 |
| `size` | `'s' \| 'm'` | `'m'` | 크기 |

---

## 2. Size

| Size | 크기 | 토큰 | 용도 |
|------|------|------|------|
| S | 32px | `dimension.x8` | 소형 (인라인) |
| M | 40px | `dimension.x10` | 기본 (챗봇 메시지) |

---

## 3. Fallback

1. `src` 있으면 → 이미지 표시
2. `src` 없고 `name` 있으면 → 첫 글자 이니셜 (bg: neutral-solid, fg: neutral)
3. 둘 다 없으면 → 기본 아이콘 (회색 원)

---

## 4. Color

| 요소 | 토큰 |
|------|------|
| Fallback BG | `color.bg.neutral-solid` (gray.100) |
| Fallback Text | `color.fg.neutral-muted` (gray.600) |
| Border | 없음 (선택적으로 1px stroke 추가 가능) |
