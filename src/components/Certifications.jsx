import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Eye, ShieldCheck, X } from 'lucide-react'
import { certifications } from '../data/certifications'
import SectionReveal from './SectionReveal'

function CertificateModal({ certification, onClose }) {
  useEffect(() => {
    if (!certification) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [certification, onClose])

  return (
    <AnimatePresence>
      {certification && (
        <motion.div
          className="certificate-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="certificate-modal"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
          >
            <div className="certificate-modal-header">
              <div>
                <p className="certificate-modal-kicker">Certificate</p>
                <h3 id="certificate-modal-title">{certification.issuer}: {certification.name}</h3>
              </div>
              <button type="button" className="certificate-modal-close" onClick={onClose} aria-label="Close certificate modal">
                <X size={18} />
              </button>
            </div>

            <div className="certificate-modal-media">
              <img src={certification.image} alt={`${certification.name} certificate`} loading="eager" />
            </div>

            <div className="certificate-modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.open(certification.verifyUrl, '_blank', 'noopener,noreferrer')}
              >
                Verify Certificate
                <ShieldCheck size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Certifications() {
  const [activeCertificate, setActiveCertificate] = useState(null)

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <SectionReveal className="section-head certifications-head">
          <span className="section-label">PROFESSIONAL CREDENTIALS</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-sub">
            Industry-recognized certifications validating my expertise across software engineering,
            artificial intelligence, machine learning, and modern web development.
          </p>
          <div className="certifications-status" aria-label="Verified credentials count">
            <span className="status-indicator" aria-hidden="true" />
            4 VERIFIED CREDENTIALS
          </div>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="certifications-grid">
            {certifications.map((certification) => (
              <motion.article
                key={certification.id}
                className="certification-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -8 }}
              >
                <div className="certification-media" onClick={() => setActiveCertificate(certification)} role="button" tabIndex={0} onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setActiveCertificate(certification)
                  }
                }}>
                  <img src={certification.image} alt={`${certification.name} certificate preview`} loading="lazy" />
                  <div className="certification-media-overlay">
                    <span>View Certificate</span>
                  </div>
                </div>

                <div className="certification-badge" aria-label="Verified certificate">
                  <Check size={12} />
                  VERIFIED
                </div>

                <div className="certification-body">
                  <div className="certification-meta-row">
                    <span className="certification-issuer">{certification.issuer}</span>
                    <span className="certification-platform">{certification.platform}</span>
                  </div>

                  <h3>{certification.name}</h3>

                  <div className="certification-tag-row">
                    <span className="certification-tag">{certification.category}</span>
                  </div>

                  <div className="certification-credential">
                    <span>Credential ID</span>
                    <strong>{certification.credentialId}</strong>
                  </div>
                </div>

                <div className="certification-actions">
                  <button type="button" className="cert-button cert-button--primary" onClick={() => setActiveCertificate(certification)}>
                    <Eye size={15} />
                    View Certificate
                  </button>

                  <button
                    type="button"
                    className="cert-button cert-button--secondary"
                    onClick={() => window.open(certification.verifyUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <ShieldCheck size={15} />
                    Verify Certificate
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </SectionReveal>
      </div>

      <CertificateModal certification={activeCertificate} onClose={() => setActiveCertificate(null)} />
    </section>
  )
}
