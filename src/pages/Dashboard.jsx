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
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>IZIChess</h1>
      <p style={{ color: '#888', marginBottom: '1.5rem' }}>Nivel 1: Fundamentos</p>

      <h2 style={{ marginBottom: '1rem' }}>Misiones activas</h2>
      {missions.map(mission => (
        <div
          key={mission.id}
          onClick={() => navigate(`/mission/${mission.id}`)}
          style={{
            border: '1px solid #eee',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <h3>{mission.title}</h3>
          <p style={{ color: '#888', fontSize: 14 }}>{mission.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard