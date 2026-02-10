import type { CSSProperties } from 'react'

export type AvatarSize = 's' | 'm'

interface AvatarProps {
  src?: string
  name?: string
  size?: AvatarSize
}

const SIZE_MAP: Record<AvatarSize, string> = {
  s: 'var(--dimension-x8)',   // 32px
  m: 'var(--dimension-x10)',  // 40px
}

const FONT_SIZE: Record<AvatarSize, number> = {
  s: 13,
  m: 15,
}

export default function Avatar({ src, name, size = 'm' }: AvatarProps) {
  const dim = SIZE_MAP[size]

  const base: CSSProperties = {
    width: dim,
    height: dim,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (src) {
    return (
      <div style={base}>
        <img
          src={src}
          alt={name || 'avatar'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  // Fallback: initial or default
  const initial = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <div
      style={{
        ...base,
        background: 'var(--color-bg-neutral-solid)',
        color: 'var(--color-fg-neutral-muted)',
        fontFamily: 'Pretendard, sans-serif',
        fontSize: FONT_SIZE[size],
        fontWeight: 600,
      }}
    >
      {initial}
    </div>
  )
}
