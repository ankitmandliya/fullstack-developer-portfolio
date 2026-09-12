Ankit Virtual Assistant — Final Chatbot Fixes

Objective

Everything in the current chatbot is working well.

Do not redesign the chatbot or change the existing futuristic visual language.

Make only the following fixes:

Fix the "Unable to send the enquiry right now." submission error.

Reduce the chatbot popup height because it is currently too tall.

Make the chatbot's introductory greeting appear ONLY on Step 1.

Do not repeat the greeting or "Let's get started." text on Steps 2, 3, or 4.

Keep the existing professional "Ankit's Virtual Assistant" personality.

1. FIX EMAIL SUBMISSION ERROR

Current problem:

Unable to send the enquiry right now.

The enquiry submission is failing even though the chatbot flow itself is working.

Requirement

Trace the complete submission flow:

Chatbot
   ↓
Form state
   ↓
Submit handler
   ↓
Frontend API request
   ↓
Backend/API endpoint
   ↓
Email service
   ↓
mandliya.ankit@gmail.com

Find the actual cause of the failure instead of hiding the error.

1.1 Debug the frontend request

Verify:

API endpoint URL

HTTP method

Request body

JSON formatting

Content-Type

Environment variables

Production/development API URL

CORS configuration if applicable

Response parsing

HTTP status handling

Expected request pattern:

const response = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(enquiry),
});

Use the project's existing API endpoint if one already exists.

Do not blindly create a new endpoint if the project already has one.

2. VERIFY BACKEND RESPONSE

The frontend must correctly handle the backend response.

Example:

const data = await response.json();

if (!response.ok) {
  throw new Error(data?.message || "Unable to send enquiry");
}

Do not assume every response is successful.

The backend should return a clear success response.

Example:

{
  "success": true,
  "message": "Enquiry sent successfully"
}

On failure:

{
  "success": false,
  "message": "Unable to send enquiry"
}

Use an appropriate HTTP status code.

3. VERIFY EMAIL CONFIGURATION

Make sure the backend email configuration is actually available at runtime.

Required destination:

mandliya.ankit@gmail.com

Verify:

MAIL_HOST=...
MAIL_PORT=...
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=...
MAIL_FROM_NAME=Ankit Portfolio
CONTACT_EMAIL=mandliya.ankit@gmail.com

Use the exact environment variable names already expected by the project's backend.

IMPORTANT

Do NOT put email credentials inside React frontend code.

Never use:

VITE_MAIL_PASSWORD
VITE_SMTP_PASSWORD
VITE_EMAIL_PASSWORD

Private credentials must remain server-side.

4. VERIFY ENVIRONMENT VARIABLES

If using Vite for frontend configuration, remember:

VITE_*

variables are exposed to the browser.

Therefore:

Allowed

Public configuration such as:

VITE_API_URL=...

NOT allowed

VITE_SMTP_PASSWORD=...
VITE_EMAIL_PASSWORD=...
VITE_EMAIL_API_SECRET=...

Email credentials must stay on the backend/serverless function.

5. CHECK DEVELOPMENT VS PRODUCTION

Make sure the frontend is calling the correct backend endpoint.

For example, avoid accidentally calling:

http://localhost:...

from the deployed website.

Use the project's existing environment configuration.

Example:

VITE_API_URL=/api

or the appropriate deployed API URL.

Do not hard-code localhost URLs in production code.

6. ERROR HANDLING

Do not show the generic error immediately for every type of failure.

Use proper error handling.

Example:

try {
  setIsSubmitting(true);

  const response = await fetch(...);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Unable to send enquiry");
  }

  setSubmitted(true);
} catch (error) {
  console.error("Enquiry submission failed:", error);

  setSubmitError(
    "We couldn't send your enquiry right now. Please try again."
  );
} finally {
  setIsSubmitting(false);
}

Keep the detailed error in the developer console, not in the visitor-facing UI.

7. DO NOT LOSE FORM DATA ON FAILURE

If email submission fails:

Keep all entered fields.

Keep selected service.

Keep budget.

Keep additional message.

Allow the visitor to click TRY AGAIN.

Do NOT reset the form after failure.

8. SUCCESS BEHAVIOR

When email submission succeeds:

Show:

Thank you for contacting Ankit.

Then:

Your enquiry has been received successfully. Ankit will get in touch with you shortly.

This should be the final chatbot state.

9. CHATBOT HEIGHT — IMPORTANT

The chatbot popup is currently too tall.

Reduce its height significantly.

Do NOT allow the chatbot to occupy most of the screen.

10. DESKTOP CHATBOT HEIGHT

Use a controlled maximum height.

Recommended:

height: auto;
max-height: min(620px, calc(100vh - 120px));

If the existing popup is still too tall, reduce to approximately:

max-height: min(560px, calc(100vh - 120px));

The exact value should be chosen based on the existing design.

The goal is a compact premium assistant panel.

11. CHATBOT WIDTH

Keep the current width if it already looks good.

Recommended maximum:

width: min(420px, calc(100vw - 32px));

Do not make it unnecessarily wide.

12. INTERNAL SCROLLING

The chatbot itself should remain compact.

If the content does not fit:

Chatbot shell
   ↓
Header
   ↓
Scrollable content
   ↓
Fixed footer/actions

Do NOT increase the popup height to fit every field.

Instead, make the main content area scrollable.

Recommended structure:

.chatbot {
  display: flex;
  flex-direction: column;
  max-height: min(600px, calc(100vh - 120px));
}

.chatbot-content {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.chatbot-footer {
  flex-shrink: 0;
}

13. MOBILE CHATBOT HEIGHT

On mobile, prevent the chatbot from becoming excessively tall.

Use:

max-height: calc(100dvh - 100px);

or an equivalent safe mobile calculation.

Do not use a fixed height that causes the chatbot to exceed the viewport.

Recommended:

width: calc(100vw - 24px);
max-width: 420px;

The content should scroll internally.

14. KEEP CHATBOT HEADER COMPACT

Do not use excessive padding in the header.

Recommended:

padding: 14px 18px;

or the equivalent spacing already used by the design system.

Keep:

Online indicator

Assistant name/title

Close button

But reduce empty vertical space.

15. KEEP CHATBOT FORM COMPACT

Reduce excessive:

field margins

card padding

button spacing

section gaps

textarea height

heading margins

Recommended field spacing:

gap: 12px;

or approximately:

margin-bottom: 12px;

Do not create large blank spaces between fields.

16. STEP 1 GREETING — ONLY STEP 1

This is very important.

The following greeting:

Hello! 👋 Welcome to Ankit's portfolio. I'm Ankit's virtual assistant. I'll collect a few details about your requirement so Ankit can get back to you personally.

and:

Let's get started.

must appear ONLY on Step 1.

They must NOT appear on:

Step 2

Step 3

Step 4

Success state

Error state

17. STEP 1 EXACT CONTENT

When the chatbot opens, show:

Hello! 👋 Welcome to Ankit's portfolio. I'm Ankit's virtual assistant. I'll collect a few details about your requirement so Ankit can get back to you personally.

Then:

Let's get started.

Then show:

STEP 1 OF 4

Let's start with your details.

Full Name *
[ Enter your full name ]

Email Address *
[ you@example.com ]

Contact Number *
[ Enter your contact number ]

[ NEXT → ]

Keep this introduction only inside the Step 1 content.

18. STEP 2 SHOULD NOT SHOW THE GREETING

When the user clicks NEXT, remove the Step 1 greeting.

Step 2 should start directly with:

STEP 2 OF 4

What service are you looking for?

Select the service that best matches your requirement.

Then show the service cards.

Do NOT show:

Hello! 👋 Welcome to Ankit's portfolio...

Do NOT show:

Let's get started.

19. STEP 3 SHOULD NOT SHOW THE GREETING

Step 3:

STEP 3 OF 4

What is your estimated budget?

This helps Ankit understand the scope you're considering and recommend the right approach.

Then show the budget slider.

No Step 1 greeting.

20. STEP 4 SHOULD NOT SHOW THE GREETING

Step 4:

STEP 4 OF 4

Anything else you'd like Ankit to know?

Share any additional details, goals, references or requirements that may help Ankit understand your project.

Then:

Additional message (optional)
[ Tell us anything else about your project... ]

No Step 1 greeting.

21. IMPLEMENT GREETING CONDITIONALLY

The greeting should be rendered conditionally based on the active step.

Example:

{currentStep === 1 && (
  <div className="assistant-intro">
    <p>
      Hello! 👋 Welcome to Ankit's portfolio. I'm Ankit's virtual assistant.
      I'll collect a few details about your requirement so Ankit can get back
      to you personally.
    </p>

    <p>Let's get started.</p>
  </div>
)}

Do not keep the greeting outside the step-specific rendering.

22. DO NOT DUPLICATE INTRO TEXT

Check the component structure carefully.

Avoid this:

<ChatHeader />

<Intro />

{currentStep === 1 && <StepOne />}
{currentStep === 2 && <StepTwo />}

if <Intro /> always renders.

Instead:

<ChatHeader />

{currentStep === 1 && <StepOne />}
{currentStep === 2 && <StepTwo />}
{currentStep === 3 && <StepThree />}
{currentStep === 4 && <StepFour />}

Put the greeting inside Step 1.

23. STEP TRANSITIONS

Keep the existing smooth animation.

When moving:

Step 1 → Step 2
Step 2 → Step 3
Step 3 → Step 4

use a subtle transition.

Do not create a long animation that makes the chatbot feel slow.

Recommended:

200–300ms

Respect:

@media (prefers-reduced-motion: reduce)

24. BACK BUTTON

Keep:

← BACK

on Steps 2–4.

When going back:

Preserve all entered information.

Do not show Step 1 greeting unless the visitor is actually back on Step 1.

Return to the correct previous step.

25. STEP HEADER

Each step should have its own heading.

Step 1

Let's start with your details.

Step 2

What service are you looking for?

Step 3

What is your estimated budget?

Step 4

Anything else you'd like Ankit to know?

This keeps the chatbot clear without repeating the initial greeting.

26. CHATBOT PERSONALITY

Continue using professional language throughout.

The assistant represents Ankit.

Examples:

Step 2

Please select the service that best matches your requirement.

Step 3

This helps Ankit understand the scope you're considering.

Step 4

Any additional details you share can help Ankit better understand your project.

Success

Thank you for contacting Ankit. Your enquiry has been received successfully. Ankit will get in touch with you shortly.

Avoid:

Awesome!
Cool!
Yay!
I got you!

Keep it professional and warm.

27. FINAL CHATBOT FLOW

The final experience must be:

CLICK CHAT
    ↓
STEP 1
Greeting
"Hello! 👋 Welcome to Ankit's portfolio..."
"Let's get started."
    ↓
Full Name
Email
Contact Number
    ↓
NEXT
    ↓
STEP 2
"What service are you looking for?"
    ↓
Select Service
    ↓
NEXT
    ↓
STEP 3
"What is your estimated budget?"
    ↓
₹10,000 ━━━━━━━●━━━━━━━━ ₹5,00,000
    ↓
NEXT
    ↓
STEP 4
"Anything else you'd like Ankit to know?"
    ↓
Optional Additional Message
    ↓
SUBMIT ENQUIRY
    ↓
SENDING...
    ↓
Secure API
    ↓
mandliya.ankit@gmail.com
    ↓
SUCCESS
    ↓
"Thank you for contacting Ankit.
Ankit will get in touch with you shortly."

28. FINAL DESIGN REQUIREMENT

The chatbot should now be:

Compact
Professional
Futuristic
Fast
Easy to use

The visitor should never feel that the popup is taking over the screen.

The Step 1 greeting should create the human connection, then disappear as soon as the visitor moves to Step 2.

29. FINAL TEST CHECKLIST

Submission

Submit button works

Correct API endpoint

Correct HTTP method

Correct request body

Correct content type

Backend receives data

Email service receives data

Email arrives at mandliya.ankit@gmail.com

Production environment works

No localhost API in production

No frontend email credentials

Error state works

Retry works

Form data is preserved on failure

Greeting

Greeting appears on Step 1

"Let's get started." appears on Step 1

Greeting disappears on Step 2

Greeting does not appear on Step 3

Greeting does not appear on Step 4

Greeting does not appear on success screen

Popup

Height reduced

Header compact

Internal content scroll enabled

Mobile height constrained

No content gets cut off

Submit buttons remain accessible

No overlap with floating WhatsApp/Support buttons

UX

Back button works

Data persists between steps

Service selection works

Budget slider works

Additional message remains optional

Success message is professional

No console errors

Production build succeeds