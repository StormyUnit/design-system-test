import type { CSSProperties } from 'react'

export type SegmentedSize = 'md' | 'lg'
export type SegmentedLayout = 'full' | 'hug'

interface SegmentedControlProps {
  items: string[]
  value: number
  onChange: (index: number) => void
  size?: SegmentedSize
  layout?: SegmentedLayout
  disabled?: boolean
}

/* ── size config mapped to CSS variables ── */
const SIZE_VARS: Record<SegmentedSize, {
  trackHeight: string
  indicatorHeight: string
  trackRadius: string
  indicatorRadius: string
  fontSize: string
  lineHeight: string
  fontWeight: string
}> = {
  md: {
    trackHeight: 'var(--dimension-x10)',       // 40px
    indicatorHeight: 'var(--dimension-x8)',     // 32px
    trackRadius: 'var(--radius-r3)',            // 12px
    indicatorRadius: 'var(--radius-r2)',        // 8px
    fontSize: 'var(--typography-button-b4-font-size)',
    lineHeight: 'var(--typography-button-b4-line-height)',
    fontWeight: 'var(--typography-button-b4-font-weight)',
  },
  lg: {
    trackHeight: 'var(--dimension-x14)',        // 56px
    indicatorHeight: 'var(--dimension-x12)',     // 48px
    trackRadius: 'var(--radius-r3_5)',          // 14px
    indicatorRadius: 'var(--radius-r2_5)',      // 10px
    fontSize: 'var(--typography-button-b3-font-size)',
    lineHeight: 'var(--typography-button-b3-line-height)',
    fontWeight: 'var(--typography-button-b3-font-weight)',
  },
}

export default function SegmentedControl({
  items,
  value,
  onChange,
  size = 'md',
  layout = 'full',
  disabled = false,
}: SegmentedControlProps) {
  const sv = SIZE_VARS[size]
  const count = items.length

  const trackStyle: CSSProperties = {
    position: 'relative',
    display: layout === 'full' ? 'flex' : 'inline-flex',
    width: layout === 'full' ? '100%' : undefined,
    height: sv.trackHeight,
    padding: 'var(--dimension-x1)',                       // 4px all sides
    paddingLeft: layout === 'hug' ? 'var(--dimension-x3)' : 'var(--dimension-x1)',  // hug: 12px
    paddingRight: layout === 'hug' ? 'var(--dimension-x3)' : 'var(--dimension-x1)',
    background: 'var(--color-bg-neutral-weak)',
    borderRadius: sv.trackRadius,
    boxSizing: 'border-box',
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : undefined,
  }

  const indicatorStyle: CSSProperties = {
    position: 'absolute',
    top: 'var(--dimension-x1)',                            // 4px
    height: sv.indicatorHeight,
    width: `calc((100% - var(--dimension-x1) * 2${layout === 'hug' ? ' - var(--dimension-x3) * 2 + var(--dimension-x1) * 2' : ''}) / ${count})`,
    left: `calc(${layout === 'hug' ? 'var(--dimension-x3)' : 'var(--dimension-x1)'} + (100% - var(--dimension-x1) * 2${layout === 'hug' ? ' - var(--dimension-x3) * 2 + var(--dimension-x1) * 2' : ''}) / ${count} * ${value})`,
    background: 'var(--color-common-white)',
    borderRadius: sv.indicatorRadius,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
    transition: 'left 150ms ease-out',
    zIndex: 0,
  }

  const itemStyle = (index: number): CSSProperties => ({
    flex: layout === 'full' ? 1 : undefined,
    padding: layout === 'hug' ? '0 var(--dimension-x3)' : undefined,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    fontFamily: 'Pretendard, sans-serif',
    fontSize: sv.fontSize,
    lineHeight: sv.lineHeight,
    fontWeight: sv.fontWeight,
    color: disabled
      ? 'var(--color-fg-neutral-muted)'
      : index === value
        ? 'var(--color-fg-brand-solid)'
        : 'var(--color-fg-neutral)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'color 150ms ease-out',
    border: 'none',
    background: 'transparent',
    whiteSpace: 'nowrap',
  })

  return (
    <div style={trackStyle}>
      <div style={indicatorStyle} />
      {items.map((label, i) => (
        <button
          key={i}
          style={itemStyle(i)}
          onClick={() => !disabled && onChange(i)}
          disabled={disabled}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
