import { useState } from 'react'
import SegmentedControl from '../components/SegmentedControl'
import BottomActionBar from '../components/BottomActionBar'
import Button from '../components/Button'

export default function ComponentsPage() {
  /* ── SegmentedControl states ── */
  const [seg2, setSeg2] = useState(0)
  const [seg3, setSeg3] = useState(0)
  const [segLg2, setSegLg2] = useState(0)
  const [segLg3, setSegLg3] = useState(0)
  const [segHug2, setSegHug2] = useState(0)
  const [segHug3, setSegHug3] = useState(0)
  const [segHugLg, setSegHugLg] = useState(0)

  /* ── BottomActionBar state ── */
  const [safeArea, setSafeArea] = useState(false)

  return (
    <div>
      <h2 className="section-title">Components</h2>

      {/* ══════════════════════════════════════════════ */}
      {/* Segmented Control                             */}
      {/* ══════════════════════════════════════════════ */}
      <p className="section-subtitle">Segmented Control — Full Width</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        {/* md / 2 items */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Medium · 2 Items
        </label>
        <SegmentedControl
          items={['Tab 1', 'Tab 2']}
          value={seg2}
          onChange={setSeg2}
          size="md"
          layout="full"
        />

        {/* md / 3 items */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Medium · 3 Items
        </label>
        <SegmentedControl
          items={['First', 'Second', 'Third']}
          value={seg3}
          onChange={setSeg3}
          size="md"
          layout="full"
        />

        {/* lg / 2 items */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Large · 2 Items
        </label>
        <SegmentedControl
          items={['Tab 1', 'Tab 2']}
          value={segLg2}
          onChange={setSegLg2}
          size="lg"
          layout="full"
        />

        {/* lg / 3 items */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Large · 3 Items
        </label>
        <SegmentedControl
          items={['First', 'Second', 'Third']}
          value={segLg3}
          onChange={setSegLg3}
          size="lg"
          layout="full"
        />

        {/* disabled */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Medium · Disabled
        </label>
        <SegmentedControl
          items={['Tab 1', 'Tab 2', 'Tab 3']}
          value={1}
          onChange={() => {}}
          size="md"
          layout="full"
          disabled
        />
      </div>

      <p className="section-subtitle">Segmented Control — Hug Content</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        {/* hug md / 2 items */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Medium · 2 Items · Hug
        </label>
        <SegmentedControl
          items={['Tab 1', 'Tab 2']}
          value={segHug2}
          onChange={setSegHug2}
          size="md"
          layout="hug"
        />

        {/* hug md / 3 items */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Medium · 3 Items · Hug
        </label>
        <SegmentedControl
          items={['First', 'Second', 'Third']}
          value={segHug3}
          onChange={setSegHug3}
          size="md"
          layout="hug"
        />

        {/* hug lg */}
        <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
          Large · 2 Items · Hug
        </label>
        <SegmentedControl
          items={['Option A', 'Option B']}
          value={segHugLg}
          onChange={setSegHugLg}
          size="lg"
          layout="hug"
        />
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* Bottom Action Bar                             */}
      {/* ══════════════════════════════════════════════ */}
      <p className="section-subtitle">Bottom Action Bar</p>

      <p style={{ fontSize: 13, color: '#6e777c', marginBottom: 12 }}>
        Sticky bar 미리보기입니다. 아래 스크롤 영역 내에서 동작을 확인하세요.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#4a5256' }}>Safe Area:</label>
        <button
          onClick={() => setSafeArea(!safeArea)}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            border: '1px solid #e7edf0',
            background: safeArea ? '#0a93ff' : '#fff',
            color: safeArea ? '#fff' : '#222629',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {safeArea ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* 1 button */}
      <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
        1 Button
      </label>
      <div
        style={{
          position: 'relative',
          height: 200,
          overflow: 'auto',
          border: '1px solid #e7edf0',
          borderRadius: 12,
          marginBottom: 16,
          background: '#f7f9fa',
        }}
      >
        <div style={{ padding: 16, height: 300, fontSize: 13, color: '#aeb7bc' }}>
          Scroll down to see the sticky bar...
        </div>
        <BottomActionBar safeArea={safeArea}>
          <Button size="l" variant="brand-solid" state="enabled">
            Confirm
          </Button>
        </BottomActionBar>
      </div>

      {/* 2 buttons */}
      <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
        2 Buttons
      </label>
      <div
        style={{
          position: 'relative',
          height: 200,
          overflow: 'auto',
          border: '1px solid #e7edf0',
          borderRadius: 12,
          marginBottom: 16,
          background: '#f7f9fa',
        }}
      >
        <div style={{ padding: 16, height: 300, fontSize: 13, color: '#aeb7bc' }}>
          Scroll down to see the sticky bar...
        </div>
        <BottomActionBar safeArea={safeArea}>
          <Button size="l" variant="neutral-outline" state="enabled">
            Cancel
          </Button>
          <Button size="l" variant="brand-solid" state="enabled">
            Next
          </Button>
        </BottomActionBar>
      </div>

      {/* disabled */}
      <label style={{ fontSize: 12, color: '#6e777c', fontWeight: 600 }}>
        2 Buttons · Disabled
      </label>
      <div
        style={{
          position: 'relative',
          height: 200,
          overflow: 'auto',
          border: '1px solid #e7edf0',
          borderRadius: 12,
          marginBottom: 16,
          background: '#f7f9fa',
        }}
      >
        <div style={{ padding: 16, height: 300, fontSize: 13, color: '#aeb7bc' }}>
          Scroll down to see the sticky bar...
        </div>
        <BottomActionBar safeArea={safeArea}>
          <Button size="l" variant="neutral-outline" state="disabled">
            Cancel
          </Button>
          <Button size="l" variant="brand-solid" state="disabled">
            Next
          </Button>
        </BottomActionBar>
      </div>
    </div>
  )
}
