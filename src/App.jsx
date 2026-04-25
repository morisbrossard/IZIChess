import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabase'
import { translations } from './i18n'
import Dashboard from './pages/Dashboard'
import Mission from './pages/Mission'
import Complete from './pages/Complete'
import Feedback from './pages/Feedback'
import Admin from './pages/Admin'
import Login from './pages/Login'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState('es')
  const t = translations[lang]

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="/logo.png" alt="IZIChess" style={{ width: 170, height: 170, objectFit: 'contain', opacity: 0.5 }} />
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard t={t} lang={lang} setLang={setLang} user={user} /> : <Navigate to="/login" />} />
        <Route path="/mission/:id" element={user ? <Mission t={t} /> : <Navigate to="/login" />} />
        <Route path="/complete/:id" element={user ? <Complete t={t} /> : <Navigate to="/login" />} />
        <Route path="/feedback" element={user ? <Feedback t={t} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={<Admin t={t} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App