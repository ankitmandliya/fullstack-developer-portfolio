import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../data/config'
import { useScrollState } from '../hooks/useScrollState'

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export function BrandLogo() {
  return (
    <div className="brand-logo-shell">
      <div className="brand-logo-emblem">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="34" height="34" rx="8" fill="#121722" stroke="#232B3A" strokeWidth="1.5" />
          <path d="M9 12L14 17L9 22" stroke="#FF8A4C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 22H23" stroke="#E8ECF3" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="11" r="2" fill="#FF8A4C" />
        </svg>
      </div>
      <div className="brand-logo-text">
        <span className="brand-name">{siteConfig.name}</span>
        <span className="brand-tag">// SYS</span>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isScrolled, activeSection } = useScrollState()

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <a
            href="#home"
            className="navbar-logo-link"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('home')
            }}
          >
            <BrandLogo />
          </a>

          <nav className="navbar-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar-link ${activeSection === item.id ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="btn btn-signal-primary navbar-cta"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contact')
            }}
          >
            Start a project
          </a>

          <button
            type="button"
            className="navbar-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="mobile-menu-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn btn-signal-primary btn-block mobile-menu-cta"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
            >
              Start a project
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
