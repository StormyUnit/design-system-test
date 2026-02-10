import type { CSSProperties, ReactNode } from 'react'

export type LabelSize = 'sm' | 'md'
export type LabelStyle = 'solid' | 'weak'
export type LabelRole = 'brand' | 'neutral' | 'success' | 'warning' | 'critical'

interface LabelProps {
  children: ReactNode
  size?: LabelSize
  labelStyle?: LabelStyle
  role?: LabelRole
}

/* ── color mapping: all existing semantic tokens ── */
const COLORS: Record<LabelRole, Record<LabelStyle, { bg: string; fg: string }>> = {
  brand: {
    solid: { bg: 'var(--color-bg-brand-solid)', fg: 'var(--color-fg-brand-contrast)' },
    weak:  { bg: 'var(--color-bg-brand-weak)',  fg: 'var(--color-fg-brand-solid)' },
  },
  neutral: {
    solid: { bg: 'var(--color-bg-neutral)',       fg: 'var(--color-fg-neutral-inverted)' },
    weak:  { bg: 'var(--color-bg-neutral-solid)',  fg: 'var(--color-fg-neutral)' },
  },
  success: {
    solid: { bg: 'var(--color-bg-success-solid)',  fg: 'var(--color-fg-success-contrast)' },
    weak:  { bg: 'var(--color-bg-success-weak)',   fg: 'var(--color-fg-success-solid)' },
  },
  warning: {
    solid: { bg: 'var(--color-bg-warning-solid)',  fg: 'var(--color-fg-warning-contrast)' },
    weak:  { bg: 'var(--color-bg-warning-weak)',   fg: 'var(--color-fg-warning-solid)' },
  },
  critical: {
    solid: { bg: 'var(--color-bg-critical-solid)', fg: 'var(--color-fg-critical-contrast)' },
    weak:  { bg: 'var(--color-bg-critical-weak)',  fg: 'var(--color-fg-critical-solid)' },
  },
}

/* ── size config: typography token-based ── */
const SIZE_CONFIG: Record<LabelSize, {
  paddingX: string
  paddingY: string
  fontSize: string
  lineHeight: string
  fontWeight: string
}> = {
  md: {
    paddingX: 'var(--dimension-x2_5)',  // 10px
    paddingY: 'var(--dimension-x1_5)',  // 6px
    // h10/bold: 13px Bold 18px
    fontSize: 'var(--typography-header-h10-bold-font-size)',
    lineHeight: 'var(--typography-header-h10-bold-line-height)',
    fontWeight: 'var(--typography-header-h10-bold-font-weight)',
  },
  sm: {
    paddingX: 'var(--dimension-x2)',    // 8px
    paddingY: 'var(--dimension-x1_5)',  // 6px
    // l3: 12px Medium 12px
    fontSize: 'var(--typography-label-l3-font-size)',
    lineHeight: 'var(--typography-label-l3-line-height)',
    fontWeight: 'var(--typography-label-l3-font-weight)',
  },
}

export default function Label({
  children,
  size = 'md',
  labelStyle = 'weak',
  role = 'neutral',
}: LabelProps) {
  const c = COLORS[role][labelStyle]
  const s = SIZE_CONFIG[size]

  const style: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: s.paddingX,
    paddingRight: s.paddingX,
    paddingTop: s.paddingY,
    paddingBottom: s.paddingY,
    borderRadius: 'var(--radius-r1_5)',   // 6px
    background: c.bg,
    color: c.fg,
    fontFamily: 'Pretendard, sans-serif',
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    fontWeight: s.fontWeight,
    whiteSpace: 'nowrap',
  }

  return <span style={style}>{children}</span>
}
