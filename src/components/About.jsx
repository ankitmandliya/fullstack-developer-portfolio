import { useState } from 'react'
import { siteConfig } from '../data/config'
import SectionReveal from './SectionReveal'

const identityPills = ['Software Engineering', 'AI & Automation', 'Digital Products', 'Digital Growth']

export default function About() {
  const [imageFailed, setImageFailed] = useState(false)
  const profileImage =
    'https://media.licdn.com/dms/image/v2/D5603AQFjRI5ezPRgwg/profile-displayphoto-crop_800_800/B56ZswNzNLG8AM-/0/1766040484437?e=1790812800&v=beta&t=_JKlj3UWm_mIZfmY4azJ6K4O4aJ3lxmkmyPj6SMpDAc'

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <SectionReveal className="about-grid" delay={0.05}>
          <div className="about-visual">
            <div className="profile-frame">
              <div className="profile-header">
                <span className="profile-dot" />
                PROFILE / SYSTEM ONLINE
              </div>

              <div className="profile-image-shell">
                {!imageFailed ? (
                  <img
                    src={profileImage}
                    alt="Ankit Mandliya portrait"
                    onError={() => setImageFailed(true)}
                    loading="lazy"
                  />
                ) : (
                  <div className="profile-fallback" aria-label="Profile fallback">
                    <span>AM</span>
                  </div>
                )}

                <div className="profile-metadata">
                  <span>PROFILE</span>
                  <span>STATUS: ONLINE</span>
                  <span>FOCUS: DIGITAL ENGINEERING</span>
                </div>
                <div className="profile-scan" aria-hidden="true" />
              </div>

              <div className="profile-tags">
                <span>SOFTWARE</span>
                <span>AI</span>
                <span>DIGITAL</span>
              </div>
            </div>
          </div>

          <div className="about-copy">
            <span className="section-label about-label">
              <span className="pulse-dot" aria-hidden="true" />
              ABOUT / 01
            </span>

            <h2 className="section-title about-title">ENGINEERING IDEAS INTO DIGITAL REALITY.</h2>

            <p className="lede">
              I build scalable digital experiences by combining engineering, intelligent automation
              and modern product thinking. My focus is turning complex business requirements into
              reliable software, AI-powered workflows and digital systems that are built to perform.
            </p>

            <p>
              {siteConfig.aboutDescription}
            </p>

            <div className="about-pill-row" aria-label="Professional focus areas">
              {identityPills.map((pill) => (
                <span className="about-pill" key={pill}>
                  {pill}
                </span>
              ))}
            </div>

            <div className="profile-terminal" aria-label="Developer profile card">
              <div className="terminal-header">&gt; profile.status</div>
              <div className="terminal-row">
                <span className="terminal-key">role</span>
                <span>Digital Engineer</span>
              </div>
              <div className="terminal-row">
                <span className="terminal-key">focus</span>
                <span>AI + Software</span>
              </div>
              <div className="terminal-row">
                <span className="terminal-key">approach</span>
                <span>Product Engineering</span>
              </div>
              <div className="terminal-row">
                <span className="terminal-key">mindset</span>
                <span>Build → Automate → Grow</span>
              </div>
              <div className="terminal-row terminal-row--active">
                <span className="terminal-key">status</span>
                <span>
                  <span className="terminal-live-dot" aria-hidden="true" />
                  Available
                </span>
              </div>
              <div className="terminal-footer">&gt; system.ready</div>
            </div>

            <div className="about-highlights" aria-label="Quick highlights">
              <span>Web Development</span>
              <span>AI & Automation</span>
              <span>Digital Growth</span>
              <span>Product Thinking</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
