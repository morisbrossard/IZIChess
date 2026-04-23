import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

function Complete() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    count: '',
    accuracy: '',
    game_link: '',
    feeling: ''
  })

  const handleSubmit = async () => {
    await supabase.from('submissions').insert({
      mission_id: id,
      count: parseInt(form.count),
      accuracy: parseInt(form.accuracy),
      game_link: form.game_link,
      feeling: form.feeling
    })
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h1 style={{ margin: '1rem 0 0.25rem' }}>¿Cómo te fue?</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>Cuéntale al entrenador tu resultado.</p>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>Partidas / Puzzles completados</label>
        <input type="number" placeholder="Ej: 3" value={form.count} onChange={e => setForm({...form, count: e.target.value})} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>% de aciertos</label>
        <input type="number" placeholder="Ej: 70" value={form.accuracy} onChange={e => setForm({...form, accuracy: e.target.value})} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>Link de partida</label>
        <input type="url" placeholder="https://lichess.org/..." value={form.game_link} onChange={e => setForm({...form, game_link: e.target.value})} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: 6 }}>¿Cómo te sentiste? (opcional)</label>
        <textarea placeholder="Ej: Me costó el final de partida..." value={form.feeling} onChange={e => setForm({...form, feeling: e.target.value})} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd', minHeight: 80 }} />
      </div>

      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: '10px', background: '#f0c040', border: 'none', borderRadius: 8, fontWeight: 500, cursor: 'pointer' }}
      >
        Enviar progreso →
      </button>
    </div>
  )
}

export default Complete