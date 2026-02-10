# Iconography (아이콘 규칙)

**작성일**: 2026-02-09
**참고**: SEED Design System Iconography 원칙

---

## 1. 분류

| 타입 | 설명 | 컬러 규칙 |
|------|------|----------|
| **Monochrome** | 단색 아이콘 (라인/솔리드) | semantic fg 토큰을 따른다 |
| **Colored** | 다색 아이콘 (브랜드 로고 등) | 고정 컬러 자산 허용 |

---

## 2. 사이즈 세트

| 이름 | 크기 | 용도 | dimension 토큰 |
|------|------|------|---------------|
| XS | 16px | 인라인 텍스트, 작은 버튼 | `dimension.x4` |
| S | 20px | 버튼 아이콘, 리스트 | `dimension.x5` |
| M | 24px | 기본 아이콘, 내비게이션 | `dimension.x6` |

> 추후 필요 시 12px(XS), 32px(L) 추가 가능.

---

## 3. 텍스트와의 간격

| 위치 | 기본 gap | 토큰 |
|------|---------|------|
| 아이콘 + 텍스트 (수평) | 4px | `dimension.x1` |
| 버튼 내 아이콘 + 텍스트 | Button iconGap 토큰 사용 | size별 상이 |

---

## 4. Monochrome 컬러 규칙

Monochrome 아이콘은 주변 텍스트의 semantic fg를 따른다:

| 상태 | fg 토큰 | 용도 |
|------|--------|------|
| 기본 | `fg.neutral` | 일반 아이콘 |
| 브랜드 | `fg.brand-solid` | 강조 아이콘 |
| 비활성 | `fg.neutral-muted` | 비활성 아이콘 |
| 위험 | `fg.critical-solid` | 경고/삭제 아이콘 |
| 성공 | `fg.success-solid` | 완료 아이콘 |

---

## 5. 버튼 내 아이콘 규칙

### Prefix/Suffix 아이콘

| 속성 | 규칙 |
|------|------|
| 위치 | 텍스트 왼쪽(prefix) 또는 오른쪽(suffix) |
| 정렬 | 버튼 텍스트와 수직 중앙 정렬 (`align-items: center`) |
| 크기 | Button size 토큰의 `iconSize` 값 사용 |
| 간격 | Button size 토큰의 `iconGap` 값 사용 |
| 컬러 | 버튼의 fg 컬러와 동일 (`currentColor` 사용) |

### 버튼 사이즈별 아이콘 크기

| Button Size | iconSize | iconGap |
|-------------|----------|---------|
| XS | 14px | 4px |
| S | 16px | 4px |
| M | 18px | 6px |
| L | 20px | 6px |
| XL | 22px | 8px |

---

## 6. 금지 사항

- Monochrome 아이콘에 하드코딩 컬러 사용 금지 → semantic fg 토큰 사용
- 정의된 사이즈 세트 외의 임의 크기 금지
- 아이콘과 텍스트 간 간격에 임의값 금지 → dimension 토큰 사용
