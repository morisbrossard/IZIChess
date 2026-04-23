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

  if (!mission) return <p>Cargando...</p>

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/')}>← Volver</button>
      <h1 style={{ margin: '1rem 0 0.5rem' }}>{mission.title}</h1>
      <p style={{ color: '#888', marginBottom: '1rem' }}>{mission.description}</p>
      <div style={{ background: '#f5f5f5', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
        <strong>Objetivo:</strong>
        <p>{mission.criteria}</p>
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <strong>Cómo completarla:</strong>
        <p style={{ color: '#888', marginTop: 4 }}>{mission.how_to}</p>
      </div>
      <button
        onClick={() => navigate(`/complete/${id}`)}
        style={{ width: '100%', padding: '10px', background: '#f0c040', border: 'none', borderRadius: 8, fontWeight: 500, cursor: 'pointer' }}
      >
        Enviar mi progreso →
      </button>
    </div>
  )
}

export default Mission