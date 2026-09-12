Brevo SMTP Integration
Objective

Integrate Brevo SMTP as the application's email provider.

The application may already contain multiple email-related functionalities. Identify every existing location where the application sends an email and ensure those emails are sent through Brevo SMTP.

Critical Requirement

Do not change or break any existing functionality.

Only modify the email-sending mechanism/configuration required to use Brevo SMTP.

1. Inspect the Existing Application First

Before making any changes:

Identify the application's technology/framework.
Find the existing email/mail configuration.
Find all email-sending functions/services/helpers.
Search the entire codebase for email-related functionality, including:
SMTP configuration
sendMail
mail
email libraries
notification services
contact forms
registration emails
password reset emails
OTP emails
verification emails
admin notifications
application notifications
scheduled/background emails
any other functionality that sends emails

Do not assume there is only one email-sending location.

2. Brevo SMTP Configuration

Use Brevo SMTP as the email transport.

Add the following configuration to the .env file:

BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=YOUR_BREVO_SMTP_LOGIN
BREVO_SMTP_PASSWORD=YOUR_BREVO_SMTP_KEY
BREVO_FROM_EMAIL=YOUR_VERIFIED_SENDER_EMAIL
BREVO_FROM_NAME=YOUR_APPLICATION_NAME


The actual SMTP login and SMTP key must be taken from the Brevo account.

Never hard-code these values in source code.

3. Environment Configuration

The application must read the Brevo credentials from environment variables.

Do not write credentials directly into:

Source files
Configuration files committed to Git
Frontend JavaScript
API responses
Logs
Documentation
Error messages

If .env is not already ignored by Git, add:

.env
.env.*
!.env.example


Create or update .env.example with placeholders only:

BREVO_SMTP_HOST=
BREVO_SMTP_PORT=
BREVO_SMTP_USER=
BREVO_SMTP_PASSWORD=
BREVO_FROM_EMAIL=
BREVO_FROM_NAME=


Never put the real SMTP key in .env.example.

4. Replace the Existing Email Transport

If the application already has a centralized mail service/helper, modify that existing service to use Brevo SMTP.

For example:

Existing Application
        |
        v
Existing Email Service
        |
        v
Brevo SMTP
        |
        v
Recipient


Do not create a completely new email architecture if an existing email service is already available.

The existing application code that calls the email service should continue working wherever possible.

For example, if the application currently has:

sendEmail(...)


keep the same interface and change the underlying transport to Brevo SMTP.

5. Preserve All Existing Email Functionality

Every existing email workflow must continue working after the integration.

Preserve:

Existing recipients
CC recipients
BCC recipients
Email subjects
Email body/content
HTML emails
Plain-text emails
Email templates
Attachments
Reply-To configuration
Existing email headers
Existing business logic
Existing email triggers
Existing success/error handling

Do not rewrite email content unless required for technical compatibility.

6. All Email Locations Must Use Brevo

Search the entire application and make sure there are no remaining email-sending mechanisms that bypass Brevo.

Examples include:

Contact form → Brevo SMTP
Registration email → Brevo SMTP
Forgot password → Brevo SMTP
OTP → Brevo SMTP
Email verification → Brevo SMTP
Admin notification → Brevo SMTP
Order notification → Brevo SMTP
Application notification → Brevo SMTP
Scheduled email → Brevo SMTP


The exact workflows depend on the existing application.

Do not add new email functionality.

Only migrate existing email functionality to Brevo.

7. SMTP Security

Use authenticated SMTP with TLS/STARTTLS.

Recommended configuration:

SMTP Host: smtp-relay.brevo.com
SMTP Port: 587
Security: STARTTLS
Authentication: Enabled


Do not disable TLS certificate verification.

Do not expose SMTP credentials anywhere in the application.

8. Sender Configuration

Use:

BREVO_FROM_EMAIL=YOUR_VERIFIED_SENDER_EMAIL
BREVO_FROM_NAME=YOUR_APPLICATION_NAME


The sender email should be a sender authorized/verified in Brevo.

Do not change existing sender behavior unnecessarily.

If the application already supports different sender addresses for different email types, preserve that behavior where technically possible.

9. Error Handling

Preserve the application's existing error-handling behavior.

If an email fails:

Do not expose SMTP credentials.
Do not expose the SMTP key.
Do not expose sensitive environment variables.
Do not expose authentication details to the frontend.
Keep existing application error behavior unchanged.

Safe logging can identify that an email failed, but must not contain credentials.

10. Dependency Changes

Before adding a new email library:

Check whether the application already has an email/SMTP library.
Reuse the existing library if it supports SMTP.
Only install a new dependency if necessary.
Do not upgrade unrelated packages.
Do not remove unrelated dependencies.

Keep changes as minimal as possible.

11. Testing

After implementation, test every existing email workflow found during the codebase inspection.

At minimum verify:

Contact/inquiry emails
User registration emails
Login/verification emails
Password reset emails
OTP emails
Admin notifications
Application notifications
Emails with attachments
HTML email templates
Plain-text emails

Only test workflows that actually exist in the application.

Verify that:

The application starts successfully.
Emails are sent through Brevo SMTP.
Emails are received successfully.
Recipients remain unchanged.
Email subjects remain unchanged.
Email content remains unchanged.
Attachments continue working.
Existing email triggers continue working.
No credentials are exposed.
No unrelated functionality is affected.
12. Do Not Modify

Do not modify the following unless technically required for the Brevo integration:

Database structure
Database queries
Authentication logic
Authorization
API endpoints
Frontend UI
Routes
Controllers unrelated to email
Business logic
Email templates
User workflows
Existing validation
Existing response formats
Existing integrations
Unrelated dependencies
Unrelated configuration
13. Code Quality

Follow the existing project's coding style and architecture.

Do not introduce unnecessary abstractions.

Prefer a centralized configuration such as:

Environment variables
        ↓
Mail configuration
        ↓
Existing mail service
        ↓
Brevo SMTP


Avoid duplicating SMTP configuration across multiple files.

14. Final Verification

Before completing the implementation:

Search

Search the entire project for all existing email functionality and confirm that every email-sending path uses the Brevo SMTP configuration.

Security

Confirm:

SMTP key exists only in .env/secure environment configuration.
.env is ignored by Git.
No credentials are present in source code.
No credentials are logged.
No credentials are returned by APIs.
Regression

Confirm that functionality unrelated to email has not been changed.

15. Final Response

After completing the implementation, provide a concise summary containing:

Files Changed

List every file modified.

Brevo Configuration

List the environment variable names required:

BREVO_SMTP_HOST
BREVO_SMTP_PORT
BREVO_SMTP_USER
BREVO_SMTP_PASSWORD
BREVO_FROM_EMAIL
BREVO_FROM_NAME


Do not display the actual values of secrets.

Email Workflows

List all existing email workflows that were identified and migrated to Brevo SMTP.

Verification

Confirm that:

Existing email functionality was preserved.
Emails are routed through Brevo SMTP.
SMTP credentials are stored in environment variables.
No secrets were hard-coded.
No unrelated functionality was changed.
Important Implementation Principle

Make the smallest possible change.

The purpose of this task is only to switch the application's existing email delivery mechanism to Brevo SMTP.

Do not redesign, refactor, or rewrite unrelated parts of the application.