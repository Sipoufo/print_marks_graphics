# Print Marks graphics

**Print Marks graphics** is a modern, responsive web application serving as the primary digital footprint for a premier graphic design, printing, educational materials, and events brand. Crafted with a premium aesthetic, the platform delivers a seamless, internationalized user experience backed by a robust and highly performant tech stack.

## Key Features

- **Modern UI/UX**: Built entirely on **Tailwind CSS v4** for clean, scalable, and highly customizable utility-based styling.
- **Seamless Internationalization (i18n)**: Fully supported dual-language implementation (French and English) ensuring a broad audience reach without compromise.
- **High-Performance Serving**: Deployed via **Docker** and **Nginx**, ensuring lightning-fast static asset delivery and rock-solid uptime.
- **Dynamic Animations**: Engaging and performant micro-interactions powered by **Framer Motion**, creating an immersive and dynamic user experience.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Vite) |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **I18n** | i18next |
| **Container** | Docker & Docker Compose |

## Architecture

The project is intelligently architected to promote ultimate modularity, scale, and ease of maintenance:

- `src/sections/`: Contains the high-level, layout-agnostic page sections (e.g., Hero, Services, Workflow, Team, Contact).
- `src/components/ui/`: Houses the reusable, primitive UI components (e.g., Buttons, Cards) that strictly enforce the brand's design system.
- `src/data/siteData.js`: Serves as the centralized, single-source-of-truth data store for content, ensuring that application copy and configuration remain strictly decoupled from the presentation layer.

## Getting Started (Local Development)

To run the application locally for feature development or testing:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Deployment & Docker

For production environments, the project leverages a highly optimized layer-cached **Multi-stage Docker build**. 
1. **Build Stage**: Compiles the React application using modern Node toolchains into static, framework-agnostic optimized assets.
2. **Production Stage**: Securely serves the generated static files behind a lightweight, high-performance **Nginx** server.

To eagerly deploy the entire stack:
```bash
docker compose up -d
```
*This command will seamlessly orchestrate building the image and safely launching the containerized application in detached mode.*

## Internationalization

Translations are dynamically managed using strict JSON schemas. Standard resource paths are located in `public/locales/`. 
To update or seamlessly introduce new translations, strictly modify the corresponding target files (e.g., `en/translation.json` or `fr/translation.json`). The application's `i18next` integration layer will automatically securely ingest and resolve these changes.

## Contact Strategy

The platform implements a robust **Dual-Path Contact Strategy** optimized strictly for conversion metrics and user satisfaction:
- **Direct Real-Time Engagement**: A primary, completely frictionless path actively routing clients directly to **WhatsApp**, pre-filled with context-aware, actionable intent messaging.
- **Formal Inquiries**: A secondary, structured escalation path via **Email** aimed precisely at authoritative formal requests or comprehensive project briefs.

The funnel logic and routing metrics are centrally configured directly within `siteData.js` to ensure fault-tolerant communication routing.
