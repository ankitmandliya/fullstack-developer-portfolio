import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectDirectory = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(projectDirectory, '.env') })

const app = express()
const PORT = Number(process.env.PORT || 3001)
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'mandliya.ankit@gmail.com'

app.use(express.json({ limit: '1mb' }))

app.post('/api/enquiry', async (req, res) => {
  const { fullName, email, contactNumber, service, otherService, budget, additionalMessage } = req.body || {}

  if (!fullName || !email || !contactNumber || !service) {
    return res.status(400).json({ success: false, message: 'Please complete all required fields before submitting.' })
  }

  const mailHost = process.env.BREVO_SMTP_HOST
  const mailPort = Number(process.env.BREVO_SMTP_PORT || 587)
  const mailUsername = process.env.BREVO_SMTP_USER
  const mailPassword = process.env.BREVO_SMTP_PASSWORD

  if (!mailHost || !mailUsername || !mailPassword) {
    return res.status(503).json({
      success: false,
      message: 'Email service is not configured yet. Add the Brevo SMTP variables to enable enquiry delivery.',
    })
  }

  const serviceName = service === 'Other' ? (otherService || 'Other') : service

  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    requireTLS: true,
    tls: {
      rejectUnauthorized: true,
    },
    auth: {
      user: mailUsername,
      pass: mailPassword,
    },
  })

  const subject = `New Portfolio Enquiry — ${serviceName}`

  const html = `
    <h2>NEW PORTFOLIO ENQUIRY</h2>
    <p>A new enquiry has been submitted through Ankit's portfolio.</p>
    <hr />
    <h3>CONTACT INFORMATION</h3>
    <p><strong>Full Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact Number:</strong> ${contactNumber}</p>
    <hr />
    <h3>SERVICE</h3>
    <p><strong>Requested Service:</strong> ${serviceName}</p>
    <p><strong>Other Service:</strong> ${service === 'Other' ? (otherService || 'Not provided') : 'Not applicable'}</p>
    <hr />
    <h3>BUDGET</h3>
    <p><strong>Estimated Budget:</strong> ${new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Number(budget || 0))}</p>
    <hr />
    <h3>ADDITIONAL MESSAGE</h3>
    <p>${(additionalMessage || 'No additional message provided').replace(/\n/g, '<br />')}</p>
    <hr />
    <p><strong>Source:</strong> Ankit's Portfolio Website</p>
  `

  try {
    await transporter.sendMail({
      from: `${process.env.BREVO_FROM_NAME || 'Ankit Portfolio'} <${process.env.BREVO_FROM_EMAIL || mailUsername}>`,
      to: CONTACT_EMAIL,
      subject,
      text: [
        'NEW PORTFOLIO ENQUIRY',
        '',
        'CONTACT INFORMATION',
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Contact Number: ${contactNumber}`,
        '',
        'SERVICE',
        `Requested Service: ${serviceName}`,
        `Other Service: ${service === 'Other' ? (otherService || 'Not provided') : 'Not applicable'}`,
        '',
        'BUDGET',
        `Estimated Budget: ${new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(budget || 0))}`,
        '',
        'ADDITIONAL MESSAGE',
        additionalMessage || 'No additional message provided',
        '',
        'SOURCE',
        "Ankit's Portfolio Website",
      ].join('\n'),
      html,
    })

    return res.status(200).json({ success: true, message: 'Enquiry sent successfully.' })
  } catch (error) {
    console.error('Portfolio enquiry email failed:', error)
    return res.status(502).json({ success: false, message: 'The enquiry could not be sent at this time. Please try again later.' })
  }
})

app.listen(PORT, () => {
  console.log(`Portfolio enquiry API running on http://localhost:${PORT}`)
})
