import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Header from '../components/Header'
import { colors } from '../theme.js'

function Dashboard({ t, lang, setLang, user }) {
  const [missions, setMissions] = useState([])
  const [error, setError] = useState('')
  const [loadingMissions, setLoadingMissions] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {  // ← y este useEffect aquí
    const getUserName = async () => {
      const { data } = await supabase
        .from('users')
        .select('name')
        .eq('id', user.id)
        .single()
        setUserName(data?.name || user?.email?.split('@')[0])
    }
    getUserName()
  }, [])

  useEffect(() => {
    
    const getMissions = async () => {
      try {
        const { data, error } = await supabase
          .from('missions')
          .select('*')
          .eq('level', 1)
        if (error) throw error
        setMissions(data || [])
      } catch (err) {
        setError(t.errorMissions)
      } finally {
        setLoadingMissions(false)
      }
    }
    getMissions()
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg }}>

      <Header t={t} lang={lang} setLang={setLang} showAuth={true} subtitle={t.appSubtitle} />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 260px', gap: '1.5rem', maxWidth: 1200, margin: '0 auto', padding: '1.5rem' }}>

        {/* Columna izquierda */}
        <div>
          <div style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: colors.primary, borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 12px' }}>♚</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: colors.textPrimary, fontWeight: 600 }}>{userName}</div>
            <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 2 }}>{t.currentLevel} 1: Free Piece Giver</div>
            <div style={{ backgroundColor: colors.border, borderRadius: 20, height: 6, marginTop: 12 }}>
              <div style={{ backgroundColor: colors.accent, height: 6, borderRadius: 20, width: '10%' }}></div>
            </div>
            <div style={{ fontSize: 12, color: colors.textSecondary, marginTop: 6 }}>10% {t.completed}</div>
          </div>

          <div style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: colors.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{t.stats}</div>
            {[
              { label: t.gamesPlayed, value: '0', icon: '♜' },
              { label: t.puzzlesSolved, value: '0', icon: '♞' },
              { label: t.daysActive, value: '1', icon: '♝' },
              { label: t.missionsCompleted, value: '0', icon: '♛' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{stat.icon}</span>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: colors.textPrimary }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div
        onClick={() => navigate('/feedback')}
        style={{ backgroundColor: colors.accent, borderRadius: 12, padding: '1rem 1.25rem', marginTop: '1rem', cursor: 'pointer', textAlign: 'center' }}
>
        <div style={{ fontSize: 11, fontWeight: 600, color: colors.primary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Ver mi feedback</div>
        <div style={{ fontSize: 13, color: colors.primary }}>Revisa la evaluación del entrenador →</div>
        </div>
        
        {/* Columna central */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: colors.textPrimary, marginBottom: '1rem' }}>{t.activeMissions}</h2>

          {loadingMissions && (
            <p style={{ fontSize: 13, color: colors.textSecondary }}>{t.loadingMissions}</p>
          )}

          {error && (
            <div style={{ backgroundColor: colors.dangerBg, border: `1px solid ${colors.dangerBorder}`, borderRadius: 8, padding: '10px 14px', fontSize: 13, color: colors.danger, marginBottom: 12 }}>
              {error}
            </div>
          )}

          {missions.map((mission, i) => (
            <div
              key={mission.id}
              onClick={() => navigate(`/mission/${mission.id}`)}
              style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem', marginBottom: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = colors.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = colors.border}
            >
              <div style={{ backgroundColor: colors.surfaceAlt, borderRadius: 8, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {['♜', '♞', '♝'][i % 3]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 3, color: colors.textPrimary }}>{lang === 'en' ? mission.title_en : mission.title}</div>
                <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.5 }}>{lang === 'en' ? mission.description_en : mission.description}</div>
              </div>
              <div style={{ color: colors.textSecondary, fontSize: 18 }}>→</div>
            </div>
          ))}
        </div>

        {/* Columna derecha */}
        <div>
          {missions.length > 0 && (
            <div
              onClick={() => navigate(`/mission/${missions[0].id}`)}
              style={{ backgroundColor: colors.primary, borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', cursor: 'pointer' }}
            >
              <div style={{ fontSize: 11, color: colors.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{t.nextStep}</div>
              <div style={{ fontSize: 15, fontFamily: 'Playfair Display, serif', color: colors.bg, marginBottom: 4 }}>{lang === 'en' ? missions[0].title_en : missions[0].title}</div>
              <div style={{ fontSize: 12, color: colors.textSecondary, lineHeight: 1.5 }}>{lang === 'en' ? missions[0].description_en : missions[0].description}</div>
              <div style={{ marginTop: 12, fontSize: 13, color: colors.accent }}>{t.start}</div>
            </div>
          )}

          <div style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: colors.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{t.leaderboard}</div>
            {[
              { pos: 1, nombre: 'Carlos', puntos: 320, tu: false },
              { pos: 2, nombre: 'Tú', puntos: 210, tu: true },
              { pos: 3, nombre: 'María', puntos: 180, tu: false },
              { pos: 4, nombre: 'Jorge', puntos: 90, tu: false },
            ].map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none', backgroundColor: u.tu ? colors.surfaceAlt : 'transparent', borderRadius: u.tu ? 8 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? colors.accent : colors.textSecondary, width: 16, textAlign: 'center' }}>{u.pos}</div>
                <div style={{ backgroundColor: u.tu ? colors.primary : colors.border, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: u.tu ? colors.bg : colors.textSecondary, fontWeight: 600, flexShrink: 0 }}>
                  {u.nombre[0]}
                </div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: u.tu ? 600 : 400, color: colors.textPrimary }}>{u.nombre}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary }}>{u.puntos} pts</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: colors.textSecondary, letterSpacing: 1, textTransform: 'uppercase' }}>{t.friends}</div>
              <button style={{ backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: 6, padding: '3px 10px', fontSize: 11, color: colors.textSecondary, cursor: 'pointer' }}>{t.add}</button>
            </div>
            {[
              { nombre: 'Carlos', nivel: 'Level 2', activo: true },
              { nombre: 'María', nivel: 'Level 1', activo: true },
              { nombre: 'Jorge', nivel: 'Level 1', activo: false },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ backgroundColor: colors.border, borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: colors.textSecondary, fontWeight: 600 }}>
                    {a.nombre[0]}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', backgroundColor: a.activo ? colors.accent : colors.border, border: `1px solid ${colors.surface}` }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary }}>{a.nombre}</div>
                  <div style={{ fontSize: 11, color: colors.textSecondary }}>{a.nivel}</div>
                </div>
                <button style={{ backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: 6, padding: '3px 10px', fontSize: 11, color: colors.textSecondary, cursor: 'pointer' }}>{t.chat}</button>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: colors.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{t.levels}</div>
            {[
              { nivel: 1, nombre: 'Free Piece Giver', puntos: '0 - 149 pts', activo: true },
              { nivel: 2, nombre: "That's Gotta Hurt", puntos: '150 - 349 pts', activo: false },
              { nivel: 3, nombre: 'Trap Enjoyer', puntos: '350 - 599 pts', activo: false },
              { nivel: 4, nombre: 'Rating Chaser', puntos: '600 - 899 pts', activo: false },
              { nivel: 5, nombre: 'Gambit Accepted', puntos: '900 - 1249 pts', activo: false },
              { nivel: 6, nombre: 'Stockfish Disagrees', puntos: '1250 - 1649 pts', activo: false },
              { nivel: 7, nombre: 'Sacrifice Accepted', puntos: '1650 - 2099 pts', activo: false },
              { nivel: 8, nombre: 'Nepo Moment', puntos: '2100 - 2599 pts', activo: false },
              { nivel: 9, nombre: 'Hikaru Was Bored', puntos: '2600 - 3149 pts', activo: false },
              { nivel: 10, nombre: 'The Computer Says No', puntos: '3150 - 3749 pts', activo: false },
              { nivel: 11, nombre: 'Almost a GM', puntos: '3750 - 4499 pts', activo: false },
              { nivel: 12, nombre: 'Magnus Carlsen Level', puntos: '4500+ pts', activo: false },
            ].map((n, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 11 ? `1px solid ${colors.border}` : 'none', opacity: n.activo ? 1 : 0.4 }}>
                <div style={{ backgroundColor: n.activo ? colors.primary : colors.border, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: n.activo ? colors.accent : colors.textSecondary, fontWeight: 600, flexShrink: 0 }}>{n.nivel}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: colors.textPrimary }}>{n.nombre}</div>
                  <div style={{ fontSize: 11, color: colors.textSecondary }}>{n.activo ? t.inProgress : n.puntos}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard