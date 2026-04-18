# Tech Spec — Tojo Nambinina Portfolio

## Dependencies

### Core
- react, react-dom, react-router-dom
- vite, @vitejs/plugin-react, typescript, tailwindcss

### Animation
- framer-motion — scroll reveals, hover effects, stagger animations, modal transitions
- gsap + ScrollTrigger — scroll-driven animations, timeline, section pinning
- lenis — smooth scrolling with inertial momentum

### 3D
- three, @types/three
- @react-three/fiber — React renderer for Three.js
- @react-three/drei — helpers (useTexture, Environment, etc.)

### UI Components
- swiper — horizontal project gallery
- lucide-react — icons
- react-hook-form — form validation
- zod — schema validation
- @supabase/supabase-js — contact form data storage

### Fonts
- @fontsource-variable/inter
- Satoshi Variable (local font via font files)

---

## Component Inventory

### Layout
- **Navigation** — fixed top, glassmorphism backdrop, scroll-aware visibility, mobile hamburger
- **WhatsAppFAB** — floating action button, fixed bottom-right, pulse animation
- **LoadingScreen** — full viewport spinner, fades out on ready
- **ScrollIndicator** — hero chevron, fades on scroll

### Sections
- **HeroSection** — video background, gradient overlay, glassmorphism info cards, staggered entrance
- **SkillsSection** — two-column skill grid with proficiency dots, scroll-triggered card reveals
- **ExperienceSection** — vertical timeline with alternating cards, line-draw animation
- **ProjectsSection** — horizontal scroll gallery, preview modal with iframe
- **ShowreelSection** — centered video player with custom play button
- **TestimonialsSection** — Three.js spiral cylinder, pinned scroll, detail modal
- **CTASection** — video background, left-aligned content
- **Footer** — 4-column layout, social links

### Reusable Components
- **GlassCard** — glassmorphism card wrapper (blur, border, shadow)
- **SectionHeader** — label + title + subtitle pattern
- **SkillCard** — icon + name + proficiency dots
- **TimelineCard** — experience/education card for timeline
- **ProjectCard** — image + category + title + description
- **TestimonialCard** — 3D textured card (R3F component)
- **TestimonialModal** — HTML overlay modal for testimonial detail
- **PreviewModal** — full-screen iframe preview for projects
- **AnimatedButton** — primary/secondary button with hover animation
- **StarRating** — 5-star display component

### Hooks
- **useScrollReveal** — GSAP ScrollTrigger wrapper for section entrances
- **useLenis** — Lenis smooth scroll initialization
- **useScrollProgress** — scroll progress for a section (0-1)
- **useMediaQuery** — responsive breakpoint detection
- **useContactForm** — form submission with Supabase integration

---

## Animation Implementation

| Animation | Library | Implementation | Complexity |
|-----------|---------|---------------|------------|
| Hero staggered entrance | GSAP timeline | Timeline with sequenced delays for label, name, tagline, CTAs, cards | Low |
| Nav scroll-aware visibility | Framer Motion | useScroll + useTransform for opacity based on scrollY | Low |
| Glass card hover effects | Framer Motion | whileHover scale, shadow transition | Low |
| Skill card scroll reveal | GSAP ScrollTrigger | Batch animation with stagger, alternating slide directions | Medium |
| Skill dot fill animation | GSAP | Sequential scale animation triggered after card appears | Low |
| Timeline line draw | GSAP ScrollTrigger | scaleY 0→1 with transformOrigin top | Low |
| Timeline card slide-in | GSAP ScrollTrigger | Alternating translateX(±40px)→0, stagger 0.2s | Low |
| Project card horizontal entrance | GSAP ScrollTrigger | translateX(60px)→0, stagger 0.1s | Low |
| Project card hover | Framer Motion | whileHover scale 1.05, shadow increase | Low |
| Showreel container entrance | GSAP ScrollTrigger | opacity+translateY+scale combined | Low |
| Play button pulse | CSS animation | Infinite scale keyframes | Low |
| **3D Cylinder scroll rotation** | **GSAP ScrollTrigger + R3F** | **Pinned section, scrub-driven rotation.y over 2000px** | **High** |
| **3D Card front-face lighting** | **Custom R3F shader** | **onBeforeCompile with dot product lighting** | **High** |
| **3D Inertial momentum** | **R3F useFrame** | **Velocity decay 0.9/frame from Lenis** | **Medium** |
| 3D Card click scale feedback | R3F | Brief scale animation on raycast hit | Low |
| Testimonial modal entrance | Framer Motion | AnimatePresence with scale+opacity | Low |
| Preview modal entrance | Framer Motion | AnimatePresence, backdrop opacity, iframe scale | Low |
| CTA section entrance | GSAP ScrollTrigger | Staggered title, subtitle, button | Low |
| Footer column entrance | GSAP ScrollTrigger | Staggered opacity+translateY | Low |
| WhatsApp FAB pulse | CSS animation | Pseudo-element ring pulse | Low |
| Scroll indicator bob | CSS animation | Infinite translateY keyframes | Low |
| Loading screen fade | Framer Motion | AnimatePresence opacity exit | Low |
| Smooth scroll | Lenis | Global instance with ScrollTrigger sync | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP ScrollTrigger Bridge
Lenis must feed into ScrollTrigger.update() on every scroll frame. Initialize once at app root. The Testimonials section's ScrollTrigger pin must be created after Lenis is ready. Use a ref to share the Lenis instance.

### 3D Scene Scroll Wiring
The Testimonials section needs:
1. A GSAP ScrollTrigger that pins the section and reports progress (0-1)
2. An R3F useFrame that reads the progress ref and applies rotation
3. Lenis velocity access for momentum (read from a shared ref updated on Lenis scroll callback)

The progress value must be stored in a ref (not state) to avoid React re-renders at 60fps.

### WebGL Fallback Detection
On mount, attempt to create a WebGL context. If it fails or `navigator.hardwareConcurrency < 4`, render a Swiper.js carousel instead of the 3D scene. Store this in a useRef to avoid re-renders.

### Modal Stack
Track open modal type ('project' | 'testimonial' | null) and associated data in a single state object at App level. Lock body scroll when any modal is open. Close on Escape via useEffect keydown listener.

### Contact Form
React Hook Form with Zod schema (name, email, message). On submit: POST to Supabase 'contacts' table. Show loading → success/error toast feedback.

---

## Other Key Decisions

### Font Strategy
Satoshi Variable loaded via @font-face from local woff2 files in /public/fonts/. Inter via @fontsource-variable/inter imported in main.tsx.

### Image Assets
All images generated via AI image generation tool and stored in /public/images/. Testimonial avatars are 512x512px. Project screenshots are 1280x800px. Hero poster is 1920x1080px.

### Video Strategy
Hero and CTA videos are autoplaying muted loops. Showreel is a static poster with play button that loads video on click. Use `<video>` elements with source files in /public/videos/.

### CSS Architecture
Tailwind for all styling. Custom animations via @keyframes in index.css. Glassmorphism as a reusable Tailwind component class. Responsive breakpoints: sm:640px, md:768px, lg:1024px, xl:1280px.
