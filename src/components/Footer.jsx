import { ArrowRight, Github, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/config'

const exploreLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

const expertise = ['AI & Automation', 'Software Engineering', 'Web Development', 'E-commerce', 'Cloud & DevOps', 'Digital Growth']
const connectLinks = [
  { label: 'LinkedIn', href: siteConfig.socials.linkedin || '#', icon: Linkedin },
  { label: 'GitHub', href: siteConfig.socials.github || '#', icon: Github },
  { label: 'Instagram', href: siteConfig.socials.instagram || '#', icon: Instagram },
  { label: 'WhatsApp', href: siteConfig.whatsappLink || '#', icon: MessageCircle },
  { label: 'Email', href: siteConfig.socials.email || '#', icon: Mail },
]

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo">
              <span className="navbar-logo-mark">{siteConfig.firstName.charAt(0)}</span>
              {siteConfig.name}
            </div>
            <p className="footer-tag">Digital Engineering</p>
            <p className="footer-desc">AI • Software • Growth</p>
          </div>

          <div>
            <div className="footer-heading">Explore</div>
            <div className="footer-links">
              {exploreLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.id)
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-heading">Expertise</div>
            <div className="footer-links">
              {expertise.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-heading">Connect</div>
            <div className="footer-links footer-links--social">
              {connectLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span className="footer-available">
            <span className="hero-badge-dot" aria-hidden="true" />
            Built with React + curiosity.
          </span>
        </div>
      </div>
    </footer>
  )
}
