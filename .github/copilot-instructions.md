# Copilot Instructions for Njoy Student Living

## Project Overview
A student accommodation booking website built with Svelte, Vite, and Tailwind CSS. Students can browse properties and book rooms in different cities.

## Tech Stack
- **Frontend**: Svelte 4.2.8 with Vite 5.0.8
- **Styling**: Tailwind CSS v4.1.14 with custom theme
- **Build System**: Vite with PostCSS and Autoprefixer
- **Module System**: ES modules (type: "module")

## Project Structure
```
src/
├── App.svelte          # Main app component
├── lib/                # Reusable components
│   └── Homepage.svelte # Landing page component
├── main.js            # Entry point
└── app.css            # Global styles with Tailwind directives
```

## Key Patterns & Conventions

### Svelte Components
- Use `<script>`, `<style>`, and markup sections in components
- Import Svelte lifecycle functions: `import { onMount } from 'svelte'`
- Component files in `src/lib/` for reusability

### Styling Approach
- Custom Tailwind theme with brand colors: `njoy-green` (#8BC34A), `njoy-dark` (#2E2E2E)
- Responsive design with mobile-first approach
- Use Tailwind utility classes for styling

### Development Workflow
- **Dev server**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build` (production build)
- **Preview**: `npm run preview` (preview production build)

## Brand Guidelines
- Primary green: `bg-njoy-green` (#8BC34A)
- Dark background: `bg-njoy-dark` (#2E2E2E) 
- Brand name: "Njoy Student Living"
- Typography: Arial, sans-serif

## Component Architecture
- Homepage includes: navigation, hero section, city selection cards, footer
- Use reactive statements and Svelte stores for state management
- Maintain component modularity for scalability