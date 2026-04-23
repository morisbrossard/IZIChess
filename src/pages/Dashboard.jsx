import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Dashboard() {
  const [missions, setMissions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getMissions = async () => {
      const { data } = await supabase
        .from('missions')
        .select('*')
        .eq('level', 1)
      setMissions(data || [])
    }
    getMissions()
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7F3EC' }}>
      
      {/* Header */}
      <div style={{
        backgroundColor: '#2C4A3E',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>♟</div>
        <h1 style={{
          color: '#F7F3EC',
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: 2
        }}>IZIChess</h1>
        <p style={{
          color: '#E8E0D0',
          fontSize: 13,
          marginTop: 4,
          letterSpacing: 1
        }}>Tu entrenador personal</p>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>

        {/* Nivel */}
        <div style={{
          backgroundColor: '#FDFCFA',
          border: '1px solid #E8E0D0',
          borderRadius: 12,
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <div style={{
            backgroundColor: '#2C4A3E',
            borderRadius: '50%',
            width: 52,
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            flexShrink: 0
          }}>♙</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#5A7A6E', marginBottom: 2 }}>Nivel actual</div>
            <div style={{ fontSize: 17, fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Nivel 1: Fundamentos</div>
            <div style={{ backgroundColor: '#E8E0D0', borderRadius: 20, height: 6, marginTop: 8 }}>
              <div style={{ backgroundColor: '#3D6B5C', height: 6, borderRadius: 20, width: '67%' }}></div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#5A7A6E' }}>67%</div>
        </div>

        {/* Misiones */}
        <h2 style={{ fontSize: 20, marginBottom: '1rem', color: '#2C4A3E' }}>Misiones activas</h2>

        {missions.map((mission, i) => (
          <div
            key={mission.id}
            onClick={() => navigate(`/mission/${mission.id}`)}
            style={{
              backgroundColor: '#FDFCFA',
              border: '1px solid #E8E0D0',
              borderRadius: 12,
              padding: '1.25rem',
              marginBottom: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#3D6B5C'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E0D0'}
          >
            <div style={{
              backgroundColor: '#EDF3F0',
              borderRadius: 8,
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0
            }}>
              {['♜', '♞', '♝'][i % 3]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 3 }}>{mission.title}</div>
              <div style={{ fontSize: 13, color: '#5A7A6E', lineHeight: 1.5 }}>{mission.description}</div>
            </div>
            <div style={{ color: '#5A7A6E', fontSize: 18 }}>→</div>
          </div>
        ))}

        {/* Admin */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #E8E0D0',
              borderRadius: 8,
              padding: '8px 20px',
              fontSize: 13,
              color: '#5A7A6E'
            }}
          >
            Panel entrenador
          </button>
        </div>

      </div>
    </div>
  )
}

export default Dashboard