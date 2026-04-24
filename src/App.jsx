import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Mission from './pages/Mission'
import Complete from './pages/Complete'
import Feedback from './pages/Feedback'
import Admin from './pages/Admin'
import { translations } from './i18n'

function App() {
  const [lang, setLang] = useState('es')
  const t = translations[lang]

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard t={t} lang={lang} setLang={setLang} />} />
        <Route path="/mission/:id" element={<Mission t={t} />} />
        <Route path="/complete/:id" element={<Complete t={t} />} />
        <Route path="/feedback" element={<Feedback t={t} />} />
        <Route path="/admin" element={<Admin t={t} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App