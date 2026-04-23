import { useNavigate } from 'react-router-dom'

function Feedback() {
  const navigate = useNavigate()

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
        <span style={{ color: '#E8E0D0', fontSize: 13 }}>Tu resultado</span>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '1.5rem' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1A2E28', marginBottom: '1.25rem' }}>Feedback del entrenador</h1>

        {/* Resultado */}
        <div style={{ backgroundColor: '#EDF3F0', border: '1px solid #3D6B5C', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📌</div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#2C4A3E', marginBottom: 4 }}>Repite este módulo</div>
          <p style={{ fontSize: 13, color: '#5A7A6E', lineHeight: 1.6 }}>Casi lo logras. Con un poco más de práctica estarás listo para el nivel 2.</p>
        </div>

        {/* Comentarios */}
        <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Comentarios</div>
          <p style={{ fontSize: 14, color: '#1A2E28', lineHeight: 1.7 }}>"Buen trabajo en los puzzles. Pero en las partidas estás dejando piezas colgadas. Verifica cada movimiento antes de hacerlo."</p>
        </div>

        {/* Qué mejorar */}
        <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Qué mejorar</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
            <span style={{ color: '#C0392B', marginTop: 2 }}>●</span>
            <p style={{ fontSize: 13, color: '#1A2E28' }}>Pierdes piezas sin defensa en el mediojuego</p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ color: '#3D6B5C', marginTop: 2 }}>●</span>
            <p style={{ fontSize: 13, color: '#1A2E28' }}>Buen progreso en puzzles de mate</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
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
          Seguir entrenando
        </button>

      </div>
    </div>
  )
}

export default Feedback