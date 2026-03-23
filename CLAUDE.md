# Project: [Nom de votre app]
> React Single Page Application — Web

---

# Tech Stack
- Framework: React 19
- Build tool: Vite 8
- Language: JavaScript (ESM)
- Styling: Tailwind CSS 4
- Animations: Framer Motion 12
- Icons: Lucide React
- i18n: i18next + react-i18next
- Email: EmailJS
- Linting: ESLint 9 + Prettier

---

# Project Structure
```
src/
├── main.jsx              # React entry point
├── App.jsx               # Root orchestrator
├── i18n.js               # EN/FR config
├── data/siteData.js      # Single source of truth for content
├── components/
│   ├── ui/               # Button, Card, SectionHeader
│   └── layout/           # Header, Footer, Container
├── sections/             # 6 page sections
│   ├── HeroSection.jsx
│   ├── ServicesSection.jsx
│   ├── WorkflowSection.jsx
│   ├── AboutSection.jsx
│   ├── TeamSection.jsx
│   └── ContactSection.jsx
├── assets/               # Images
└── styles/index.css      # Global + Tailwind @theme
public/
├── icons.svg             # SVG sprite
└── locales/en|fr/        # Translation JSONs

```

---

# Conventions
- Components & pages: `PascalCase` (e.g. `HeroSection.jsx`)
- Variables & functions: `camelCase`
- Files & folders: `kebab-case` for non-components
- One component per file
- Prefer functional components with hooks — no class components
- Prefer `const` arrow functions for components
- Always use i18next for any visible text — no hardcoded strings in JSX
- Use Framer Motion for all animations — no CSS keyframes

---

# Commands
## Development
- Start dev server: `npm run dev`
- Build production: `npm run build`
- Preview build: `npm run preview`

## Code Quality
- Lint: `npm run lint`
- Format: `npx prettier --write .`
- Lint + format: `npm run lint && npx prettier --write .`

---

# i18n Rules
- All user-facing text must use `useTranslation()` hook
- Translation keys follow the format: `section.element` (e.g. `hero.title`, `contact.submit`)
- Supported languages: [à préciser — ex: `en`, `fr`]
- Translation files live in `src/i18n/locales/`

---

# Project Rules

## 1. Plan Before Coding
- Before any implementation, write a structured plan (steps, files involved, risks)
- Present the plan and wait for explicit validation before starting
- Never code blindly: every task must have a clear objective

## 2. Delegate to Sub-Agents
- For complex or parallelizable tasks, delegate to specialized sub-agents
- Each sub-agent must have a defined scope and expected output
- Consolidate and verify sub-agent results before integrating them

## 3. Self-Improvement
- After each task, identify what can be optimized (code, process, rules)
- If a rule seems incomplete or incorrect, SUGGEST the update to the developer
- Never modify this file autonomously — always wait for human approval

## 4. Always Test
- Every feature must be covered by tests
- Run lint before and after every change: `npm run lint`
- Never ship code with lint errors or Prettier violations

## 5. Autonomous Bug Fixing
- When a bug is detected, analyze the root cause before fixing
- Fix the bug autonomously without waiting for additional instructions
- After fixing, validate with lint and briefly document the cause and the fix

---

# Prohibitions
- NEVER hardcode user-facing text — always use i18next
- NEVER use inline styles — use Tailwind classes only
- NEVER commit with ESLint errors
- NEVER use `var` — use `const` or `let`
- NEVER add new dependencies without justification
