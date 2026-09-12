import { motion } from 'framer-motion'
import { Linkedin, Mail, ArrowUpRight, ArrowRight, Sparkles, Code2, Layers3, Database, Cloud } from 'lucide-react'
import { siteConfig } from '../data/config'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  const techBadges = ['React', 'Node.js', 'Laravel', 'Python', 'AWS', 'MySQL']

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="container">
        <motion.div className="hero-grid" variants={container} initial="hidden" animate="show">
          <div className="hero-copy">
            <motion.span className="hero-badge" variants={item}>
              <span className="hero-badge-dot" aria-hidden="true" />
              {siteConfig.tagline}
            </motion.span>

            <motion.h1 className="hero-title" variants={item}>
              Full Stack Developer
              <span className="hero-title-role">&amp; Digital Engineering Professional</span>
            </motion.h1>

            <motion.p className="hero-desc" variants={item}>
              {siteConfig.heroDescription}
            </motion.p>

            <motion.div className="hero-actions" variants={item}>
              <button type="button" className="btn btn-primary" onClick={() => scrollTo('projects')}>
                View my work
                <ArrowRight size={16} />
              </button>
              <button type="button" className="btn btn-outline" onClick={() => scrollTo('contact')}>
                Let's connect
              </button>
            </motion.div>

            <motion.div className="hero-status" variants={item}>
              <div className="status-pill"><span className="status-pulse" aria-hidden="true" /> Available for opportunities</div>
              <div className="status-copy">
                <strong>Currently building</strong>
                <span>digital experiences and scalable apps.</span>
              </div>
            </motion.div>

            <motion.div className="hero-socials" variants={item}>
              <a href={siteConfig.socials.linkedin} className="hero-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <Linkedin size={17} />
              </a>
              {/* <a href={siteConfig.socials.github} className="hero-social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <Github size={17} />
              </a> */}
              {/* <a href={siteConfig.socials.instagram} className="hero-social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
                <Instagram size={17} />
              </a> */}
              <a href={siteConfig.socials.email} className="hero-social-link" aria-label="Email">
                <Mail size={17} />
              </a>
            </motion.div>
          </div>

          <motion.div className="hero-visual" variants={item}>
            <div className="hero-visual-shell" role="img" aria-label="Developer technology ecosystem">
              <div className="code-float code-float-one">
                <Code2 size={14} />
                <span>npm run build</span>
                <em>✓ success</em>
              </div>
              <div className="code-float code-float-two">
                <Sparkles size={14} />
                <span>{'</>'}</span>
                <em>live</em>
              </div>

              <div className="visual-panel">
                <div className="panel-header">
                  <span className="panel-dot" />
                  <span className="panel-dot panel-dot-alt" />
                  <span className="panel-dot panel-dot-muted" />
                </div>
                <div className="panel-body">
                  <div className="panel-core">
                    <span>BUILD</span>
                  </div>
                  <div className="panel-meta">
                    <Layers3 size={14} />
                    <span>System ready</span>
                  </div>
                </div>
              </div>

              <div className="tech-cloud" aria-hidden="true">
                {techBadges.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className={`tech-chip tech-chip-${index + 1}`}
                    whileHover={{ y: -4, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="status-window">
                <div className="status-window-top">
                  <span className="window-label">system.status</span>
                  <span className="window-indicator" aria-hidden="true" />
                </div>
                <div className="status-window-body">
                  <div className="status-window-item">
                    <Cloud size={12} />
                    <span>Cloud</span>
                  </div>
                  <div className="status-window-item">
                    <Database size={12} />
                    <span>Data</span>
                  </div>
                </div>
              </div>

              <div className="hero-orbit hero-orbit-visual hero-orbit-one" aria-hidden="true" />
              <div className="hero-orbit hero-orbit-visual hero-orbit-two" aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function DeveloperCore() {
  const technologies = ['React', 'Node.js', 'Django', 'Laravel', 'MySQL', 'AWS']

  return (
    <div className="developer-core" role="img" aria-label="A connected developer technology ecosystem">
      <div className="core-orbit core-orbit-one" aria-hidden="true" />
      <div className="core-orbit core-orbit-two" aria-hidden="true" />
      <div className="core-center"><span>{'</>'}</span><strong>BUILD</strong></div>
      {technologies.map((technology, index) => (
        <motion.div
          className={`core-node core-node-${index + 1}`}
          key={technology}
          whileHover={{ scale: 1.12, y: -4 }}
          transition={{ type: 'spring', stiffness: 280, damping: 16 }}
        >
          <span>{technology}</span>
          {index === 0 && <ArrowUpRight size={13} aria-hidden="true" />}
        </motion.div>
      ))}
    </div>
  )
}
