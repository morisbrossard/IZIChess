import { useNavigate } from 'react-router-dom'

function Feedback({ t }) {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#0F1B35', padding: '0 2rem', height: 110, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} style={{ backgroundColor: (Math.floor(i / 8) + i) % 2 === 0 ? '#fff' : 'transparent' }} />
          ))}
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="IZIChess" style={{ width: 170, height: 170, objectFit: 'contain' }} />
          <div>
            <h1 style={{ color: '#F4F6FA', fontSize: 22, fontFamily: 'Playfair Display, serif', fontWeight: 600, letterSpacing: 2 }}>IZIChess</h1>
            <p style={{ color: '#F5C842', fontSize: 12, letterSpacing: 1 }}>{t.coachFeedback}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{ position: 'relative', background: 'none', border: '1px solid #4A5F82', borderRadius: 8, padding: '6px 14px', color: '#F4F6FA', fontSize: 13, cursor: 'pointer' }}
        >
          {t.back}
        </button>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#0F1B35', marginBottom: '1.25rem' }}>{t.coachFeedback}</h1>

        {/* Resultado */}
        <div style={{ backgroundColor: '#0F1B35', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 40 }}>📌</div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#F4F6FA', marginBottom: 4 }}>Repite este módulo</div>
            <p style={{ fontSize: 13, color: '#4A5F82', lineHeight: 1.6 }}>Casi lo logras. Con un poco más de práctica estarás listo para el siguiente nivel.</p>
          </div>
        </div>

        {/* Comentarios */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: '#4A5F82', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Comentarios</div>
          <p style={{ fontSize: 14, color: '#0F1B35', lineHeight: 1.7, fontStyle: 'italic' }}>"Buen trabajo en los puzzles. Pero en las partidas estás dejando piezas colgadas. Verifica cada movimiento antes de hacerlo."</p>
        </div>

        {/* Qué mejorar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#C62828', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Mejorar</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#C62828', marginTop: 2 }}>●</span>
              <p style={{ fontSize: 13, color: '#0F1B35' }}>Pierdes piezas sin defensa en el mediojuego</p>
            </div>
          </div>
          <div style={{ backgroundColor: '#F0F9F0', border: '1px solid #C8E6C9', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: '#2E7D32', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Bien hecho</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#2E7D32', marginTop: 2 }}>●</span>
              <p style={{ fontSize: 13, color: '#0F1B35' }}>Buen progreso en puzzles de mate</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{ width: '100%', padding: '14px', backgroundColor: '#F5C842', border: 'none', borderRadius: 12, color: '#0F1B35', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          {t.keepTraining}
        </button>

      </div>
    </div>
  )
}

export default Feedback