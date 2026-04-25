import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import Header from '../components/Header'
import { colors } from '../theme.js'

function Complete({ t }) {
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
    border: '1px solid #D8E0EE',
    fontSize: 14,
    backgroundColor: '#F4F6FA',
    color: '#0F1B35',
    fontFamily: 'Inter, sans-serif'
  }

  const labelStyle = {
    display: 'block',
    fontSize: 11,
    fontWeight: 500,
    color: '#4A5F82',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA' }}>

      <Header t={t} subtitle={t.completeMission} />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#0F1B35', marginBottom: 4 }}>{t.howDidItGo}</h1>
        <p style={{ fontSize: 14, color: '#4A5F82', marginBottom: '1.5rem' }}>{t.tellCoach}</p>

        {/* Grid de campos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem' }}>
            <label style={labelStyle}>{t.gamesOrPuzzles}</label>
            <input type="number" placeholder="Ej: 3" value={form.count} onChange={e => setForm({...form, count: e.target.value})} style={inputStyle} />
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem' }}>
            <label style={labelStyle}>{t.accuracy}</label>
            <input type="number" placeholder="Ej: 70" value={form.accuracy} onChange={e => setForm({...form, accuracy: e.target.value})} style={inputStyle} />
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <label style={labelStyle}>{t.gameLink}</label>
          <input type="url" placeholder="https://lichess.org/..." value={form.game_link} onChange={e => setForm({...form, game_link: e.target.value})} style={inputStyle} />
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <label style={labelStyle}>{t.howDidYouFeel}</label>
          <textarea
            placeholder="Ej: Me costó el final de partida..."
            value={form.feeling}
            onChange={e => setForm({...form, feeling: e.target.value})}
            style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
          />
        </div>

        {/* Puntos */}
        <div style={{ backgroundColor: '#0F1B35', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#4A5F82', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Puntos al completar</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#F5C842' }}>+50 pts</div>
          </div>
          <div style={{ fontSize: 36 }}>🏆</div>
        </div>

        <button
          onClick={handleSubmit}
          style={{ width: '100%', padding: '14px', backgroundColor: '#F5C842', border: 'none', borderRadius: 12, color: '#0F1B35', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          {t.sendProgressBtn}
        </button>

      </div>
    </div>
  )
}

export default Complete