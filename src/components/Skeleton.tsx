import type { CSSProperties } from 'react'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  style?: CSSProperties
}

const BASE: CSSProperties = {
  background: `linear-gradient(90deg,
    var(--skeleton-bg) 25%,
    var(--skeleton-shimmer) 50%,
    var(--skeleton-bg) 75%)`,
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s ease-in-out infinite',
  borderRadius: 'var(--skeleton-radius)',
}

export default function Skeleton({
  width = '100%',
  height = 14,
  borderRadius,
  style,
}: SkeletonProps) {
  return (
    <div
      style={{
        ...BASE,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: borderRadius || BASE.borderRadius,
        ...style,
      }}
    />
  )
}

/* Inject shimmer keyframes once */
if (typeof document !== 'undefined' && !document.getElementById('skeleton-shimmer')) {
  const s = document.createElement('style')
  s.id = 'skeleton-shimmer'
  s.textContent = `@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }`
  document.head.appendChild(s)
}
