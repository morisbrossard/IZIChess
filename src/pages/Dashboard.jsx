import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Dashboard({ t, lang, setLang }) {
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
      <div style={{ backgroundColor: '#2C4A3E', padding: '1.5rem 2rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)' }}>
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} style={{ backgroundColor: (Math.floor(i / 8) + i) % 2 === 0 ? '#fff' : 'transparent' }} />
          ))}
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }}>♟</div>
          <div>
            <h1 style={{ color: '#F7F3EC', fontSize: 22, fontFamily: 'Playfair Display, serif', fontWeight: 600, letterSpacing: 2 }}>{t.appName}</h1>
            <p style={{ color: '#9DB8A8', fontSize: 12, letterSpacing: 1 }}>{t.appSubtitle}</p>
          </div>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            style={{ backgroundColor: 'transparent', border: '1px solid #5A7A6E', borderRadius: 8, padding: '6px 14px', fontSize: 13, color: '#E8E0D0', cursor: 'pointer' }}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={() => navigate('/admin')}
            style={{ backgroundColor: 'transparent', border: '1px solid #5A7A6E', borderRadius: 8, padding: '6px 14px', fontSize: 13, color: '#E8E0D0', cursor: 'pointer' }}
          >
            {t.adminPanel}
          </button>
        </div>
      </div>

      {/* Layout 3 columnas */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 260px', gap: '1.5rem', maxWidth: 1200, margin: '0 auto', padding: '1.5rem' }}>

        {/* Columna izquierda */}
        <div>
          <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#2C4A3E', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 12px' }}>♚</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, color: '#1A2E28', fontWeight: 600 }}>Jugador</div>
            <div style={{ fontSize: 12, color: '#5A7A6E', marginTop: 2 }}>{t.currentLevel} 1: Free Piece Giver</div>
            <div style={{ backgroundColor: '#E8E0D0', borderRadius: 20, height: 6, marginTop: 12 }}>
              <div style={{ backgroundColor: '#3D6B5C', height: 6, borderRadius: 20, width: '10%' }}></div>
            </div>
            <div style={{ fontSize: 12, color: '#5A7A6E', marginTop: 6 }}>10% {t.completed}</div>
          </div>

          <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{t.stats}</div>
            {[
              { label: t.gamesPlayed, value: '0', icon: '♜' },
              { label: t.puzzlesSolved, value: '0', icon: '♞' },
              { label: t.daysActive, value: '1', icon: '♝' },
              { label: t.missionsCompleted, value: '0', icon: '♛' },
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid #E8E0D0' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{stat.icon}</span>
                  <span style={{ fontSize: 13, color: '#5A7A6E' }}>{stat.label}</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#2C4A3E' }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Columna central */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#2C4A3E', marginBottom: '1rem' }}>{t.activeMissions}</h2>
          {missions.map((mission, i) => (
            <div
              key={mission.id}
              onClick={() => navigate(`/mission/${mission.id}`)}
              style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#3D6B5C'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#E8E0D0'}
            >
              <div style={{ backgroundColor: '#EDF3F0', borderRadius: 8, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                {['♜', '♞', '♝'][i % 3]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 3, color: '#1A2E28' }}>{mission.title}</div>
                <div style={{ fontSize: 13, color: '#5A7A6E', lineHeight: 1.5 }}>{mission.description}</div>
              </div>
              <div style={{ color: '#5A7A6E', fontSize: 18 }}>→</div>
            </div>
          ))}
        </div>

        {/* Columna derecha */}
        <div>
          {missions.length > 0 && (
            <div
              onClick={() => navigate(`/mission/${missions[0].id}`)}
              style={{ backgroundColor: '#2C4A3E', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', cursor: 'pointer' }}
            >
              <div style={{ fontSize: 11, color: '#9DB8A8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>{t.nextStep}</div>
              <div style={{ fontSize: 15, fontFamily: 'Playfair Display, serif', color: '#F7F3EC', marginBottom: 4 }}>{missions[0].title}</div>
              <div style={{ fontSize: 12, color: '#9DB8A8', lineHeight: 1.5 }}>{missions[0].description}</div>
              <div style={{ marginTop: 12, fontSize: 13, color: '#F7F3EC' }}>{t.start}</div>
            </div>
          )}

          <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{t.leaderboard}</div>
            {[
              { pos: 1, nombre: 'Carlos', puntos: 320, tu: false },
              { pos: 2, nombre: 'Tú', puntos: 210, tu: true },
              { pos: 3, nombre: 'María', puntos: 180, tu: false },
              { pos: 4, nombre: 'Jorge', puntos: 90, tu: false },
            ].map((u, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderBottom: i < 3 ? '1px solid #E8E0D0' : 'none', backgroundColor: u.tu ? '#EDF3F0' : 'transparent', borderRadius: u.tu ? 8 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? '#B8960C' : '#5A7A6E', width: 16, textAlign: 'center' }}>{u.pos}</div>
                <div style={{ backgroundColor: u.tu ? '#2C4A3E' : '#E8E0D0', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: u.tu ? '#F7F3EC' : '#5A7A6E', fontWeight: 600, flexShrink: 0 }}>
                  {u.nombre[0]}
                </div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: u.tu ? 600 : 400, color: '#1A2E28' }}>{u.nombre}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2C4A3E' }}>{u.puntos} pts</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase' }}>{t.friends}</div>
              <button style={{ backgroundColor: 'transparent', border: '1px solid #E8E0D0', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: '#5A7A6E', cursor: 'pointer' }}>{t.add}</button>
            </div>
            {[
              { nombre: 'Carlos', nivel: 'Level 2', activo: true },
              { nombre: 'María', nivel: 'Level 1', activo: true },
              { nombre: 'Jorge', nivel: 'Level 1', activo: false },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 2 ? '1px solid #E8E0D0' : 'none' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ backgroundColor: '#E8E0D0', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#5A7A6E', fontWeight: 600 }}>
                    {a.nombre[0]}
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: '50%', backgroundColor: a.activo ? '#3D6B5C' : '#E8E0D0', border: '1px solid #FDFCFA' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1A2E28' }}>{a.nombre}</div>
                  <div style={{ fontSize: 11, color: '#5A7A6E' }}>{a.nivel}</div>
                </div>
                <button style={{ backgroundColor: 'transparent', border: '1px solid #E8E0D0', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: '#5A7A6E', cursor: 'pointer' }}>{t.chat}</button>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: '#FDFCFA', border: '1px solid #E8E0D0', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#5A7A6E', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{t.levels}</div>
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
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 11 ? '1px solid #E8E0D0' : 'none', opacity: n.activo ? 1 : 0.4 }}>
                <div style={{ backgroundColor: n.activo ? '#2C4A3E' : '#E8E0D0', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: n.activo ? '#F7F3EC' : '#5A7A6E', fontWeight: 600, flexShrink: 0 }}>{n.nivel}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#1A2E28' }}>{n.nombre}</div>
                  <div style={{ fontSize: 11, color: '#5A7A6E' }}>{n.activo ? t.inProgress : n.puntos}</div>
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