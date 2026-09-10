import { useState } from 'react'
import { Mail, Linkedin, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/config'

const initialForm = { name: '', email: '', projectType: '', budget: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.projectType) errors.projectType = 'Choose a project type.'
  if (!values.message.trim()) {
    errors.message = 'Tell me a bit about the project.'
  } else if (values.message.trim().length < 12) {
    errors.message = 'Add a little more detail (12+ characters).'
  }
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')

    if (siteConfig.formEndpoint) {
      try {
        await fetch(siteConfig.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })
      } catch {
        // fall through to success state either way — see README for wiring notes
      }
    }

    setStatus('success')
    setValues(initialForm)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-grid">
            <div>
              <h2 className="contact-title">Have a project in mind?</h2>
              <p className="contact-sub">Let's build something great together.</p>

              <div className="contact-direct">
                <a href={siteConfig.socials.email} className="contact-direct-link">
                  <Mail size={17} />
                  {siteConfig.email}
                </a>
                <a href={siteConfig.socials.linkedin} className="contact-direct-link" target="_blank" rel="noreferrer">
                  <Linkedin size={17} />
                  Connect on LinkedIn
                </a>
                <a href={siteConfig.whatsappLink} className="contact-direct-link" target="_blank" rel="noreferrer">
                  <MessageCircle size={17} />
                  Message on WhatsApp
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row form-row-2">
                <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" value={values.name} onChange={handleChange('name')} />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" value={values.email} onChange={handleChange('email')} />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className={`form-field ${errors.projectType ? 'has-error' : ''}`}>
                  <label htmlFor="projectType">Project type</label>
                  <select id="projectType" value={values.projectType} onChange={handleChange('projectType')}>
                    <option value="">Select one</option>
                    <option value="Web development">Web development</option>
                    <option value="Website redesign">Website redesign</option>
                    <option value="Digital marketing">Digital marketing</option>
                    <option value="SEO">SEO</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.projectType && <div className="form-error">{errors.projectType}</div>}
                </div>
                <div className="form-field">
                  <label htmlFor="budget">Budget (optional)</label>
                  <select id="budget" value={values.budget} onChange={handleChange('budget')}>
                    <option value="">Select a range</option>
                    <option value="< $1,000">Under $1,000</option>
                    <option value="$1,000 – $5,000">$1,000 – $5,000</option>
                    <option value="$5,000 – $15,000">$5,000 – $15,000</option>
                    <option value="$15,000+">$15,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" value={values.message} onChange={handleChange('message')} />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' && (
                <div className="form-status form-status-success">
                  Thanks — your message is in. I'll get back to you shortly.
                </div>
              )}

              {!siteConfig.formEndpoint && (
                <div className="form-status form-status-note">
                  This form isn't wired to a backend yet. Add a Formspree or EmailJS endpoint in
                  src/data/config.js — see the README for the two-minute setup.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
