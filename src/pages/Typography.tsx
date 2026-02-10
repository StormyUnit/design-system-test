import tokenStudio from '../../figma/token-studio.json'

const typo = tokenStudio.semantic.typography
const fs = tokenStudio.primitive.fontSizes
const lh = tokenStudio.primitive.lineHeights
const fw = tokenStudio.primitive.fontWeights

type TypoToken = {
  value: {
    fontFamily: string
    fontSize: string
    lineHeight: string
    fontWeight: string
    letterSpacing?: string
    paragraphSpacing?: string
  }
  type: string
  description: string
}

/** {fontSizes.t9} → "19" */
function resolveRef(ref: string): string {
  const m = ref.match(/^\{(.+)\.(.+)\}$/)
  if (!m) return ref
  const [, group, key] = m
  const map: Record<string, Record<string, { value: string }>> = {
    fontSizes: fs,
    lineHeights: lh,
    fontWeights: fw,
  }
  return map[group]?.[key]?.value ?? ref
}

function TypoRow({ name, token }: { name: string; token: TypoToken }) {
  const size = resolveRef(token.value.fontSize)
  const height = resolveRef(token.value.lineHeight)
  const weight = resolveRef(token.value.fontWeight)
  const weightNum = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 }[weight] ?? weight

  return (
    <tr>
      <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{name}</td>
      <td
        style={{
          fontFamily: 'Pretendard, sans-serif',
          fontSize: `${size}px`,
          lineHeight: `${height}px`,
          fontWeight: Number(weightNum),
        }}
      >
        가나다라 ABCD 1234
      </td>
      <td>{size}px</td>
      <td>{height}px</td>
      <td>{weight}</td>
      <td style={{ color: '#aeb7bc', fontSize: 12 }}>{token.description}</td>
    </tr>
  )
}

function TypoSection({
  title,
  tokens,
}: {
  title: string
  tokens: Record<string, TypoToken | Record<string, TypoToken>>
}) {
  const rows: { name: string; token: TypoToken }[] = []

  for (const [key, val] of Object.entries(tokens)) {
    if ('type' in val && val.type === 'typography') {
      rows.push({ name: key, token: val as TypoToken })
    } else {
      // nested (e.g. header.h1.bold / h1.semibold / h1.medium)
      for (const [sub, t] of Object.entries(val as Record<string, TypoToken>)) {
        rows.push({ name: `${key}.${sub}`, token: t })
      }
    }
  }

  return (
    <>
      <p className="section-subtitle">{title}</p>
      <table className="typo-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Sample</th>
            <th>Size</th>
            <th>Line-H</th>
            <th>Weight</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <TypoRow key={r.name} {...r} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default function TypographyPage() {
  return (
    <div>
      <h2 className="section-title">Typography</h2>
      <TypoSection title="Button (b1~b5)" tokens={typo.button as Record<string, TypoToken>} />
      <TypoSection title="Display (d1~d6)" tokens={typo.display as Record<string, TypoToken>} />
      <TypoSection
        title="Header (h1~h11)"
        tokens={typo.header as Record<string, Record<string, TypoToken>>}
      />
      <TypoSection title="Body (b1~b11)" tokens={typo.body as Record<string, TypoToken>} />
      <TypoSection title="Label (l1~l4)" tokens={typo.label as Record<string, TypoToken>} />
      <TypoSection title="Paragraph (p1~p3)" tokens={typo.paragraph as Record<string, TypoToken>} />
    </div>
  )
}
