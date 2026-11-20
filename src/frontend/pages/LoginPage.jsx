import { useState } from 'react'
import { signIn, signUp } from '../../backend/auth'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isLogin = mode === 'login'

  async function handleSubmit(event) {
    event.preventDefault()
    if (isLogin) await signIn(email, password)
    else await signUp(email, password)
  }

  return (
    <main className="login">
      <div className="card login-card">
        <h1 className="login-title">GIKI Lost &amp; Found</h1>
        <p className="login-subtitle">Lost something on campus? Found something? Post it here.</p>

        <form className="stack" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="input"
              type="email"
              placeholder="you@giki.edu.pk"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="login-password">Password</label>
            <input
              id="login-password"
              className="input"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="btn btn-primary btn-block" type="submit">
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <p className="login-switch">
          {isLogin ? 'No account? ' : 'Already have an account? '}
          <button
            className="link"
            type="button"
            onClick={() => setMode(isLogin ? 'signup' : 'login')}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </main>
  )
}
