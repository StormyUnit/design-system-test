import { useState } from 'react'
import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Label from '../components/Label'
import Skeleton from '../components/Skeleton'
import BottomActionBar from '../components/BottomActionBar'
import SegmentedControl from '../components/SegmentedControl'

/* ── message types ── */
type Msg =
  | { role: 'assistant'; text: string; options?: string[] }
  | { role: 'user'; text: string }
  | { role: 'skeleton' }
  | { role: 'card'; title: string; items: { label: string; value: string }[] }

/* ── demo data ── */
const MESSAGES: Msg[] = [
  {
    role: 'assistant',
    text: '안녕하세요! 견적을 도와드릴게요.\n어떤 서비스가 필요하신가요?',
    options: ['이사 견적', '청소 견적', '인테리어'],
  },
  { role: 'user', text: '이사 견적 부탁해요' },
  {
    role: 'assistant',
    text: '어떤 이사를 원하시나요?',
    options: ['가정이사', '소형 포장이사', '사무실이사'],
  },
  { role: 'user', text: '가정이사요' },
  {
    role: 'assistant',
    text: '출발지와 도착지 정보를 확인했어요.\n아래 요약을 확인해주세요.',
  },
  {
    role: 'card',
    title: '견적 요약',
    items: [
      { label: '서비스', value: '가정이사' },
      { label: '출발지', value: '서울시 강남구' },
      { label: '도착지', value: '서울시 마포구' },
      { label: '예상 비용', value: '350,000원 ~' },
    ],
  },
  { role: 'skeleton' },
]

/* ── sub-components ── */

function AssistantBubble({ text, options }: { text: string; options?: string[] }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--dimension-x2)', alignItems: 'flex-start' }}>
      <Avatar name="Bot" size="m" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            background: 'var(--color-bg-neutral-solid)',
            borderRadius: 'var(--radius-r3)',
            padding: 'var(--spacing-default)',
            fontSize: 'var(--typography-body-b6-font-size)',
            lineHeight: 'var(--typography-body-b6-line-height)',
            fontWeight: 'var(--typography-body-b6-font-weight)',
            color: 'var(--color-fg-neutral)',
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </div>
        {options && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--dimension-x2)',
              marginTop: 'var(--dimension-x3)',
            }}
          >
            {options.map((opt) => (
              <Button key={opt} size="s" variant="neutral-outline" state="enabled">
                {opt}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div
        style={{
          background: 'var(--color-bg-brand-weak)',
          color: 'var(--color-fg-neutral)',
          borderRadius: 'var(--radius-r3)',
          padding: 'var(--spacing-default)',
          fontSize: 'var(--typography-body-b6-font-size)',
          lineHeight: 'var(--typography-body-b6-line-height)',
          fontWeight: 'var(--typography-body-b6-font-weight)',
          maxWidth: '75%',
        }}
      >
        {text}
      </div>
    </div>
  )
}

function SummaryCard({
  title,
  items,
}: {
  title: string
  items: { label: string; value: string }[]
}) {
  return (
    <div style={{ display: 'flex', gap: 'var(--dimension-x2)', alignItems: 'flex-start' }}>
      <Avatar name="Bot" size="m" />
      <div
        style={{
          flex: 1,
          background: 'var(--color-bg-layer-default)',
          borderRadius: 'var(--radius-r3)',
          boxShadow: 'var(--shadow-s1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: 'var(--spacing-default)',
            borderBottom: '1px solid var(--color-stroke-neutral-weak)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dimension-x2)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--typography-header-h9-bold-font-size)',
              lineHeight: 'var(--typography-header-h9-bold-line-height)',
              fontWeight: 'var(--typography-header-h9-bold-font-weight)',
              color: 'var(--color-fg-neutral)',
            }}
          >
            {title}
          </span>
          <Label size="sm" labelStyle="weak" role="brand">
            확인 필요
          </Label>
        </div>
        <div style={{ padding: 'var(--spacing-default)' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 'var(--dimension-x1_5) 0',
                borderBottom:
                  i < items.length - 1 ? '1px solid var(--color-stroke-neutral-muted)' : undefined,
              }}
            >
              <span
                style={{
                  color: 'var(--color-fg-neutral-muted)',
                  fontSize: 'var(--typography-body-b8-font-size)',
                  lineHeight: 'var(--typography-body-b8-line-height)',
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  color: 'var(--color-fg-neutral)',
                  fontSize: 'var(--typography-body-b8-font-size)',
                  lineHeight: 'var(--typography-body-b8-line-height)',
                  fontWeight: 600,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkeletonMessage() {
  return (
    <div style={{ display: 'flex', gap: 'var(--dimension-x2)', alignItems: 'flex-start' }}>
      <Skeleton width={40} height={40} borderRadius="50%" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton width="70%" height={14} />
        <Skeleton width="45%" height={14} />
      </div>
    </div>
  )
}

/* ── main page ── */

export default function ChatbotQuoteDemo() {
  const [tab, setTab] = useState(0)
  const [bottomMode, setBottomMode] = useState<'one' | 'two'>('two')

  return (
    <div>
      <h2 className="section-title">Chatbot Quote Demo</h2>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 'var(--spacing-default)', marginBottom: 'var(--spacing-default)', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-fg-neutral-muted)' }}>
          Bottom Bar:
        </label>
        <SegmentedControl
          items={['2 Buttons', '1 Button']}
          value={bottomMode === 'two' ? 0 : 1}
          onChange={(i) => setBottomMode(i === 0 ? 'two' : 'one')}
          size="md"
          layout="hug"
        />
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 375,
          height: 700,
          border: '1px solid var(--color-stroke-neutral-weak)',
          borderRadius: 'var(--radius-r4)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-layer-basement)',
          boxShadow: 'var(--shadow-s2)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'var(--color-bg-layer-default)',
            borderBottom: '1px solid var(--color-stroke-neutral-weak)',
            padding: 'var(--spacing-default)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--dimension-x3)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: 'var(--typography-header-h6-bold-font-size)',
                lineHeight: 'var(--typography-header-h6-bold-line-height)',
                fontWeight: 'var(--typography-header-h6-bold-font-weight)',
                color: 'var(--color-fg-neutral)',
              }}
            >
              견적 챗봇
            </span>
            <Label size="sm" labelStyle="weak" role="success">
              진행중
            </Label>
          </div>
          <SegmentedControl
            items={['채팅', '견적 내역']}
            value={tab}
            onChange={setTab}
            size="md"
            layout="full"
          />
        </div>

        {/* Message area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 'var(--spacing-gutterX)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-default)',
          }}
        >
          {tab === 0 ? (
            <>
              {MESSAGES.map((msg, i) => {
                if (msg.role === 'assistant')
                  return <AssistantBubble key={i} text={msg.text} options={msg.options} />
                if (msg.role === 'user')
                  return <UserBubble key={i} text={msg.text} />
                if (msg.role === 'card')
                  return <SummaryCard key={i} title={msg.title} items={msg.items} />
                if (msg.role === 'skeleton')
                  return <SkeletonMessage key={i} />
                return null
              })}
            </>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-default)',
                paddingTop: 'var(--dimension-x2)',
              }}
            >
              <div
                style={{
                  background: 'var(--color-bg-layer-default)',
                  borderRadius: 'var(--radius-r3)',
                  boxShadow: 'var(--shadow-s1)',
                  padding: 'var(--spacing-default)',
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--typography-header-h9-bold-font-size)',
                    fontWeight: 'var(--typography-header-h9-bold-font-weight)',
                    color: 'var(--color-fg-neutral)',
                    marginBottom: 'var(--dimension-x2)',
                  }}
                >
                  가정이사 견적
                </div>
                <div style={{ display: 'flex', gap: 'var(--dimension-x2)', flexWrap: 'wrap' }}>
                  <Label size="sm" labelStyle="weak" role="brand">가정이사</Label>
                  <Label size="sm" labelStyle="weak" role="neutral">서울 → 서울</Label>
                  <Label size="sm" labelStyle="solid" role="warning">견적 대기</Label>
                </div>
              </div>
              <Skeleton height={120} />
            </div>
          )}
        </div>

        {/* Bottom Action Bar */}
        <BottomActionBar>
          {bottomMode === 'two' ? (
            <>
              <Button size="xl" variant="neutral-outline" state="enabled">
                취소
              </Button>
              <Button size="xl" variant="brand-solid" state="enabled">
                다음 단계
              </Button>
            </>
          ) : (
            <Button size="xl" variant="brand-solid" state="enabled">
              견적 요청하기
            </Button>
          )}
        </BottomActionBar>
      </div>

      {/* Component showcase below */}
      <p className="section-subtitle">Avatar Samples</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Avatar size="s" name="김" />
        <Avatar size="m" name="이" />
        <Avatar size="m" />
        <Avatar size="s" name="Park" />
      </div>

      <p className="section-subtitle">Label Samples</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['brand', 'neutral', 'success', 'warning', 'critical'] as const).map((role) => (
          <div key={role} style={{ display: 'flex', gap: 8 }}>
            <Label size="md" labelStyle="solid" role={role}>
              {role}
            </Label>
            <Label size="md" labelStyle="weak" role={role}>
              {role}
            </Label>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <Label size="sm" labelStyle="weak" role="brand">Small</Label>
        <Label size="md" labelStyle="weak" role="brand">Medium</Label>
      </div>

      <p className="section-subtitle">Skeleton Samples</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300 }}>
        <Skeleton width="100%" height={14} />
        <Skeleton width="60%" height={14} />
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Skeleton width={40} height={40} borderRadius="50%" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton height={14} />
            <Skeleton width="70%" height={14} />
          </div>
        </div>
        <Skeleton width="100%" height={48} />
        <Skeleton width="100%" height={120} />
      </div>
    </div>
  )
}
