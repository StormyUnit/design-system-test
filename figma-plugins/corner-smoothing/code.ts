/**
 * Corner Smoothing 60% 일괄 적용 플러그인
 *
 * cornerRadius > 0 인 노드에만 cornerSmoothing = 0.6 적용
 * cornerRadius = 0 이거나 radius 속성이 없는 노드는 스킵
 */

const SMOOTHING = 0.6;

figma.showUI(__html__, { width: 320, height: 220 });

/* ── 노드에 cornerRadius가 있고 > 0 인지 판별 ── */
function hasPositiveRadius(node: SceneNode): boolean {
  if (!('cornerRadius' in node)) return false;

  const r = (node as any).cornerRadius;

  // mixed (개별 꼭짓점이 다른 경우)
  if (r === figma.mixed) {
    const n = node as RectangleNode;
    return (
      n.topLeftRadius > 0 ||
      n.topRightRadius > 0 ||
      n.bottomLeftRadius > 0 ||
      n.bottomRightRadius > 0
    );
  }

  return typeof r === 'number' && r > 0;
}

/* ── 재귀 순회 + 적용 ── */
function applySmoothing(nodes: readonly SceneNode[]): { changed: number; skipped: number } {
  let changed = 0;
  let skipped = 0;

  for (const node of nodes) {
    if (hasPositiveRadius(node)) {
      const current = (node as any).cornerSmoothing as number;
      if (current !== SMOOTHING) {
        (node as any).cornerSmoothing = SMOOTHING;
        changed++;
      } else {
        skipped++; // 이미 0.6
      }
    }

    // 자식 노드 재귀 탐색
    if ('children' in node) {
      const result = applySmoothing((node as ChildrenMixin).children);
      changed += result.changed;
      skipped += result.skipped;
    }
  }

  return { changed, skipped };
}

/* ── UI 메시지 수신 ── */
figma.ui.onmessage = (msg: { type: string }) => {
  if (msg.type === 'apply-selection') {
    const sel = figma.currentPage.selection;
    if (sel.length === 0) {
      figma.ui.postMessage({ type: 'result', error: 'Nothing selected. Select a frame or component first.' });
      return;
    }
    const result = applySmoothing(sel);
    figma.ui.postMessage({ type: 'result', ...result, scope: 'Selection' });
  }

  if (msg.type === 'apply-page') {
    const result = applySmoothing(figma.currentPage.children);
    figma.ui.postMessage({ type: 'result', ...result, scope: 'Page' });
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
