Brevo SMTP Email Integration
Objective

Replace the application's existing email-sending mechanism with Brevo SMTP using credentials stored in the .env file.

Important: Do not modify, remove, or impact any other application functionality.

Requirements
1. Use Brevo SMTP

Configure the application's email service to send emails through Brevo SMTP.

Use these standard Brevo SMTP settings:

BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your_brevo_smtp_login
BREVO_SMTP_PASSWORD=your_brevo_smtp_key
BREVO_FROM_EMAIL=your_verified_sender_email
BREVO_FROM_NAME=Your Application Name


Do not hard-code any SMTP credentials in the source code.

2. Environment Variables

All Brevo credentials must be loaded from .env.

Example:

BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=
BREVO_SMTP_PASSWORD=
BREVO_FROM_EMAIL=
BREVO_FROM_NAME=


If the project already has an email-related .env configuration, preserve the existing variable naming conventions where practical, but keep credentials outside the source code.

Make sure .env is included in .gitignore if it is not already.

3. Email Functionality

Replace only the underlying email transport/provider.

Existing application functionality must continue to work exactly as before, including:

Existing email triggers
Email templates
Email subjects
Email recipients
CC/BCC behavior
Attachments
HTML/plain-text content
Contact forms
Notifications
Password/reset emails
Any other existing email workflows

Do not rewrite existing business logic unless it is strictly required to connect it to the new SMTP transport.

4. Preserve Existing Interfaces

If the application already has a centralized email utility/service, modify that service rather than changing every email call throughout the application.

For example, if the application currently uses:

sendEmail(...)


keep the same function/interface and change only its internal transport configuration to Brevo SMTP.

The goal is:

Existing application
       ↓
Existing email service/interface
       ↓
Brevo SMTP
       ↓
Recipient


rather than changing application-wide email logic.

5. SMTP Security

Use authenticated SMTP with TLS.

Preferred configuration:

Host: smtp-relay.brevo.com
Port: 587
Security: STARTTLS
Authentication: Enabled


Do not disable TLS verification.

Do not expose SMTP credentials in:

Source code
Git commits
Frontend code
API responses
Logs
Error messages
6. Error Handling

Preserve the application's existing email error-handling behavior.

Do not expose SMTP credentials or sensitive configuration in errors.

If logging is already implemented, log only safe information such as:

Email sending failed


and the relevant non-sensitive error information.

Do not introduce unrelated logging or application changes.

7. Testing

After implementing the change, verify:

Application starts successfully.
Existing email functionality still works.
Email is successfully delivered through Brevo SMTP.
Existing recipients remain unchanged.
Existing subjects remain unchanged.
Existing templates/content remain unchanged.
Attachments, if currently supported, still work.
No SMTP credentials appear in source code.
.env is not committed to Git.
No unrelated functionality has been modified.
8. Do Not Change

Do not change:

Database logic
Authentication logic
API behavior
Frontend UI
Existing routes
Business logic
Email templates
Email triggers
User workflows
Dependencies unrelated to email
Existing functionality unrelated to sending email

Only change what is necessary to switch the email transport to Brevo SMTP.

Implementation Rule

Before making changes, inspect the existing project structure and identify:

Current email library
Current email service/helper
All places where the email service is called
Existing environment variables
Existing email configuration

Then make the smallest possible change required to route existing email functionality through Brevo SMTP.

Do not replace the entire email architecture unless the existing implementation makes it technically necessary.

Final Verification

After implementation, provide a short summary containing:

Files changed
Email library/transport used
Environment variables required
Confirmation that existing email functionality was preserved
Confirmation that no unrelated functionality was changed

Do not include actual SMTP passwords, API keys, or other secrets in the summary.