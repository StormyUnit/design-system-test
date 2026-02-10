import { useState } from 'react'
import ColorsPage from './pages/Colors'
import TypographyPage from './pages/Typography'
import ButtonsPage from './pages/Buttons'
import ComponentsPage from './pages/Components'
import ChatbotQuoteDemo from './pages/ChatbotQuoteDemo'

type Page = 'colors' | 'typography' | 'buttons' | 'components' | 'chatbot'

const PAGE_LABEL: Record<Page, string> = {
  colors: 'Colors',
  typography: 'Typography',
  buttons: 'Buttons',
  components: 'Components',
  chatbot: 'Chatbot',
}

export default function App() {
  const [page, setPage] = useState<Page>('chatbot')

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Ride Design System</h1>
        <nav className="app-nav">
          {(['colors', 'typography', 'buttons', 'components', 'chatbot'] as Page[]).map((p) => (
            <button
              key={p}
              className={`nav-tab ${page === p ? 'nav-tab--active' : ''}`}
              onClick={() => setPage(p)}
            >
              {PAGE_LABEL[p]}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {page === 'colors' && <ColorsPage />}
        {page === 'typography' && <TypographyPage />}
        {page === 'buttons' && <ButtonsPage />}
        {page === 'components' && <ComponentsPage />}
        {page === 'chatbot' && <ChatbotQuoteDemo />}
      </main>
    </div>
  )
}
