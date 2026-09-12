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
  // { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

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
            className="navbar-logo"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('home')
            }}
          >
            <span className="navbar-logo-mark">{siteConfig.firstName.charAt(0)}</span>
            {siteConfig.name}
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
            className="btn btn-primary navbar-cta"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contact')
            }}
          >
            Let's talk
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
              className="btn btn-primary btn-block mobile-menu-cta"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
            >
              Let's talk
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
