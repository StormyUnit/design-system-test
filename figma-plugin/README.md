# Ride Text Styles Extractor - Figma Plugin

Figma의 로컬 Text Styles를 JSON 파일로 추출하는 플러그인입니다.

## 왜 필요한가요?

Ride 디자인 시스템의 타이포그래피는 Figma **Text Styles**로만 존재합니다.
이 플러그인으로 Text Styles를 JSON으로 추출하면, SEED 구조의 타이포그래피 토큰을 만들 수 있습니다.

---

## 설치 방법

### 준비물
- Figma Desktop 앱 (웹 버전에서는 개발 플러그인 불가)

### Step 1: 플러그인 불러오기

1. Figma Desktop 앱을 엽니다
2. 상단 메뉴에서 `Plugins` → `Development` → `Import plugin from manifest...` 클릭
3. 이 폴더의 `manifest.json` 파일을 선택합니다

### Step 2: TypeScript 컴파일 (선택)

이 플러그인은 TypeScript로 작성되었습니다.
Figma는 `code.js`를 실행하므로, `code.ts`를 JavaScript로 변환해야 합니다.

**방법 A: 직접 컴파일**
```bash
# 프로젝트 루트에서
npx tsc figma-plugin/code.ts --outDir figma-plugin --target ES6
```

**방법 B: code.js 직접 사용**
code.ts 파일의 내용은 순수 TypeScript이므로, 타입 어노테이션만 제거하면 바로 JS로 사용 가능합니다.
아래 명령으로 간단히 변환할 수 있습니다:
```bash
# sed로 타입 제거 (간편 방법)
cp figma-plugin/code.ts figma-plugin/code.js
```
> 참고: Figma plugin API 타입은 런타임에 Figma가 제공하므로, interface 선언부만 제거하면 됩니다.

---

## 사용 방법

1. **Ride 디자인 파일**을 Figma에서 엽니다
2. `Plugins` → `Development` → `Ride Text Styles Extractor` 실행
3. 플러그인이 자동으로 모든 Text Styles를 추출합니다
4. 결과를 확인한 후:
   - **클립보드에 복사**: 복사 후 파일에 붙여넣기
   - **JSON 다운로드**: `ride-text-styles.json` 파일로 저장

---

## 출력 JSON 형식

```json
{
  "textStyles": [
    {
      "name": "Heading/H1",
      "fontFamily": "Pretendard",
      "fontWeight": "Bold",
      "fontSize": 24,
      "lineHeight": 32,
      "lineHeightUnit": "px",
      "letterSpacing": 0,
      "letterSpacingUnit": "px",
      "paragraphSpacing": 0,
      "textCase": "ORIGINAL",
      "textDecoration": "NONE"
    }
  ],
  "metadata": {
    "extractedAt": "2026-02-08T...",
    "totalStyles": 15,
    "source": "Ride Design System",
    "figmaFileName": "Ride Design System"
  }
}
```

## 다음 단계

추출한 JSON을 프로젝트 루트에 저장한 후, 타이포그래피 토큰 변환에 사용합니다:
1. JSON을 `tokens/ride-text-styles.json`으로 저장
2. 이 데이터를 기반으로 `tokens/primitives.json`의 typography 섹션 업데이트
3. `tokens/typography.json`의 scale + semantic 토큰 업데이트
