import { useNavigate } from 'react-router-dom'

function Feedback() {
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={() => navigate('/')}>← Volver</button>
      <h1 style={{ margin: '1rem 0 0.5rem' }}>Tu resultado</h1>

      <div style={{ background: '#fff8e1', border: '1px solid #f0c040', borderRadius: 8, padding: '1.25rem', margin: '1rem 0' }}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>📌</div>
        <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Repite este módulo</div>
        <p style={{ fontSize: 13, color: '#666' }}>Casi lo logras. Con un poco más de práctica estarás listo para el nivel 2.</p>
      </div>

      <h2 style={{ marginBottom: '0.75rem' }}>Comentarios del entrenador</h2>
      <div style={{ border: '1px solid #eee', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
        <p style={{ lineHeight: 1.7 }}>"Buen trabajo en los puzzles. Pero en las partidas estás dejando piezas colgadas. Verifica cada movimiento antes de hacerlo."</p>
      </div>

      <button
        onClick={() => navigate('/')}
        style={{ width: '100%', padding: '10px', background: '#f0c040', border: 'none', borderRadius: 8, fontWeight: 500, cursor: 'pointer' }}
      >
        Seguir entrenando
      </button>
    </div>
  )
}

export default Feedback