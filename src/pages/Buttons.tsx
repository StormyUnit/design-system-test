import Button, {
  type ButtonSize,
  type ButtonVariant,
  type ButtonState,
} from '../components/Button'

const SIZES: ButtonSize[] = ['xs', 's', 'm', 'l', 'xl']
const VARIANTS: ButtonVariant[] = [
  'brand-solid',
  'brand-outline',
  'brand-weak',
  'neutral-solid',
  'neutral-outline',
  'neutral-weak',
  'critical-solid',
  'ghost',
]
const STATES: ButtonState[] = ['enabled', 'pressed', 'disabled', 'loading']

const VARIANT_LABEL: Record<ButtonVariant, string> = {
  'brand-solid': 'Brand Solid',
  'brand-outline': 'Brand Outline',
  'brand-weak': 'Brand Weak',
  'neutral-solid': 'Neutral Solid',
  'neutral-outline': 'Neutral Outline',
  'neutral-weak': 'Neutral Weak',
  'critical-solid': 'Critical Solid',
  ghost: 'Ghost',
}

export default function ButtonsPage() {
  return (
    <div>
      <h2 className="section-title">Buttons</h2>

      {/* ── Size × Variant Gallery ── */}
      <p className="section-subtitle">Size × Variant (Enabled)</p>
      <div className="btn-grid" style={{ gridTemplateColumns: `120px repeat(${SIZES.length}, auto)` }}>
        {/* header row */}
        <div />
        {SIZES.map((s) => (
          <div key={s} className="btn-grid-header">
            {s.toUpperCase()}
          </div>
        ))}

        {/* variant rows */}
        {VARIANTS.map((v) => (
          <>
            <div key={`label-${v}`} className="btn-row-label">
              {VARIANT_LABEL[v]}
            </div>
            {SIZES.map((s) => (
              <div key={`${v}-${s}`} className="btn-cell">
                <Button size={s} variant={v}>
                  Button
                </Button>
              </div>
            ))}
          </>
        ))}
      </div>

      {/* ── State Showcase ── */}
      <p className="section-subtitle">States per Variant</p>
      <div className="state-section">
        {VARIANTS.map((v) => (
          <div key={v} className="state-group">
            <div className="state-group-title">{VARIANT_LABEL[v]}</div>
            <div className="state-group-btns">
              {STATES.map((st) => (
                <Button key={st} size="m" variant={v} state={st}>
                  {st.charAt(0).toUpperCase() + st.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
