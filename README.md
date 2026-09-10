# Portfolio Site

A dark, premium developer + digital-marketer portfolio built with React, Vite, and Framer Motion. Original design and code — built as its own thing, not a copy of any reference site.

## Install and run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Changes hot-reload automatically.

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Replace your information

Almost everything lives in `src/data/`, so you rarely need to touch component code.

| What | File |
|---|---|
| Name, role, location, bio, stats, email, phone, social links | `src/data/config.js` |
| Skills (Build / Grow columns + tools) | `src/data/skills.js` |
| Services offered | `src/data/services.js` |
| Projects (title, description, tags, links) | `src/data/projects.js` |
| Work experience timeline | `src/data/experience.js` |
| Client testimonials | `src/data/testimonials.js` |

Open `src/data/config.js` first — it has every placeholder in one place: `email`, `phone`, `whatsappLink`, and the `socials` object (LinkedIn, GitHub, Instagram).

## Add projects

Add an object to the array in `src/data/projects.js`:

```js
{
  title: 'Project Name',
  description: 'One or two sentences on what it is and what you did.',
  image: '/projects/your-image.png',
  technologies: ['React', 'Node.js', 'MongoDB'],
  category: 'Web Development', // must match one of projectCategories
  liveUrl: 'https://...',
  githubUrl: 'https://...',
}
```

## Add images

Put project screenshots in `public/projects/` (see `public/projects/README.txt` for sizing). Reference them from `projects.js` as `/projects/filename.png`. If an image is missing, the card automatically falls back to a plain title card — the layout never breaks.

For the social preview image, add a 1200×630 PNG at `public/og-cover.png` (referenced in `index.html`'s Open Graph tags).

## Wire up the contact form

The form validates client-side already. To actually receive submissions, pick one:

**Formspree** (fastest): create a form at formspree.io, copy the endpoint URL (`https://formspree.io/f/xxxxxxx`), and paste it into `formEndpoint` in `src/data/config.js`.

**EmailJS**: install `@emailjs/browser`, then swap the `fetch` call in `src/components/Contact.jsx`'s `handleSubmit` for the EmailJS `send()` call per their docs.

**Your own API**: point `formEndpoint` at your endpoint — the existing `fetch` call already POSTs the form as JSON.

## Deploy to Netlify

1. Push this project to a GitHub repo.
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy. Netlify auto-detects Vite settings, but confirm the two fields above if it doesn't.

Or drag-and-drop deploy: run `npm run build` locally, then drag the generated `dist/` folder onto Netlify's "Deploys" page.

## Connect a custom domain

In Netlify: **Site configuration → Domain management → Add a domain**. Either buy a domain through Netlify directly, or point your existing registrar's DNS at Netlify (Netlify shows the exact records — usually an `A` record to their load balancer or a `CNAME` for a subdomain). SSL is provisioned automatically once DNS resolves.

## Notes

- No Tailwind config to fight with — styling is plain CSS with custom properties in `src/index.css`, organized by section and easy to scan.
- Colors, type, and spacing are all CSS variables at the top of `src/index.css` (`:root`) if you want to retheme.
- `prefers-reduced-motion` is respected — animations shorten to nearly instant for anyone with that OS setting on.
