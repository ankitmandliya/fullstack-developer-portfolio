import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../data/config'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <motion.div className="hero-grid" variants={container} initial="hidden" animate="show">
          <div>
            <motion.span className="hero-badge" variants={item}>
              <span className="hero-badge-dot" aria-hidden="true" />
              {siteConfig.tagline}
            </motion.span>

            <motion.h1 className="hero-title" variants={item}>
              I build
              <span className="hero-title-role">digital experiences.</span>
            </motion.h1>

            <motion.p className="hero-desc" variants={item}>
              {siteConfig.heroDescription}
            </motion.p>

            <motion.div className="hero-actions" variants={item}>
              <button type="button" className="btn btn-primary" onClick={() => scrollTo('projects')}>
                View my work
              </button>
              <button type="button" className="btn btn-outline" onClick={() => scrollTo('contact')}>
                Let's work together
              </button>
            </motion.div>

            <motion.div className="hero-socials" variants={item}>
              <a href={siteConfig.socials.linkedin} className="hero-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <Linkedin size={17} />
              </a>
              <a href={siteConfig.socials.github} className="hero-social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <Github size={17} />
              </a>
              <a href={siteConfig.socials.instagram} className="hero-social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
                <Instagram size={17} />
              </a>
              <a href={siteConfig.socials.email} className="hero-social-link" aria-label="Email">
                <Mail size={17} />
              </a>
            </motion.div>
          </div>

          <motion.div className="hero-visual" variants={item}>
            <DeveloperCore />
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
