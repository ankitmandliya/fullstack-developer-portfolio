import { Zap, Target, Gauge, MessageCircle } from 'lucide-react'
import SectionReveal from './SectionReveal'

const reasons = [
  {
    icon: Zap,
    title: 'Fast, responsive websites',
    description: 'Every build is tuned for load speed and works cleanly across phone, tablet and desktop.',
  },
  {
    icon: Target,
    title: 'Business-focused solutions',
    description: "I build toward the outcome you're after — bookings, signups, sales — not just a nice-looking page.",
  },
  {
    icon: Gauge,
    title: 'Performance & SEO optimized',
    description: 'Search visibility and page speed are part of the build from day one, not an afterthought.',
  },
  {
    icon: MessageCircle,
    title: 'Clear communication',
    description: "You'll always know what stage the project is at and what's coming next — no chasing for updates.",
  },
]

export default function WhyWorkWithMe() {
  return (
    <section className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">Why work with me</span>
          <h2 className="section-title">What that actually looks like</h2>
        </SectionReveal>

        <SectionReveal className="why-grid" delay={0.05}>
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div className="why-card" key={reason.title}>
                <div className="why-icon">
                  <Icon size={18} />
                </div>
                <h3 className="why-title">{reason.title}</h3>
                <p className="why-desc">{reason.description}</p>
              </div>
            )
          })}
        </SectionReveal>
      </div>
    </section>
  )
}
