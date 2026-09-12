import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCheck, ChevronLeft, MessageCircle, Send, X } from 'lucide-react'

const serviceOptions = [
  { id: 'Website Development', label: 'Website Development', blurb: 'Websites & digital experiences' },
  { id: 'Web Application', label: 'Web Application', blurb: 'Product & workflow experiences' },
  { id: 'E-commerce Development', label: 'E-commerce Development', blurb: 'Stores & conversion funnels' },
  { id: 'AI & Automation', label: 'AI & Automation', blurb: 'Automations & intelligence' },
  { id: 'Custom Software', label: 'Custom Software', blurb: 'Tailored business systems' },
  { id: 'Digital Marketing', label: 'Digital Marketing', blurb: 'Growth & reach strategy' },
  { id: 'SEO', label: 'SEO', blurb: 'Organic visibility & ranking' },
  { id: 'Social Media Management', label: 'Social Media Management', blurb: 'Content & brand presence' },
  { id: 'Other', label: 'Other', blurb: 'Something custom' },
]

const MIN_BUDGET = 10000
const MAX_BUDGET = 500000
const INITIAL_BUDGET = 50000
const BUDGET_STEP = 5000

const initialForm = {
  fullName: '',
  email: '',
  contactNumber: '',
  service: '',
  otherService: '',
  budget: INITIAL_BUDGET,
  additionalMessage: '',
}

const stepMeta = [
  { title: 'Contact', label: 'STEP 1 OF 4' },
  { title: 'Service', label: 'STEP 2 OF 4' },
  { title: 'Budget', label: 'STEP 3 OF 4' },
  { title: 'Message', label: 'STEP 4 OF 4' },
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function buildWhatsAppUrl() {
  const number = '917415587271'
  const message = [
    'Hi, I would like to discuss a project with Ankit.',
    'I found his portfolio and would like to connect.',
  ].join('\n')

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = sessionStorage.getItem('ankit-portfolio-chat')
    if (!saved) return

    try {
      const parsed = JSON.parse(saved)
      if (parsed && typeof parsed === 'object') {
        setIsOpen(Boolean(parsed.isOpen))
        setCurrentStep(Number(parsed.currentStep) || 0)
        setForm({ ...initialForm, ...parsed.form })
        setSubmitted(Boolean(parsed.submitted))
      }
    } catch {
      // ignore malformed session data
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    sessionStorage.setItem(
      'ankit-portfolio-chat',
      JSON.stringify({
        isOpen,
        currentStep,
        form,
        submitted,
      }),
    )
  }, [currentStep, form, isOpen, submitted])

  const progressText = useMemo(
    () => ['Contact', 'Service', 'Budget', 'Message'].map((label, index) => `${index + 1} ${label}`).join('   →   '),
    [],
  )

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateCurrentStep = () => {
    const nextErrors = {}

    if (currentStep === 0) {
      if (!form.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
      if (!form.email.trim()) nextErrors.email = 'Please enter your email address.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
      if (!form.contactNumber.trim()) nextErrors.contactNumber = 'Please enter your contact number.'
    }

    if (currentStep === 1) {
      if (!form.service) nextErrors.service = 'Please select the service you need.'
      if (form.service === 'Other' && !form.otherService.trim()) {
        nextErrors.otherService = 'Please tell us what you need.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const goNext = () => {
    if (!validateCurrentStep()) return
    setCurrentStep((prev) => Math.min(prev + 1, stepMeta.length - 1))
  }

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()

    if (!validateCurrentStep()) return

    setSubmitting(true)
    setErrors({})

    try {
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        contactNumber: form.contactNumber.trim(),
        service: form.service,
        otherService: form.service === 'Other' ? form.otherService.trim() : '',
        budget: Number(form.budget),
        additionalMessage: form.additionalMessage.trim(),
      }

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to send the enquiry right now.')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Enquiry submission failed:', error)
      setErrors({ submit: "We couldn't send your enquiry right now. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  const resetChat = () => {
    setForm(initialForm)
    setCurrentStep(0)
    setErrors({})
    setSubmitted(false)
    setIsOpen(false)
  }

  return (
    <>
      <div className="floating-actions">
        <button
          type="button"
          className="floating-action floating-action--whatsapp"
          aria-label="Chat with Ankit on WhatsApp"
          title="Let's connect on WhatsApp"
          onClick={() => window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer')}
        >
          <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 3.5A11.7 11.7 0 0 0 12.16 0C5.7 0 .45 5.25.45 11.71c0 2.06.54 4.07 1.56 5.84L.35 24l6.6-1.73a11.7 11.7 0 0 0 5.2 1.25h.01c6.45 0 11.7-5.25 11.7-11.71a11.67 11.67 0 0 0-3.36-8.31ZM12.16 21.5h-.01a9.75 9.75 0 0 1-4.97-1.36l-.36-.21-3.92 1.03 1.05-3.82-.23-.39a9.74 9.74 0 0 1-1.49-5.04C2.23 6.33 6.68 1.88 12.17 1.88c2.66 0 5.16 1.04 7.04 2.93a9.85 9.85 0 0 1 2.91 7.01c0 5.49-4.47 9.68-9.96 9.68Zm5.45-7.3c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-1.75-.87-2.9-1.55-4.06-3.52-.31-.54.31-.5.88-1.67.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.03 1.01-1.03 2.46s1.06 2.85 1.21 3.05c.15.2 2.08 3.18 5.04 4.46 1.87.81 2.6.88 3.53.74.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34Z" />
          </svg>
        </button>

        <button
          type="button"
          className="floating-action floating-action--support"
          aria-label={isOpen ? "Close Ankit's virtual assistant" : "Open Ankit's virtual assistant"}
          title="Support"
          onClick={() => {
            setSubmitted(false)
            setIsOpen((prev) => !prev)
          }}
        >
          <MessageCircle size={18} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="chatbot-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="chatbot-header">
              <div className="chatbot-status">
                <span className="chatbot-online-dot" aria-hidden="true" />
                ONLINE
              </div>
              <button type="button" className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X size={16} />
              </button>
            </div>

            {!submitted ? (
              <div className="chatbot-body">
                <div className="chatbot-stepper" aria-label="Chat progress">
                  <span className="chatbot-stepper-label">{stepMeta[currentStep].label}</span>
                  <div className="chatbot-stepper-track" aria-hidden="true">
                    {stepMeta.map((step, index) => (
                      <span key={step.title} className={`chatbot-step-dot ${currentStep >= index ? 'is-active' : ''}`} />
                    ))}
                  </div>
                  <span className="chatbot-stepper-progress">{progressText}</span>
                </div>

                {currentStep === 0 && (
                  <div className="chatbot-bubble chatbot-bubble--assistant">
                    <p>Hello! 👋 Welcome to Ankit's portfolio. I'm Ankit's virtual assistant. I'll collect a few details about your requirement so Ankit can get back to you personally.</p>
                    <p>Let's get started.</p>
                  </div>
                )}

                {currentStep === 0 && (
                  <div className="chatbot-step-panel">
                    <div className="chatbot-section-heading">
                      <h3>Let's start with your details.</h3>
                      <p>Please share your contact information so Ankit can reach you regarding your enquiry.</p>
                    </div>

                    <div className="chatbot-field-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input id="fullName" type="text" value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} placeholder="Enter your full name" />
                      {errors.fullName && <span className="chatbot-error">{errors.fullName}</span>}
                    </div>

                    <div className="chatbot-field-group">
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" />
                      {errors.email && <span className="chatbot-error">{errors.email}</span>}
                    </div>

                    <div className="chatbot-field-group">
                      <label htmlFor="contactNumber">Contact Number *</label>
                      <input id="contactNumber" type="tel" value={form.contactNumber} onChange={(event) => updateField('contactNumber', event.target.value)} placeholder="Enter your contact number" />
                      {errors.contactNumber && <span className="chatbot-error">{errors.contactNumber}</span>}
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="chatbot-step-panel">
                    <div className="chatbot-section-heading">
                      <h3>What service are you looking for?</h3>
                      <p>Select the service that best matches your requirement.</p>
                    </div>

                    <div className="chatbot-service-grid">
                      {serviceOptions.map((option) => (
                        <button key={option.id} type="button" className={`chatbot-service-card ${form.service === option.id ? 'is-selected' : ''}`} onClick={() => updateField('service', option.id)} aria-pressed={form.service === option.id}>
                          <span className="chatbot-service-check">{form.service === option.id ? '✓' : '○'}</span>
                          <span className="chatbot-service-label">{option.label}</span>
                          <span className="chatbot-service-blurb">{option.blurb}</span>
                        </button>
                      ))}
                    </div>

                    {errors.service && <span className="chatbot-error">{errors.service}</span>}

                    {form.service === 'Other' && (
                      <div className="chatbot-field-group chatbot-field-group--tight">
                        <label htmlFor="otherService">Please tell us what you need.</label>
                        <input id="otherService" type="text" value={form.otherService} onChange={(event) => updateField('otherService', event.target.value)} placeholder="Tell us what you need..." />
                        {errors.otherService && <span className="chatbot-error">{errors.otherService}</span>}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="chatbot-step-panel">
                    <div className="chatbot-section-heading">
                      <h3>What is your estimated budget?</h3>
                      <p>This helps Ankit understand the scope you're considering and recommend the right approach.</p>
                    </div>

                    <div className="chatbot-budget-box">
                      <label htmlFor="budgetRange" className="chatbot-budget-label">Estimated Budget</label>
                      <div className="chatbot-budget-value">{formatCurrency(form.budget)}</div>
                      <input id="budgetRange" type="range" min={MIN_BUDGET} max={MAX_BUDGET} step={BUDGET_STEP} value={form.budget} onChange={(event) => updateField('budget', Number(event.target.value))} aria-label="Estimated project budget" className="chatbot-budget-slider" />
                      <div className="chatbot-budget-scale">
                        <span>₹10K</span>
                        <span>₹5L</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="chatbot-step-panel">
                    <div className="chatbot-section-heading">
                      <h3>Anything else you'd like Ankit to know?</h3>
                      <p>Share any additional details, goals, references or requirements that may help Ankit understand your project.</p>
                    </div>

                    <div className="chatbot-field-group">
                      <label htmlFor="additionalMessage">Additional message (optional)</label>
                      <textarea id="additionalMessage" value={form.additionalMessage} onChange={(event) => updateField('additionalMessage', event.target.value)} rows={5} placeholder="Tell us anything else about your project..." />
                    </div>
                  </div>
                )}

                {errors.submit && (
                  <div className="chatbot-submit-error">
                    <span className="chatbot-error chatbot-error--submit">{errors.submit}</span>
                    <button type="button" className="chatbot-retry" onClick={handleSubmit} disabled={submitting}>
                      Try Again
                    </button>
                  </div>
                )}

                <div className="chatbot-actions">
                  {currentStep > 0 && (
                    <button type="button" className="chatbot-nav chatbot-nav--back" onClick={goBack}>
                      <ChevronLeft size={14} />
                      Back
                    </button>
                  )}

                  {currentStep < stepMeta.length - 1 ? (
                    <button type="button" className="chatbot-nav chatbot-nav--primary" onClick={goNext}>
                      Next
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button type="button" className="chatbot-nav chatbot-nav--primary" onClick={handleSubmit} disabled={submitting}>
                      {submitting ? 'Sending Enquiry...' : 'Submit Enquiry'}
                      <Send size={14} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="chatbot-success-panel">
                <div className="chatbot-success-icon">
                  <CheckCheck size={18} />
                </div>
                <div className="chatbot-success-copy">
                  <strong>THANK YOU FOR CONTACTING ANKIT</strong>
                  <p>Your enquiry has been received successfully. I've shared your details with Ankit, and he will get in touch with you shortly.</p>
                  <p>We appreciate your interest and look forward to learning more about your project.</p>
                </div>
                <button type="button" className="chatbot-close-button" onClick={resetChat}>Close</button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
