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
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        projectType: values.projectType,
        budget: values.budget,
        message: values.message.trim(),
        _subject: "New project enquiry from Ankit's portfolio",
        _captcha: 'false',
      }

      const response = await fetch('https://formsubmit.co/ajax/mandliya.ankit@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || (typeof data === 'object' && data.success === false)) {
        throw new Error(data?.message || 'Email submission failed.')
      }

      setStatus('success')
      setValues(initialForm)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-grid">
            <div>
              <h2 className="contact-title">Let's build something that moves your business forward.</h2>
              <p className="contact-sub">Whether you need a modern website, custom web application, React/Laravel development, AI automation or a digital growth solution, let's discuss your requirements.</p>
              <p className="contact-sub">Available for projects across Indore and clients throughout India.</p>

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

            <form action="https://formsubmit.co/mandliya.ankit@gmail.com" method="POST" onSubmit={handleSubmit} noValidate>
              <input type="hidden" name="_subject" value="New project enquiry from Ankit's portfolio" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="form-row form-row-2">
                <div className={`form-field ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" value={values.name} onChange={handleChange('name')} required />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                <div className={`form-field ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={values.email} onChange={handleChange('email')} required />
                  {errors.email && <div className="form-error">{errors.email}</div>}
                </div>
              </div>

              <div className="form-row form-row-2">
                <div className={`form-field ${errors.projectType ? 'has-error' : ''}`}>
                  <label htmlFor="projectType">Project type</label>
                  <select id="projectType" name="projectType" value={values.projectType} onChange={handleChange('projectType')} required>
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
                  <select id="budget" name="budget" value={values.budget} onChange={handleChange('budget')}>
                    <option value="">Select a range</option>
                    <option value="< 10000"> 10,000</option>
                    <option value="10000 – 50000"> 10,000 – 50,000</option>
                    <option value="50000 – 150000"> 50,000 – 150,000</option>
                    <option value="150000+"> 150,000+</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={values.message} onChange={handleChange('message')} required />
                  {errors.message && <div className="form-error">{errors.message}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>

              {status === 'success' && (
                <div className="form-status form-status-success">
                  Thanks — your message was sent successfully. I'll get back to you shortly.
                </div>
              )}

              {status === 'error' && (
                <div className="form-status form-status-error">
                  Some technical issue occurred. Please contact Ankit via WhatsApp: <a href="https://wa.me/917415587271" target="_blank" rel="noreferrer">+91 7415587271</a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
