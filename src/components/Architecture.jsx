import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'

const nodes = [
  { label: 'React interface', type: 'client' },
  { label: 'REST API', type: 'service' },
  { label: 'Business logic', type: 'service' },
  { label: 'MySQL / MongoDB', type: 'data' },
]

export default function Architecture() {
  return (
    <section id="architecture" className="section architecture-section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">How I build</span>
          <h2 className="section-title">From first interaction to reliable data.</h2>
          <p className="section-sub">A clear architecture keeps the experience fast on the surface and dependable underneath.</p>
        </SectionReveal>
        <SectionReveal className="architecture-diagram" delay={0.05}>
          <div className="architecture-line" aria-hidden="true" />
          <div className="architecture-nodes">
            {nodes.map((node, index) => (
              <motion.div
                className={`architecture-node architecture-node-${node.type}`}
                key={node.label}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <span className="architecture-index">0{index + 1}</span>
                <strong>{node.label}</strong>
                <small>{node.type === 'client' ? 'experience' : node.type === 'data' ? 'persistence' : 'orchestration'}</small>
              </motion.div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}