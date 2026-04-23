import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

function Mission() {
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

  if (!mission) return <p style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>Cargando...</p>

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F3EC' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#2C4A3E', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: '1px solid #5A7A6E', borderRadius: 8, padding: '6px 14px', color: '#E8E0D0', fontSize: 13, cursor: 'pointer' }}
        >
          ← Volver
        </button>
        <span style={{ color: '#E8E0D0', fontSize: 13 }}>Misión</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>

        {/* Título */}
        <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>♟</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1A2E28', marginBottom: 8 }}>{mission.title}</h1>
          <p style={{ fontSize: 14, color: '#5A7A6E', lineHeight: 1.7 }}>{mission.description}</p>
        </div>

        {/* Objetivo */}
        <div style={{ backgroundColor: '#EDF3F0', border: '1px solid #3D6B5C', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#2C4A3E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Objetivo medible</div>
          <p style={{ fontSize: 14, color: '#1A2E28', lineHeight: 1.6 }}>{mission.criteria}</p>
        </div>

        {/* Cómo completarla */}
        <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Cómo completarla</div>
          <p style={{ fontSize: 14, color: '#5A7A6E', lineHeight: 1.6 }}>{mission.how_to}</p>
        </div>

        {/* Botón */}
        <button
          onClick={() => navigate(`/complete/${id}`)}
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
          Enviar mi progreso →
        </button>

      </div>
    </div>
  )
}

export default Mission