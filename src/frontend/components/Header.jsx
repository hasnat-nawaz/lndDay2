import { signOut } from '../../backend/auth'

export default function Header({ email }) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="app-name">GIKI Lost &amp; Found</h1>
        <div className="header-user">
          <span className="header-email">{email}</span>
          <button className="btn btn-secondary" type="button" onClick={signOut}>
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}
