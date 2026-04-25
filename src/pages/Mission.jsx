import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import Header from '../components/Header'
import { colors } from '../theme.js'

function Mission({ t }) {
  const { id } = useParams()
  const [mission, setMission] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getMission = async () => {
      const { data } = await supabase
        .from('missions')
        .select('*')
        .eq('id', id)
        .single()
      setMission(data)
    }
    getMission()
  }, [id])

  if (!mission) return <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</p>

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA' }}>

      <Header t={t} subtitle={t.mission} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem' }}>

        {/* Insignia nivel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.25rem' }}>
          <div style={{ backgroundColor: '#0F1B35', borderRadius: 8, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>♚</span>
            <span style={{ fontSize: 12, color: '#F5C842', fontWeight: 500 }}>Free Piece Giver</span>
          </div>
          <div style={{ fontSize: 12, color: '#4A5F82' }}>Nivel 1 · 10 pts</div>
        </div>

        {/* Tarjeta principal */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
            <div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#0F1B35', marginBottom: 8 }}>{mission.title}</h1>
              <p style={{ fontSize: 14, color: '#4A5F82', lineHeight: 1.7 }}>{mission.description}</p>
            </div>
            <div style={{ backgroundColor: '#EEF2FA', borderRadius: 10, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>♟</div>
          </div>

          {/* Barra de progreso */}
          <div style={{ borderTop: '1px solid #D8E0EE', paddingTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4A5F82', marginBottom: 6 }}>
              <span>Progreso de misión</span>
              <span>0 / 3 completado</span>
            </div>
            <div style={{ backgroundColor: '#D8E0EE', borderRadius: 20, height: 6 }}>
              <div style={{ backgroundColor: '#F5C842', height: 6, borderRadius: 20, width: '0%' }}></div>
            </div>
          </div>
        </div>

        {/* Grid objetivo + cómo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ backgroundColor: '#EEF2FA', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#0F1B35', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{t.measurableGoal}</div>
            <p style={{ fontSize: 14, color: '#0F1B35', lineHeight: 1.6 }}>{mission.criteria}</p>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#4A5F82', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{t.howToComplete}</div>
            <p style={{ fontSize: 14, color: '#4A5F82', lineHeight: 1.6 }}>{mission.how_to}</p>
          </div>
        </div>

        {/* Puntos que ganas */}
        <div style={{ backgroundColor: '#0F1B35', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, color: '#4A5F82', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Puntos al completar</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#F5C842' }}>+50 pts</div>
          </div>
          <div style={{ fontSize: 36 }}>🏆</div>
        </div>

        <button
          onClick={() => navigate(`/complete/${id}`)}
          style={{ width: '100%', padding: '14px', backgroundColor: '#F5C842', border: 'none', borderRadius: 12, color: '#0F1B35', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          {t.sendProgress}
        </button>

      </div>
    </div>
  )
}

export default Mission