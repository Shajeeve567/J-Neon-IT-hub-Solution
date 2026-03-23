import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <nav className="navbar">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">J-NEON IT HUB</Link>

          <ul className="navbar__links">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>HOME</Link></li>
            <li><Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>PORTFOLIO</Link></li>
            <li><Link to="/services" className={location.pathname.startsWith('/services') ? 'active' : ''}>SERVICES</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT</Link></li>
          </ul>

          <Link to={'/services/consultation'} className="navbar__cta" onClick={isHome ? undefined : undefined}>
            GET STARTED
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </nav>

      <div className={`navbar__mobile ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>HOME</Link>
        <Link to="/portfolio" onClick={() => setMenuOpen(false)}>PORTFOLIO</Link>
        <Link to="/services" onClick={() => setMenuOpen(false)}>SERVICES</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
        <Link to="/services/consultation" className="navbar__cta" onClick={() => setMenuOpen(false)}>
          GET STARTED →
        </Link>
      </div>
    </>
  )
}