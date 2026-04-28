import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import { colors } from '../theme.js'

function Header({ t, lang, setLang, showAuth = false, subtitle }) {
  console.log('signOut:', t?.signOut)
  const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: colors.primary, padding: '0 2rem', height: 90, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      {/* Tablero decorativo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
        {Array.from({ length: 64 }).map((_, i) => (
          <div key={i} style={{ backgroundColor: (Math.floor(i / 8) + i) % 2 === 0 ? '#fff' : 'transparent' }} />
        ))}
      </div>

      {/* Logo y nombre */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => navigate('/')}>
        <img src="/logo.png" alt="IZIChess" style={{ width: 170, height: 170, objectFit: 'contain' }} />
        <div>
          <h1 style={{ color: colors.bg, fontSize: 22, fontFamily: 'Playfair Display, serif', fontWeight: 600, letterSpacing: 2 }}>IZIChess</h1>
          <p style={{ color: colors.accent, fontSize: 12, letterSpacing: 1 }}>{subtitle}</p>
        </div>
      </div>

      {/* Botones derecha */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
        {lang && setLang && (
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            style={{ backgroundColor: 'transparent', border: `1px solid ${colors.borderStrong}`, borderRadius: 8, padding: '6px 14px', fontSize: 13, color: colors.bg, cursor: 'pointer' }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        )}
        {showAuth && (
          <>
            <button
              onClick={() => navigate('/admin')}
              style={{ backgroundColor: 'transparent', border: `1px solid ${colors.borderStrong}`, borderRadius: 8, padding: '6px 14px', fontSize: 13, color: colors.bg, cursor: 'pointer' }}
            >
              {t.adminPanel}
            </button>
            <button
              onClick={async () => await supabase.auth.signOut()}
              style={{ backgroundColor: 'transparent', border: `1px solid ${colors.borderStrong}`, borderRadius: 8, padding: '6px 14px', fontSize: 13, color: colors.bg, cursor: 'pointer' }}
            >
              {t?.signOut || 'Cerrar sesión'}
            </button>
          </>
        )}
        {!showAuth && (
          <button
            onClick={() => navigate(-1)}
            style={{ backgroundColor: 'transparent', border: `1px solid ${colors.borderStrong}`, borderRadius: 8, padding: '6px 14px', fontSize: 13, color: colors.bg, cursor: 'pointer' }}
          >
            {t?.back || '← Volver'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Header