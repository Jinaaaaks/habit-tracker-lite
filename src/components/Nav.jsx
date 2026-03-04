import { useLocation, Link } from 'react-router-dom'

export default function Nav() {
  const location = useLocation()

  return (
    <nav className="nav glass">
      <div className="nav-brand">
        habit<span>.</span>lite
      </div>
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Today
        </Link>
        <Link
          to="/stats"
          className={`nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
        >
          Stats
        </Link>
      </div>
    </nav>
  )
}