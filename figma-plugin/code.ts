// Ride Text Styles Extractor - Figma Plugin
// Figma의 로컬 Text Styles를 JSON으로 추출합니다.

figma.showUI(__html__, { width: 520, height: 600 });

interface ExtractedTextStyle {
  name: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  lineHeight: number | null;
  lineHeightUnit: string;
  letterSpacing: number;
  letterSpacingUnit: string;
  paragraphSpacing: number;
  textCase: string;
  textDecoration: string;
}

interface ExportData {
  textStyles: ExtractedTextStyle[];
  metadata: {
    extractedAt: string;
    totalStyles: number;
    source: string;
    figmaFileName: string;
  };
}

function extractLineHeight(lineHeight: LineHeight): { value: number | null; unit: string } {
  if (lineHeight.unit === "AUTO") {
    return { value: null, unit: "AUTO" };
  }
  if (lineHeight.unit === "PIXELS") {
    return { value: lineHeight.value, unit: "px" };
  }
  if (lineHeight.unit === "PERCENT") {
    return { value: lineHeight.value, unit: "%" };
  }
  return { value: null, unit: "unknown" };
}

function extractLetterSpacing(letterSpacing: LetterSpacing): { value: number; unit: string } {
  if (letterSpacing.unit === "PIXELS") {
    return { value: letterSpacing.value, unit: "px" };
  }
  if (letterSpacing.unit === "PERCENT") {
    return { value: letterSpacing.value, unit: "%" };
  }
  return { value: 0, unit: "px" };
}

function run() {
  const textStyles = figma.getLocalTextStyles();

  const extracted: ExtractedTextStyle[] = textStyles.map((style) => {
    const lh = extractLineHeight(style.lineHeight);
    const ls = extractLetterSpacing(style.letterSpacing);

    return {
      name: style.name,
      fontFamily: style.fontName.family,
      fontWeight: style.fontName.style,
      fontSize: style.fontSize,
      lineHeight: lh.value,
      lineHeightUnit: lh.unit,
      letterSpacing: ls.value,
      letterSpacingUnit: ls.unit,
      paragraphSpacing: style.paragraphSpacing,
      textCase: style.textCase,
      textDecoration: style.textDecoration,
    };
  });

  // 이름순 정렬
  extracted.sort((a, b) => a.name.localeCompare(b.name));

  const exportData: ExportData = {
    textStyles: extracted,
    metadata: {
      extractedAt: new Date().toISOString(),
      totalStyles: extracted.length,
      source: "Ride Design System",
      figmaFileName: figma.root.name,
    },
  };

  figma.ui.postMessage({
    type: "export-result",
    data: exportData,
  });
}

// UI에서 메시지를 받으면 처리
figma.ui.onmessage = (msg) => {
  if (msg.type === "extract") {
    run();
  }
  if (msg.type === "close") {
    figma.closePlugin();
  }
};

// 플러그인 실행 시 자동 추출
run();
