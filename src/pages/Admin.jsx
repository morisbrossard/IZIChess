import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

function Admin() {
  const [submissions, setSubmissions] = useState([])
  const [feedbacks, setFeedbacks] = useState({})

  useEffect(() => {
    const getSubmissions = async () => {
      const { data } = await supabase
        .from('submissions')
        .select('*, missions(title)')
        .eq('status', 'pending')
      setSubmissions(data || [])
    }
    getSubmissions()
  }, [])

  const handleFeedback = async (id, result) => {
    await supabase
      .from('submissions')
      .update({
        status: 'reviewed',
        feedback: feedbacks[id] || '',
        result: result
      })
      .eq('id', id)
    setSubmissions(submissions.filter(s => s.id !== id))
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Panel del entrenador</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>Envíos pendientes de revisión</p>

      {submissions.length === 0 && (
        <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No hay envíos pendientes</p>
      )}

      {submissions.map(sub => (
        <div key={sub.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ marginBottom: 4 }}>{sub.missions?.title}</h3>
          <div style={{ display: 'flex', gap: 16, margin: '0.75rem 0', fontSize: 14 }}>
            <span>Cantidad: <strong>{sub.count}</strong></span>
            <span>Aciertos: <strong>{sub.accuracy}%</strong></span>
          </div>
          {sub.game_link && (
            <a href={sub.game_link} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#666', display: 'block', marginBottom: 8 }}>Ver partida →</a>
          )}
          {sub.feeling && (
            <p style={{ fontSize: 13, color: '#888', marginBottom: '0.75rem' }}>"{sub.feeling}"</p>
          )}
          <textarea
            placeholder="Escribe tu feedback aquí..."
            value={feedbacks[sub.id] || ''}
            onChange={e => setFeedbacks({ ...feedbacks, [sub.id]: e.target.value })}
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd', minHeight: 70, marginBottom: 8 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => handleFeedback(sub.id, 'level_up')}
              style={{ flex: 1, padding: '8px', background: '#f0c040', border: 'none', borderRadius: 6, fontWeight: 500, cursor: 'pointer' }}
            >
              Subir de nivel
            </button>
            <button
              onClick={() => handleFeedback(sub.id, 'repeat')}
              style={{ flex: 1, padding: '8px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer' }}
            >
              Repetir módulo
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Admin