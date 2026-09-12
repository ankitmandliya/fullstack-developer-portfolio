import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import SectionReveal from './SectionReveal'
import './Testimonials.css'

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function pad(number) {
  return String(number).padStart(2, '0')
}

function getVisibleCount() {
  return typeof window !== 'undefined' && window.innerWidth >= 900 ? 2 : 1
}

export default function Testimonials() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const pointerStart = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const handleResize = () => {
      const nextVisibleCount = getVisibleCount()
      setVisibleCount(nextVisibleCount)
      setStartIndex((current) => Math.min(current, Math.max(testimonials.length - nextVisibleCount, 0)))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pageStarts = useMemo(() => {
    const lastStart = Math.max(testimonials.length - visibleCount, 0)
    return Array.from({ length: lastStart + 1 }, (_, index) => index)
  }, [visibleCount])

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + visibleCount)

  const moveTo = (nextIndex) => {
    const lastStart = Math.max(testimonials.length - visibleCount, 0)
    const boundedIndex = Math.max(0, Math.min(nextIndex, lastStart))
    setDirection(boundedIndex >= startIndex ? 1 : -1)
    setStartIndex(boundedIndex)
  }

  const moveBy = (amount) => moveTo(startIndex + amount)

  const handlePointerDown = (event) => {
    pointerStart.current = event.clientX
  }

  const handlePointerUp = (event) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    pointerStart.current = null
    if (Math.abs(distance) > 45) moveBy(distance < 0 ? 1 : -1)
  }

  const handleCardMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--tm-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--tm-y', `${event.clientY - bounds.top}px`)
  }

  return (
    <section className="section tm-section" id="testimonials">
      <div className="container tm-container">
        <SectionReveal className="tm-head">
          <div className="tm-head-row">
            <div className="tm-head-copy">
              <h2 className="tm-title">Shipped, reviewed, approved.</h2>
              <p>
                Every project here has a client on the other end of it — this is what they said once the work was live, not just handed over.
              </p>
            </div>

            <div className="tm-toolbar">
              <span className="tm-counter">
                {pad(startIndex + 1)} <span className="tm-counter-sep">—</span> {pad(testimonials.length)}
              </span>
              <div className="tm-controls">
                <button type="button" className="tm-btn" onClick={() => moveBy(-1)} disabled={startIndex === 0} aria-label="Previous testimonial">
                  <ArrowLeft size={16} />
                </button>
                <button type="button" className="tm-btn" onClick={() => moveBy(1)} disabled={startIndex >= testimonials.length - visibleCount} aria-label="Next testimonial">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="tm-stage" delay={0.05}>
          <div className="tm-viewport" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { pointerStart.current = null }} role="region" aria-label="Client testimonials">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`${startIndex}-${visibleCount}`}
                className="tm-track"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : direction * -28 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: 'easeOut' }}
              >
                {visibleTestimonials.map((testimonial, index) => {
                  const absoluteIndex = startIndex + index
                  return (
                    <article className="tm-card" key={`${testimonial.name}-${absoluteIndex}`} onMouseMove={handleCardMove}>
                      <div className="tm-card-inner">
                        <div className="tm-card-top">
                          <span className="tm-status"><span className="tm-status-dot" aria-hidden="true" />Client approved</span>
                          {testimonial.service && <span className="tm-tag">{testimonial.service}</span>}
                        </div>

                        <Quote className="tm-quote-mark" size={38} aria-hidden="true" />
                        <p className="tm-quote">{testimonial.quote}</p>

                        <div className="tm-author">
                          <span className="tm-avatar">
                            {testimonial.image ? <img src={testimonial.image} alt={testimonial.name} className="tm-avatar-img" /> : getInitials(testimonial.name)}
                          </span>
                          <div className="tm-author-copy">
                            <div className="tm-name">{testimonial.name}</div>
                            {testimonial.role && <div className="tm-role">{testimonial.role}</div>}
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="tm-rail" aria-label="Choose testimonial">
            {pageStarts.map((page) => (
              <button key={page} type="button" className={`tm-tick ${startIndex === page ? 'is-active' : ''}`} onClick={() => moveTo(page)} aria-label={`Show testimonial ${page + 1}`} aria-current={startIndex === page ? 'true' : undefined} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
