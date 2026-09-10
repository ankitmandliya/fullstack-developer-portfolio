import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { siteConfig } from '../data/config'

const links = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="navbar-logo">
              <span className="navbar-logo-mark">{siteConfig.firstName.charAt(0)}</span>
              {siteConfig.name}
            </div>
            <p className="footer-desc">{siteConfig.heroDescription}</p>
          </div>

          <div>
            <div className="footer-heading">Navigate</div>
            <div className="footer-links">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.id)
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-heading">Elsewhere</div>
            <div className="footer-socials">
              <a href={siteConfig.socials.linkedin} className="hero-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <Linkedin size={16} />
              </a>
              <a href={siteConfig.socials.github} className="hero-social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <Github size={16} />
              </a>
              <a href={siteConfig.socials.instagram} className="hero-social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
                <Instagram size={16} />
              </a>
              <a href={siteConfig.socials.email} className="hero-social-link" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        <hr className="hairline" />

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span className="footer-available">
            <span className="hero-badge-dot" aria-hidden="true" />
            Available for freelance work
          </span>
        </div>
      </div>
    </footer>
  )
}
