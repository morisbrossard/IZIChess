import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { colors } from '../theme.js'

function Admin({ t }) {
  const [submissions, setSubmissions] = useState([])
  const [feedbacks, setFeedbacks] = useState({})
  const [autenticado, setAutenticado] = useState(false)
  const [clave, setClave] = useState('')
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
  const navigate = useNavigate()

  useEffect(() => {
    if (!autenticado) return
    const getSubmissions = async () => {
      const { data } = await supabase
        .from('submissions')
        .select('*, missions(title)')
        .eq('status', 'pending')
      setSubmissions(data || [])
    }
    getSubmissions()
  }, [autenticado])

  const handleFeedback = async (id, result) => {
    await supabase
      .from('submissions')
      .update({ status: 'reviewed', feedback: feedbacks[id] || '', result })
      .eq('id', id)
    setSubmissions(submissions.filter(s => s.id !== id))
  }

  if (!autenticado) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '2rem', width: 340, textAlign: 'center' }}>
          <img src="/logo.png" alt="IZIChess" style={{ width: 170, height: 170, objectFit: 'contain', marginBottom: 12 }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#0F1B35', marginBottom: 4 }}>Panel del entrenador</h2>
          <p style={{ fontSize: 13, color: '#4A5F82', marginBottom: '1.5rem' }}>{t.enterPassword}</p>
          <input
            type="password"
            placeholder={t.password}
            value={clave}
            onChange={e => setClave(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && clave === adminPassword && setAutenticado(true)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D8E0EE', fontSize: 14, fontFamily: 'Inter, sans-serif', marginBottom: 10, backgroundColor: '#F4F6FA', color: '#0F1B35' }}
          />
          <button
            onClick={() => clave === adminPassword ? setAutenticado(true) : alert(t.wrongPassword)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#F5C842', border: 'none', borderRadius: 8, color: '#0F1B35', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            {t.enter}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA' }}>

      <Header t={t} subtitle={t.adminPanel} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#0F1B35', marginBottom: 4 }}>{t.evaluations}</h1>
        <p style={{ fontSize: 14, color: '#4A5F82', marginBottom: '1.5rem' }}>{t.pendingReviews}</p>

        {submissions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#4A5F82', fontSize: 14 }}>
            <img src="/logo.png" alt="IZIChess" style={{ width: 60, height: 60, objectFit: 'contain', marginBottom: 12, opacity: 0.4 }} />
            <p>{t.noPending}</p>
          </div>
        )}

        {submissions.map(sub => (
          <div key={sub.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: '#0F1B35', marginBottom: 4 }}>{sub.missions?.title}</h3>
            <p style={{ fontSize: 12, color: '#4A5F82', marginBottom: '0.75rem' }}>Enviado recientemente</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: '0.75rem' }}>
              <div style={{ backgroundColor: '#EEF2FA', borderRadius: 8, padding: '8px 14px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#4A5F82', marginBottom: 2 }}>{t.quantity}</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#0F1B35' }}>{sub.count}</div>
              </div>
              <div style={{ backgroundColor: '#EEF2FA', borderRadius: 8, padding: '8px 14px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#4A5F82', marginBottom: 2 }}>{t.accuracy2}</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#0F1B35' }}>{sub.accuracy}%</div>
              </div>
            </div>

            {sub.game_link && (
              <a href={sub.game_link} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#F5C842', display: 'block', marginBottom: 8 }}>{t.viewGame}</a>
            )}

            {sub.feeling && (
              <p style={{ fontSize: 13, color: '#4A5F82', fontStyle: 'italic', marginBottom: '0.75rem' }}>"{sub.feeling}"</p>
            )}

            <textarea
              placeholder="Escribe tu feedback aquí..."
              value={feedbacks[sub.id] || ''}
              onChange={e => setFeedbacks({ ...feedbacks, [sub.id]: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D8E0EE', fontSize: 13, fontFamily: 'Inter, sans-serif', minHeight: 80, backgroundColor: '#F4F6FA', color: '#0F1B35', marginBottom: 10, resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => handleFeedback(sub.id, 'level_up')}
                style={{ flex: 1, padding: '10px', backgroundColor: '#F5C842', border: 'none', borderRadius: 8, color: '#0F1B35', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                {t.levelUp}
              </button>
              <button
                onClick={() => handleFeedback(sub.id, 'repeat')}
                style={{ flex: 1, padding: '10px', backgroundColor: '#F4F6FA', border: '1px solid #D8E0EE', borderRadius: 8, color: '#4A5F82', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                {t.repeatModule}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin