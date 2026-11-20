import { useEffect, useState } from 'react'
import { getSession, onAuthChange } from '../backend/session'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import './styles.css'

export default function App() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    getSession().then((current) => {
      setSession(current)
      setChecking(false)
    })
    onAuthChange((current) => setSession(current))
  }, [])

  if (checking) return <p className="app-loading">Loading…</p>
  if (!session) return <LoginPage />
  return <HomePage session={session} />
}
