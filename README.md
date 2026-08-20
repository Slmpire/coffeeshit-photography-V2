# CoffeeShotIt — Professional Photography Website

A cinematic, full-featured photography business website for **CoffeeShotIt Media**, based in Lagos, Nigeria. Built with Next.js 16, Tailwind CSS, and Prismic CMS.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS |
| CMS | Prismic |
| Email | ZeptoMail |
| AI Chatbot | Google Gemini API |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| State | TanStack Query |
| Hosting | Render (Starter, $7/month) |
| Domain | coffeeshotit.com |
| Gallery Delivery | Pixieset |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, about, projects, services, storyteller, video reel, testimonials, stats, tools, FAQ, CTA |
| `/about` | Photographer bio, timeline, tools |
| `/services` | All service types with descriptions |
| `/portfolio` | Category-based gallery browser |
| `/portfolio/[category]` | Individual gallery with lightbox |
| `/projects` | All projects with filter by category |
| `/projects/[id]` | Individual project page with masonry gallery |
| `/pricing` | Pricing tiers for all services |
| `/faq` | Full FAQ page with accordion |
| `/contact` | Contact form + info |
| `/booking` | 3-package booking system with split layout |
| `/booking/confirmation` | Post-booking confirmation |
| `/gallery` | Client gallery portal (code → Pixieset redirect) |

---

## Features

- **Cinematic intro animation** — gold signature traces on black, plays on homepage load and logo click
- **AI chatbot** — Gemini-powered assistant answers pricing, booking, and service questions
- **WhatsApp integration** — floating button (desktop), sticky bar (mobile)
- **Mobile sticky bar** — Book a Session CTA always visible on mobile
- **Contact form** — ZeptoMail sends email to admin + auto-reply to client
- **Booking system** — 3 package types (Wedding, Event, Studio) with detailed forms
- **Client gallery portal** — code-based access to private Pixieset galleries
- **Prismic CMS** — all content (projects, services, FAQ, testimonials) manageable without code
- **Masonry gallery** with lightbox and keyboard navigation
- **Responsive** — mobile-first design, tested on all screen sizes

---

## Project Structure

```
coffeeshit-photography-V2/
├── app/
│   ├── about/
│   ├── booking/
│   │   └── confirmation/
│   ├── contact/
│   ├── faq/
│   ├── gallery/
│   │   └── [slug]/
│   ├── portfolio/
│   ├── pricing/
│   ├── projects/
│   │   └── [id]/
│   ├── services/
│   ├── api/
│   │   ├── chat/          # Gemini AI chatbot
│   │   ├── contact/       # ZeptoMail contact form
│   │   ├── booking/       # Booking notifications
│   │   └── revalidate/    # Prismic ISR revalidation
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── header.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── about.tsx
│   ├── services.tsx
│   ├── projects-section.tsx
│   ├── stats.tsx
│   ├── faq.tsx
│   ├── tools.tsx
│   ├── testimonials.tsx
│   ├── contact-form.tsx
│   ├── contact-info.tsx
│   ├── video-reel.tsx
│   ├── chat-widget.tsx
│   ├── whatsapp-button.tsx
│   ├── mobile-sticky-bar.tsx
│   ├── intro-animation.tsx
│   └── the-voice.tsx
├── customtypes/           # Prismic content type definitions
├── lib/
│   └── query/             # Prismic query functions
├── public/
└── .env.local
```

---

## Environment Variables

Create a `.env.local` file in the root:

```env
# Prismic CMS
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=coffeeshotit

# ZeptoMail (transactional email)
ZEPTOMAIL_TOKEN=your_token_here
ZEPTOMAIL_FROM_EMAIL=no-reply@coffeeshotit.com

# Admin notifications
ADMIN_EMAIL=hello@coffeeshotit.com

# Gemini AI chatbot
GEMINI_API_KEY=your_gemini_key_here

# Paystack (payment processing)
PAYSTACK_PUBLIC_KEY=your_public_key_here
PAYSTACK_SECRET_KEY=your_secret_key_here

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=2348116273856

# Cal.com (booking calendar)
CAL_API_KEY=your_cal_key_here
```

### Where to get each key

| Key | Source |
|-----|--------|
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com) — free, 1,500 req/day |
| `ZEPTOMAIL_TOKEN` | [zeptomail.com](https://zeptomail.com) — after account setup and domain verification |
| `PAYSTACK_PUBLIC_KEY` | [paystack.com](https://paystack.com) → Settings → API Keys |
| `PAYSTACK_SECRET_KEY` | [paystack.com](https://paystack.com) → Settings → API Keys |
| `CAL_API_KEY` | [cal.com/settings/developer](https://cal.com/settings/developer) |

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/Slmpire/coffeeshit-photography-V2.git
cd coffeeshit-photography-V2

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in your keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Prismic CMS Setup

### Content Types Available
- **Projects** — title, cover image, gallery, category, location, date, client
- **Services** — title, subtitle, description, feature image
- **FAQ** — question, answer, category
- **Testimonials** — client name, session type, quote, photo
- **Categories** — title, UID
- **Featured Projects** — curated list for homepage
- **Stats Images** — marquee images and feature image
- **Gallery Types** — portfolio categories with gallery images
- **Story Teller** — homepage storyteller section images
- **Slider** — homepage hero background images

### Adding Content
1. Go to [prismic.io](https://prismic.io) → your repository
2. **Documents** → **Create new** → select type
3. Fill in fields → **Save** → **Publish**
4. Site updates automatically within 60 seconds (ISR)

### Adding a New Client Gallery
In `app/gallery/page.tsx`, add to `GALLERY_CODES`:
```ts
"CLIENTCODE2025": {
    url: "https://coffeeshotit.pixieset.com/clientname",
    name: "Client Name",
},
```

---

## Deployment (Render)

1. Push code to GitHub `main` branch
2. Go to [render.com](https://render.com) → **New** → **Web Service**
3. Connect the GitHub repository
4. Set build settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Instance:** Starter ($7/month)
5. Add all environment variables from `.env.local`
6. Deploy

### Domain Setup (Cloudflare)
1. In Render: **Settings** → **Custom Domains** → add `coffeeshotit.com` and `www.coffeeshotit.com`
2. In Cloudflare DNS:
   - `CNAME @ → your-service.onrender.com`
   - `CNAME www → your-service.onrender.com`
3. Wait for SSL certificate (~5 minutes)

---

## Content To Update Before Launch

- [ ] Real Instagram handle in `footer.tsx` and `contact-info.tsx`
- [ ] Real Twitter/X handle in `footer.tsx` and `contact-info.tsx`
- [ ] Real YouTube channel link in `footer.tsx` and `video-reel.tsx`
- [ ] YouTube video ID in `components/video-reel.tsx` (line: `const VIDEO_ID = "..."`)
- [ ] Add 6+ projects in Prismic with real photos and titles
- [ ] Add FAQ answers in Prismic
- [ ] Add services in Prismic with real descriptions and images
- [ ] Verify ZeptoMail sender domain (coffeeshotit.com)
- [ ] Test contact form email delivery
- [ ] Test booking form email delivery

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run slicemachine # Open Prismic Slice Machine
```

---

## Browser Support

Chrome, Firefox, Safari, Edge — latest 2 versions. Mobile: iOS Safari, Android Chrome.

---

## Credits

- **Design & Development** — Built from scratch
- **CMS** — [Prismic](https://prismic.io)
- **Photography** — CoffeeShotIt Media
- **Fonts** — Dancing Script (signature), Raleway (body) via Google Fonts
- **Icons** — [Lucide React](https://lucide.dev)
- **Animations** — [Framer Motion](https://framer.com/motion)