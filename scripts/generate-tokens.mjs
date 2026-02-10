#!/usr/bin/env node
/**
 * Token JSON → CSS Custom Properties 변환 스크립트
 * 실행: npm run tokens (= node scripts/generate-tokens.mjs)
 *
 * 입력:  figma/token-studio.json, figma/variables.import.components.button.json
 * 출력:  src/styles/tokens.css
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const ts = JSON.parse(readFileSync('figma/token-studio.json', 'utf8'));
const btn = JSON.parse(readFileSync('figma/variables.import.components.button.json', 'utf8'));

/* ── helpers ── */

const FW = { Regular: '400', Medium: '500', SemiBold: '600', Bold: '700' };
const PX = new Set([
  'sizing', 'spacing', 'borderRadius',
  'fontSizes', 'lineHeights', 'letterSpacing', 'paragraphSpacing',
]);

function varName(path) {
  return '--' + path.replace(/\./g, '-');
}

function toCSS(val, type) {
  if (val == null) return '';
  const s = String(val);
  const ref = s.match(/^\{(.+)\}$/);
  if (ref) return `var(${varName(ref[1])})`;
  if (s === 'transparent' || s.startsWith('#')) return s;
  if (type === 'fontWeights') return FW[s] || s;
  if (PX.has(type) && /^-?\d+(\.\d+)?$/.test(s)) return s + 'px';
  return s;
}

const TYPO = {
  fontFamily:       { css: 'font-family',       type: '' },
  fontSize:         { css: 'font-size',          type: 'fontSizes' },
  lineHeight:       { css: 'line-height',        type: 'lineHeights' },
  fontWeight:       { css: 'font-weight',        type: 'fontWeights' },
  letterSpacing:    { css: 'letter-spacing',     type: 'letterSpacing' },
  paragraphSpacing: { css: 'paragraph-spacing',  type: 'paragraphSpacing' },
};

function flatten(obj, prefix = '') {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    const p = prefix ? `${prefix}.${k}` : k;

    if (v && typeof v === 'object') {
      // Case 1: standard token  { value, type }
      if ('value' in v && 'type' in v) {
        if (typeof v.value === 'object' && v.type === 'typography') {
          // composite typography (token-studio format)
          for (const [sk, sv] of Object.entries(v.value)) {
            const info = TYPO[sk];
            if (info) out.push({ path: `${p}-${info.css}`, value: toCSS(sv, info.type || v.type) });
          }
        } else {
          out.push({ path: p, value: toCSS(v.value, v.type) });
        }
      }
      // Case 2: flat typography (button import format) — has "type":"typography" without "value"
      else if (v.type === 'typography' && !('value' in v)) {
        for (const [sk, sv] of Object.entries(v)) {
          if (sk === 'type') continue;
          const info = TYPO[sk];
          if (info) out.push({ path: `${p}-${info.css}`, value: toCSS(sv, info.type) });
        }
      }
      // Case 3: nested group
      else {
        out.push(...flatten(v, p));
      }
    }
  }
  return out;
}

/* ── flatten all sets ── */

const prim = flatten(ts.primitive);
const sem  = flatten(ts.semantic);
const comp = flatten(btn['component-button']);

/* ── build CSS ── */

const L = [
  '/* ==============================================',
  '   Auto-generated from design tokens',
  '   Run: npm run tokens',
  '   ============================================== */',
  '',
  ':root {',
];

function section(title, tokens) {
  if (!tokens.length) return;
  L.push(`\n  /* ${title} */`);
  for (const t of tokens) L.push(`  ${varName(t.path)}: ${t.value};`);
}

section('Primitive: Colors',    prim.filter(t => t.path.startsWith('color.')));
section('Primitive: Font',      prim.filter(t => /^(fontSizes|lineHeights|fontWeights|fontFamilies|letterSpacing|paragraphSpacing)\./.test(t.path)));
section('Primitive: Dimension', prim.filter(t => t.path.startsWith('dimension.')));
section('Primitive: Spacing',   prim.filter(t => t.path.startsWith('spacing.')));
section('Primitive: Radius',    prim.filter(t => t.path.startsWith('radius.')));
section('Primitive: Shadow',    prim.filter(t => t.path.startsWith('shadow.')));

section('Semantic: Foreground', sem.filter(t => t.path.startsWith('color.fg.')));
section('Semantic: Background', sem.filter(t => t.path.startsWith('color.bg.')));
section('Semantic: Stroke',     sem.filter(t => t.path.startsWith('color.stroke.')));
section('Semantic: Typography', sem.filter(t => t.path.startsWith('typography.')));
section('Semantic: Spacing',    sem.filter(t => t.path.startsWith('spacing.')));
section('Semantic: Skeleton',   sem.filter(t => t.path.startsWith('skeleton.')));

section('Component: Button Size',    comp.filter(t => t.path.startsWith('button.size.')));
section('Component: Button Variant', comp.filter(t => t.path.startsWith('button.variant.')));

L.push('}');

/* ── write ── */

mkdirSync('src/styles', { recursive: true });
writeFileSync('src/styles/tokens.css', L.join('\n') + '\n');

const total = prim.length + sem.length + comp.length;
console.log(`✅ src/styles/tokens.css generated (${total} variables)`);
