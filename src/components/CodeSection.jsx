import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'

const codeLines = [
  'const developer = {',
  '  frontend: ["React.js", "JavaScript"],',
  '  backend: ["Django", "Laravel", "Node.js"],',
  '  data: ["MySQL", "MongoDB"],',
  '  mindset: "Ship useful things",',
  '};',
]

export default function CodeSection() {
  return (
    <section className="section code-section">
      <div className="container code-layout">
        <SectionReveal className="code-copy">
          <span className="section-label">Code is a tool</span>
          <h2 className="section-title">Make the complex feel simple.</h2>
          <p className="section-sub">The stack changes with the problem. The standard stays: thoughtful interfaces, maintainable systems, and work that earns its place.</p>
        </SectionReveal>
        <SectionReveal className="code-window" delay={0.08}>
          <div className="code-window-bar"><span /><span /><span /><em>profile.js</em></div>
          <pre><code>{codeLines.map((line, index) => <motion.span key={line} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>{line}{'\n'}</motion.span>)}</code></pre>
        </SectionReveal>
      </div>
    </section>
  )
}