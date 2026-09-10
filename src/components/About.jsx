import { motion } from 'framer-motion'
import { siteConfig } from '../data/config'
import SectionReveal from './SectionReveal'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">About</span>
          <h2 className="section-title">Two disciplines, one build</h2>
        </SectionReveal>

        <SectionReveal className="about-grid" delay={0.05}>
          <div className="about-copy">
            <p className="lede">{siteConfig.aboutDescription}</p>
            <p>
              Based in {siteConfig.location}, I work with founders and small teams directly — no
              handoffs, no account managers. You talk to the person doing the work.
            </p>
            <div style={{ marginTop: 28 }}>
              <a href="#contact" className="btn btn-outline">
                Start a project
              </a>
            </div>
          </div>

          <div className="about-stats">
            {siteConfig.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <div className="stat-card-value">{stat.value}</div>
                <div className="stat-card-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
