import { useState } from 'react'
import { supabase } from '../supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (isRegister) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('Email o contraseña incorrectos')
    }

    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #D8E0EE',
    fontSize: 14,
    backgroundColor: '#F4F6FA',
    color: '#0F1B35',
    fontFamily: 'Inter, sans-serif',
    marginBottom: 12
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F6FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D8E0EE', borderRadius: 12, padding: '2rem', width: 360, textAlign: 'center' }}>
        
        <img src="/logo.png" alt="IZIChess" style={{ width: 170, height: 170, objectFit: 'contain', marginBottom: 12 }} />
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#0F1B35', marginBottom: 4 }}>IZIChess</h2>
        <p style={{ fontSize: 13, color: '#4A5F82', marginBottom: '1.5rem' }}>
          {isRegister ? 'Crea tu cuenta para empezar' : 'Inicia sesión para continuar'}
        </p>

        {error && (
          <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #FFCDD2', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#C62828', marginBottom: 12 }}>
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', padding: '12px', backgroundColor: '#F5C842', border: 'none', borderRadius: 8, color: '#0F1B35', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginBottom: 12 }}
        >
          {loading ? 'Cargando...' : isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </button>

        <button
          onClick={() => { setIsRegister(!isRegister); setError('') }}
          style={{ background: 'none', border: 'none', fontSize: 13, color: '#4A5F82', cursor: 'pointer' }}
        >
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>

      </div>
    </div>
  )
}

export default Login