import type { CSSProperties, ReactNode } from 'react'

export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'
export type ButtonVariant =
  | 'brand-solid'
  | 'brand-outline'
  | 'brand-weak'
  | 'neutral-solid'
  | 'neutral-outline'
  | 'neutral-weak'
  | 'critical-solid'
  | 'ghost'
export type ButtonState = 'enabled' | 'pressed' | 'disabled' | 'loading'

interface ButtonProps {
  size?: ButtonSize
  variant?: ButtonVariant
  state?: ButtonState
  children: ReactNode
}

const BASE: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--btn-stroke)',
  borderRadius: 'var(--btn-radius)',
  background: 'var(--btn-bg)',
  color: 'var(--btn-fg)',
  fontFamily: 'Pretendard, sans-serif',
  fontSize: 'var(--btn-font-size)',
  lineHeight: 'var(--btn-line-height)',
  fontWeight: 'var(--btn-font-weight)',
  height: 'var(--btn-height)',
  paddingLeft: 'var(--btn-px)',
  paddingRight: 'var(--btn-px)',
  paddingTop: 'var(--btn-py)',
  paddingBottom: 'var(--btn-py)',
  cursor: 'pointer',
  transition: 'filter .12s',
  whiteSpace: 'nowrap',
  position: 'relative',
}

export default function Button({
  size = 'm',
  variant = 'brand-solid',
  state = 'enabled',
  children,
}: ButtonProps) {
  const vars: Record<string, string> = {
    '--btn-bg':          `var(--button-variant-${variant}-${state}-bg)`,
    '--btn-fg':          `var(--button-variant-${variant}-${state}-fg)`,
    '--btn-stroke':      `var(--button-variant-${variant}-${state}-stroke)`,
    '--btn-height':      `var(--button-size-${size}-height)`,
    '--btn-px':          `var(--button-size-${size}-paddingX)`,
    '--btn-py':          `var(--button-size-${size}-paddingY)`,
    '--btn-radius':      `var(--button-size-${size}-radius)`,
    '--btn-font-size':   `var(--button-size-${size}-typography-font-size)`,
    '--btn-line-height': `var(--button-size-${size}-typography-line-height)`,
    '--btn-font-weight': `var(--button-size-${size}-typography-font-weight)`,
  }

  const style = { ...BASE, ...vars } as CSSProperties

  if (state === 'disabled') style.cursor = 'not-allowed'
  if (state === 'loading') style.cursor = 'wait'

  return (
    <button style={style} disabled={state === 'disabled' || state === 'loading'}>
      {state === 'loading' && <Spinner variant={variant} />}
      <span style={state === 'loading' ? { visibility: 'hidden' } : undefined}>
        {children}
      </span>
    </button>
  )
}

function Spinner({ variant }: { variant: ButtonVariant }) {
  return (
    <span
      style={{
        position: 'absolute',
        width: 16,
        height: 16,
        border: '2px solid transparent',
        borderTopColor: `var(--button-variant-${variant}-loading-spinner)`,
        borderRadius: '50%',
        animation: 'spin .6s linear infinite',
      }}
    />
  )
}

/* inject keyframes once */
if (typeof document !== 'undefined' && !document.getElementById('btn-spin')) {
  const s = document.createElement('style')
  s.id = 'btn-spin'
  s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}'
  document.head.appendChild(s)
}
