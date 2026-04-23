import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const [submissions, setSubmissions] = useState([])
  const [feedbacks, setFeedbacks] = useState({})
  const [autenticado, setAutenticado] = useState(false)
  const [clave, setClave] = useState('')
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
      <div style={{ minHeight: '100vh', backgroundColor: '#F7F3EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '2rem', width: 320, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>♟</div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#1A2E28', marginBottom: 4 }}>Panel del entrenador</h2>
          <p style={{ fontSize: 13, color: '#5A7A6E', marginBottom: '1.5rem' }}>Ingresa tu clave para continuar</p>
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={e => setClave(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && clave === 'izichess2024' && setAutenticado(true)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #E8E0D0', fontSize: 14, fontFamily: 'Inter, sans-serif', marginBottom: 10, backgroundColor: '#F7F3EC' }}
          />
          <button
            onClick={() => clave === 'izichess2024' ? setAutenticado(true) : alert('Clave incorrecta')}
            style={{ width: '100%', padding: '10px', backgroundColor: '#2C4A3E', border: 'none', borderRadius: 8, color: '#F7F3EC', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F3EC' }}>
      <div style={{ backgroundColor: '#2C4A3E', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: '1px solid #5A7A6E', borderRadius: 8, padding: '6px 14px', color: '#E8E0D0', fontSize: 13, cursor: 'pointer' }}
        >
          ← Volver
        </button>
        <span style={{ color: '#E8E0D0', fontSize: 13 }}>Panel del entrenador</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1A2E28', marginBottom: 4 }}>Evaluaciones</h1>
        <p style={{ fontSize: 14, color: '#5A7A6E', marginBottom: '1.5rem' }}>Envíos pendientes de revisión</p>

        {submissions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#5A7A6E', fontSize: 14 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>♟</div>
            No hay envíos pendientes
          </div>
        )}

        {submissions.map(sub => (
          <div key={sub.id} style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, color: '#1A2E28', marginBottom: 4 }}>{sub.missions?.title}</h3>
            <p style={{ fontSize: 12, color: '#5A7A6E', marginBottom: '0.75rem' }}>Enviado recientemente</p>

            <div style={{ display: 'flex', gap: 10, marginBottom: '0.75rem' }}>
              <div style={{ backgroundColor: '#EDF3F0', borderRadius: 8, padding: '8px 14px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#5A7A6E', marginBottom: 2 }}>CANTIDAD</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#2C4A3E' }}>{sub.count}</div>
              </div>
              <div style={{ backgroundColor: '#EDF3F0', borderRadius: 8, padding: '8px 14px', flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#5A7A6E', marginBottom: 2 }}>ACIERTOS</div>
                <div style={{ fontSize: 18, fontWeight: 500, color: '#2C4A3E' }}>{sub.accuracy}%</div>
              </div>
            </div>

            {sub.game_link && (
              <a href={sub.game_link} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#3D6B5C', display: 'block', marginBottom: 8 }}>Ver partida →</a>
            )}

            {sub.feeling && (
              <p style={{ fontSize: 13, color: '#5A7A6E', fontStyle: 'italic', marginBottom: '0.75rem' }}>"{sub.feeling}"</p>
            )}

            <textarea
              placeholder="Escribe tu feedback aquí..."
              value={feedbacks[sub.id] || ''}
              onChange={e => setFeedbacks({ ...feedbacks, [sub.id]: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #E8E0D0', fontSize: 13, fontFamily: 'Inter, sans-serif', minHeight: 80, backgroundColor: '#F7F3EC', color: '#1A2E28', marginBottom: 10, resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => handleFeedback(sub.id, 'level_up')}
                style={{ flex: 1, padding: '10px', backgroundColor: '#2C4A3E', border: 'none', borderRadius: 8, color: '#F7F3EC', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Subir de nivel ↑
              </button>
              <button
                onClick={() => handleFeedback(sub.id, 'repeat')}
                style={{ flex: 1, padding: '10px', backgroundColor: '#F7F3EC', border: '1px solid #E8E0D0', borderRadius: 8, color: '#5A7A6E', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Repetir módulo
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin