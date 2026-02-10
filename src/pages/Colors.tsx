import tokenStudio from '../../figma/token-studio.json'

const prim = tokenStudio.primitive.color
const sem = tokenStudio.semantic.color

/** 밝기 판별: 어두우면 true */
function isDark(hex: string): boolean {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 140
}

type ColorMap = Record<string, { value: string; type: string; description?: string }>

function PaletteSection({ name, colors }: { name: string; colors: ColorMap }) {
  return (
    <>
      <p className="section-subtitle">{name}</p>
      <div className="palette-grid">
        {Object.entries(colors).map(([shade, token]) => (
          <div
            key={shade}
            className={`swatch ${isDark(token.value) ? 'swatch--dark' : 'swatch--light'}`}
            style={{ backgroundColor: token.value }}
          >
            <span className="swatch-label">{shade}</span>
            <span className="swatch-hex">{token.value}</span>
          </div>
        ))}
      </div>
    </>
  )
}

function SemanticSection({
  title,
  tokens,
}: {
  title: string
  tokens: Record<string, { value: string; description?: string }>
}) {
  // 참조를 실제 hex로 해석
  function resolve(ref: string): string {
    const m = ref.match(/^\{color\.(.+)\}$/)
    if (!m) return ref
    const parts = m[1].split('.')
    let obj: Record<string, unknown> = prim as Record<string, unknown>
    for (const p of parts) {
      obj = obj[p] as Record<string, unknown>
      if (!obj) return ref
    }
    return (obj as { value: string }).value ?? ref
  }

  return (
    <>
      <p className="section-subtitle">{title}</p>
      <div className="semantic-grid">
        {Object.entries(tokens).map(([name, token]) => {
          const hex = resolve(token.value)
          return (
            <div key={name} className="semantic-swatch">
              <div className="semantic-dot" style={{ backgroundColor: hex }} />
              <div>
                <div className="semantic-name">{name}</div>
                <div style={{ fontSize: 10, color: '#aeb7bc' }}>{hex}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default function ColorsPage() {
  const palettes = ['common', 'blue', 'gray', 'red', 'yellow', 'green', 'oxford', 'social'] as const

  return (
    <div>
      <h2 className="section-title">Colors</h2>

      {palettes.map((name) => (
        <PaletteSection key={name} name={name} colors={prim[name] as unknown as ColorMap} />
      ))}

      <h2 className="section-title" style={{ marginTop: 40 }}>Semantic Colors</h2>

      <SemanticSection title="Foreground (fg)" tokens={sem.fg as Record<string, { value: string }>} />
      <SemanticSection title="Background (bg)" tokens={sem.bg as Record<string, { value: string }>} />
      <SemanticSection title="Stroke" tokens={sem.stroke as Record<string, { value: string }>} />
    </div>
  )
}
