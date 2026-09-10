import { testimonials } from '../data/testimonials'
import SectionReveal from './SectionReveal'

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What clients say</h2>
        </SectionReveal>

        <SectionReveal className="testimonials-track" delay={0.05}>
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <span className="testimonial-avatar">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                )}
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </SectionReveal>
      </div>
    </section>
  )
}
