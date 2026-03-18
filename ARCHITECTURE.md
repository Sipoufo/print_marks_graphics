# Technical Architecture: Print Marks graphics

**Role:** Frontend Architecture Blueprint  
**Tech Stack:** React (Vite), Tailwind CSS v4, Lucide React, Framer Motion  
**Objective:** Deliver a modular, scalable, and responsive single-page application (SPA) that perfectly encapsulates the Print Marks graphics brand identity and drives conversions.

---

## 1. Project Tree
We will adopt a feature-first, modular folder structure. This keeps the codebase flat but incredibly organized, ensuring that as the application grows, components remain easy to locate and maintain.

```text
/
├── public/                 # Static assets (favicons, raw images)
├── src/
│   ├── assets/             # Brand graphics, logos
│   ├── components/         # Reusable UI building blocks
│   │   ├── ui/             # Primitives (Buttons, Inputs, Cards)
│   │   ├── forms/          # Form-specific elements
│   │   └── layout/         # Header, Footer, Container elements
│   ├── sections/           # Large feature sections (maps directly to PRD)
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── WorkflowSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── ContactSection.jsx
│   ├── data/               # Static content (prevents cluttering React components)
│   │   └── siteData.js     # Exports services array, workflow steps, values
│   ├── hooks/              # Custom React hooks (e.g., useScrollTo, useForm)
│   ├── lib/                # Utility functions, external API clients
│   ├── styles/             # Global styles and Tailwind v4 configuration
│   │   └── index.css       # Tailwind v4 @import and @theme definitions
│   ├── App.jsx             # Main compositional layout
│   └── main.jsx            # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 2. Component Breakdown
The UI will be constructed using a composition pattern, separating logic/layout from granular UI styling.

### Layout & Core Components
- `<App />`: The root orchestrator. Assembles the Header, the 5 sections, and the Footer sequentially.
- `<Header />`: Sticky navigation bar with the logo and scroll-to-section links.
- `<Footer />`: Brand recap, legal links, and secondary contact info.
- `<Container />`: A layout wrapper ensuring max-width and consistent horizontal padding across all sections.

### UI Primitives (in `/components/ui/`)
- `<Button />`: Accepts `variant` props (`primary`, `secondary`, `outline`). Utilizes Framer Motion for tap/hover effects.
- `<SectionHeader />`: Standardized component receiving `title` and `subtitle` props to guarantee typographical consistency across the 5 sections.
- `<Card />`: Base container with standardized border-radius, subtle shadow, and hover elevations.

### Feature Sections (in `/sections/`)
1. **`HeroSection.jsx`**: Utilizes Framer Motion for an authoritative text reveal. Features the primary "Request a Quote" `<Button />`.
2. **`ServicesSection.jsx`**: Iterates over the 9 services. Renders a `<ServiceCard />` for each, displaying a specific Lucide React icon, title, and tooltip/summary.
3. **`WorkflowSection.jsx`**: Renders a visually connected timeline or a 4-column grid mapping the `<StepItem />` components.
4. **`AboutSection.jsx`**: Split layout. Left side: Mission/Vision text. Right side: A 2x2 grid of `<ValueBadge />` components mapping the 4 core pillars.
5. **`ContactSection.jsx`**: Houses the `<ContactForm />` and a side panel with location, business hours, and social proof.

---

## 3. Design System (Tailwind CSS v4)
Tailwind v4 handles configuration natively within the CSS file using the `@theme` directive. We will define a strict, professional corporate palette anchored in "Trust and Reliability" (Blue), balanced by clean typography and generous whitespace.

**File:** `src/styles/index.css`
```css
@import "tailwindcss";

@theme {
  /* --- Colors --- */
  /* Primary: Professional Corporate Blue (Trust, Depth) */
  --color-brand-blue-50: #eff6ff;
  --color-brand-blue-100: #dbeafe;
  --color-brand-blue-500: #3b82f6; /* Action states */
  --color-brand-blue-700: #1d4ed8;
  --color-brand-blue-900: #1e3a8a; /* Deep structural backgrounds */

  /* Secondary: Slate for sophisticated, highly readable text */
  --color-brand-slate-500: #64748b;
  --color-brand-slate-800: #1e293b;
  --color-brand-slate-900: #0f172a; /* Primary headings */

  /* Accent: A warm contrast (e.g., Gold/Amber) to make CTAs pop against blue */
  --color-brand-accent-500: #f59e0b; 
  --color-brand-accent-600: #d97706;

  /* --- Typography --- */
  /* Headings: Authoritative, modern sans-serif like 'Outfit' or 'Inter' */
  --font-heading: 'Outfit', system-ui, sans-serif;
  /* Body: Highly legible, clean sans-serif */
  --font-sans: 'Inter', system-ui, sans-serif;

  /* --- Spacing & Layout --- */
  /* Standardizing section padding to maintain breathing room */
  --spacing-section-y: 6rem; /* 96px */
  --spacing-section-y-mobile: 4rem; /* 64px */
}

/* Global resets and base typography application */
@layer base {
  body {
    @apply font-sans text-brand-slate-800 bg-white antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading text-brand-slate-900 font-bold tracking-tight;
  }
}
```

---

## 4. Interactive Logic: Contact & Quote Request
The "Contact & Quote Request" section is the primary conversion funnel. We will implement this focusing on immediate user feedback and high reliability.

### State Management & Validation
- **Hook:** We will use a custom hook `useContactForm()` (or adopt `react-hook-form` if complexity scales) to manage local state (`name`, `email`, `service_interest`, `message`, `status`).
- **Validation:** Client-side validation ensuring all fields are populated and the email matches standard regex before the submit button becomes active.
- **Feedback:** UI states for `idle`, `submitting`, `success`, and `error`, leveraging Framer Motion to slide in a success toast upon completion.

### Integration Strategy (The "Dual-Path" Approach)
Given the nature of a service-oriented printing business where clients often need rapid answers:

1. **Primary Action: WhatsApp Redirect (Instant Engagement)**
   - **How it works:** On validity, the form data is encoded into a URI string.
   - **Execution:** Opens a new tab to `https://wa.me/<BUSINESS_PHONE>?text=Hi, I am <Name> looking for <Service>. <Message>`.
   - **Why:** In many markets, WhatsApp yields significantly higher conversion and response rates for quotes than email.

2. **Fallback / Alternative Action: EmailJS (Professional Routing)**
   - **How it works:** If the user prefers email or if WhatsApp is not desired, we integrate `emailjs-com`.
   - **Execution:** `emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', formRef.current, 'PUBLIC_KEY')`.
   - **Why:** It bypasses the need for establishing a bespoke backend Node.js server just for sending emails, keeping the architecture strictly frontend (JAMstack) while remaining highly reliable.
