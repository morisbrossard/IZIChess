import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

function Complete() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ count: '', accuracy: '', game_link: '', feeling: '' })

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

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #E8E0D0',
    fontSize: 14,
    backgroundColor: '#FDFCFA',
    color: '#1A2E28',
    fontFamily: 'Inter, sans-serif'
  }

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 500,
    color: '#5A7A6E',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F3EC' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#2C4A3E', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: '1px solid #5A7A6E', borderRadius: 8, padding: '6px 14px', color: '#E8E0D0', fontSize: 13, cursor: 'pointer' }}
        >
          ← Volver
        </button>
        <span style={{ color: '#E8E0D0', fontSize: 13 }}>Completar misión</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1A2E28', marginBottom: 4 }}>¿Cómo te fue?</h1>
        <p style={{ fontSize: 14, color: '#5A7A6E', marginBottom: '1.5rem' }}>Cuéntale al entrenador tu resultado.</p>

        <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.5rem' }}>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Partidas / Puzzles completados</label>
            <input type="number" placeholder="Ej: 3" value={form.count} onChange={e => setForm({...form, count: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>% de aciertos</label>
            <input type="number" placeholder="Ej: 70" value={form.accuracy} onChange={e => setForm({...form, accuracy: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={labelStyle}>Link de partida</label>
            <input type="url" placeholder="https://lichess.org/..." value={form.game_link} onChange={e => setForm({...form, game_link: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>¿Cómo te sentiste? (opcional)</label>
            <textarea
              placeholder="Ej: Me costó el final de partida..."
              value={form.feeling}
              onChange={e => setForm({...form, feeling: e.target.value})}
              style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#2C4A3E',
              border: 'none',
              borderRadius: 12,
              color: '#F7F3EC',
              fontSize: 15,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Enviar progreso →
          </button>

        </div>
      </div>
    </div>
  )
}

export default Complete