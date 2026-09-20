import { Linkedin, Mail, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/config'
import { BrandLogo } from './Navbar'

const exploreLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Testimonials', id: 'testimonials' },
  { label: 'Contact', id: 'contact' },
]

const expertise = ['Web Architecture', 'React & Next.js', 'Laravel & Python', 'AI Solutions', 'Workflow Automation', 'Growth & SEO']
const connectLinks = [
  { label: 'LinkedIn', href: siteConfig.socials.linkedin || '#', icon: Linkedin },
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
            <BrandLogo />
            <p className="footer-tag">Full-Stack Developer &amp; Digital Engineering Professional</p>
            <p className="footer-desc">Serving clients &amp; businesses across Indore &amp; India</p>
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
        </div>
      </div>
    </footer>
  )
}
