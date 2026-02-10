import type { CSSProperties, ReactNode } from 'react'

interface BottomActionBarProps {
  children: ReactNode
  safeArea?: boolean
}

export default function BottomActionBar({
  children,
  safeArea = false,
}: BottomActionBarProps) {
  const barStyle: CSSProperties = {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--color-common-white)',
    borderTop: '1px solid var(--color-stroke-neutral-weak)',
    paddingLeft: 'var(--dimension-x5)',       // 20px
    paddingRight: 'var(--dimension-x5)',      // 20px
    paddingTop: 'var(--dimension-x2)',        // 8px (bar 내부 상단 여백)
    paddingBottom: safeArea
      ? 'calc(var(--dimension-x5) + env(safe-area-inset-bottom, 0px))'
      : 'var(--dimension-x5)',               // 20px
    display: 'flex',
    gap: 'var(--dimension-x2_5)',             // 10px
    boxSizing: 'border-box',
    zIndex: 10,
  }

  const childStyle: CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: 'grid',  // grid makes child button stretch to full width
  }

  return (
    <div style={barStyle}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={childStyle}>
              {child}
            </div>
          ))
        : <div style={childStyle}>{children}</div>
      }
    </div>
  )
}
