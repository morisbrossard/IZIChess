import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Header from '../components/Header'
import { colors } from '../theme.js'

function Feedback({ t }) {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFeedback = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('submissions')
        .select('*, missions(title)')
        .eq('user_id', user.id)
        .eq('status', 'reviewed')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      setFeedback(data)
      setLoading(false)
    }
    getFeedback()
  }, [])

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: colors.textSecondary }}>Cargando...</p>
    </div>
  )

  if (!feedback) return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg }}>
      <Header t={t} subtitle={t.coachFeedback} />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>♟</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: colors.textPrimary, marginBottom: 8 }}>No hay feedback aún</h2>
        <p style={{ fontSize: 14, color: colors.textSecondary, marginBottom: '1.5rem' }}>Completa una misión y espera la evaluación del entrenador.</p>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '12px 24px', backgroundColor: colors.accent, border: 'none', borderRadius: 8, color: colors.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          {t.keepTraining}
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.bg }}>

      <Header t={t} subtitle={t.coachFeedback} />

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '1.5rem' }}>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: colors.textPrimary, marginBottom: '1.25rem' }}>{t.coachFeedback}</h1>

        {/* Misión */}
        <div style={{ backgroundColor: colors.primary, borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>♟</span>
          <div>
            <div style={{ fontSize: 11, color: colors.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>Misión evaluada</div>
            <div style={{ fontSize: 15, color: colors.bg, fontFamily: 'Playfair Display, serif' }}>{feedback.missions?.title}</div>
          </div>
        </div>

        {/* Resultado */}
        <div style={{ backgroundColor: feedback.result === 'level_up' ? colors.successBg : colors.dangerBg, border: `1px solid ${feedback.result === 'level_up' ? colors.successBorder : colors.dangerBorder}`, borderRadius: 12, padding: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 40 }}>{feedback.result === 'level_up' ? '🏆' : '📌'}</div>
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: feedback.result === 'level_up' ? colors.success : colors.danger, marginBottom: 4 }}>
              {feedback.result === 'level_up' ? '¡Subiste de nivel!' : 'Repite este módulo'}
            </div>
            <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>
              {feedback.result === 'level_up' ? '¡Excelente trabajo! Estás listo para el siguiente nivel.' : 'Casi lo logras. Con un poco más de práctica estarás listo.'}
            </p>
          </div>
        </div>

        {/* Comentarios */}
        <div style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 11, fontWeight: 500, color: colors.textSecondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Comentarios del entrenador</div>
          <p style={{ fontSize: 14, color: colors.textPrimary, lineHeight: 1.7, fontStyle: 'italic' }}>"{feedback.feedback}"</p>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{ width: '100%', padding: '14px', backgroundColor: colors.accent, border: 'none', borderRadius: 12, color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
        >
          {t.keepTraining}
        </button>

      </div>
    </div>
  )
}

export default Feedback