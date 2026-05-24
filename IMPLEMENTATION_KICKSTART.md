# Luma Dental Studio - Implementation Kickstart

> Front-end prototype for a premium dental clinic landing page focused on smile consultations.

---

## Project Overview

| Property | Value |
|----------|-------|
| **Project Type** | Single-page landing page prototype |
| **Framework** | Next.js 16 with App Router |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animation** | Framer Motion |
| **Backend** | None (front-end only) |
| **Target Market** | Singapore |

### Key Objectives
- Showcase premium dental services with a calm, trustworthy aesthetic
- Drive conversions via "Book a Smile Consultation" CTA (minimum 3 placements)
- Deliver a fully responsive, accessible experience

---

## Design System

### Design Principles
1. **Clean** - Minimal visual noise, generous whitespace
2. **Calm** - Soft colors, no aggressive elements
3. **Modern** - Contemporary typography and layout
4. **Trustworthy** - Professional medical aesthetic
5. **Premium** - High-end feel without being flashy

### Glassmorphism Guidelines
Apply subtle glass effect to cards where appropriate:
- Semi-transparent white: `bg-white/80`
- Soft blur: `backdrop-blur-sm`
- Soft border: `border border-white/50`
- Soft shadow: `shadow-lg shadow-cyan-500/5`

**Do not overuse.** Reserve for feature cards and modal.

---

## Color Tokens

```css
/* globals.css - CSS Custom Properties */

:root {
  /* Background */
  --background: 210 40% 98%;           /* #F8FAFC - slate-50 */
  --foreground: 222 47% 11%;           /* #0F172A - slate-900 */

  /* Surface */
  --card: 0 0% 100%;                   /* #FFFFFF */
  --card-foreground: 222 47% 11%;      /* #0F172A */

  /* Soft Section Background */
  --muted: 183 100% 96%;               /* #ECFEFF - cyan-50 */
  --muted-foreground: 215 16% 47%;     /* #64748B - slate-500 */

  /* Primary Accent */
  --primary: 187 85% 37%;              /* #0891B2 - cyan-600 */
  --primary-foreground: 0 0% 100%;     /* #FFFFFF */

  /* Primary Hover */
  --primary-hover: 189 86% 30%;        /* #0E7490 - cyan-700 */

  /* Text Colors */
  --heading: 222 47% 11%;              /* #0F172A - slate-900 */
  --body: 215 19% 35%;                 /* #475569 - slate-600 */
  --muted-text: 215 16% 47%;           /* #64748B - slate-500 */

  /* Border */
  --border: 214 32% 91%;               /* #E2E8F0 - slate-200 */
  --input: 214 32% 91%;                /* #E2E8F0 */
  --ring: 187 85% 37%;                 /* #0891B2 - matches primary */

  /* Success/Check Accent */
  --accent: 168 80% 40%;               /* #14B8A6 - teal-500 */
  --accent-foreground: 0 0% 100%;      /* #FFFFFF */

  /* Destructive (for errors) */
  --destructive: 0 84% 60%;            /* #EF4444 - red-500 */
  --destructive-foreground: 0 0% 100%; /* #FFFFFF */

  /* Radius */
  --radius: 0.75rem;                   /* 12px */
}
```

### Tailwind Color Mapping

| Token | Hex | Tailwind Equivalent | Usage |
|-------|-----|---------------------|-------|
| Background | `#F8FAFC` | `slate-50` | Page background |
| Surface | `#FFFFFF` | `white` | Cards, modal |
| Soft BG | `#ECFEFF` | `cyan-50` | Alternating sections |
| Primary | `#0891B2` | `cyan-600` | CTAs, links, accents |
| Primary Hover | `#0E7490` | `cyan-700` | Button hover states |
| Heading | `#0F172A` | `slate-900` | H1, H2, H3 |
| Body | `#475569` | `slate-600` | Paragraph text |
| Muted | `#64748B` | `slate-500` | Captions, disclaimers |
| Border | `#E2E8F0` | `slate-200` | Borders, dividers |
| Success | `#14B8A6` | `teal-500` | Checkmarks, success states |

---

## Typography System

### Font Stack
- **Primary Font:** Inter (Google Fonts)
- **Fallback:** system-ui, sans-serif

### Type Scale

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| H1 | `text-5xl` to `text-6xl` | `text-4xl` | `font-bold` (700) | `leading-tight` |
| H2 | `text-3xl` to `text-4xl` | `text-2xl` | `font-semibold` (600) | `leading-tight` |
| H3 | `text-xl` to `text-2xl` | `text-lg` | `font-semibold` (600) | `leading-snug` |
| Body | `text-base` to `text-lg` | `text-base` | `font-normal` (400) | `leading-relaxed` |
| Caption | `text-sm` | `text-sm` | `font-normal` (400) | `leading-normal` |
| Button | `text-base` | `text-base` | `font-medium` (500) | `leading-none` |

### Typography Rules
- Use `text-balance` on headings for optimal line breaks
- Use `text-pretty` on body paragraphs
- Maximum line length: `max-w-prose` (~65 characters)

---

## Spacing System

### Vertical Section Spacing
- Desktop: `py-20` to `py-24` (80px - 96px)
- Tablet: `py-16` (64px)
- Mobile: `py-12` to `py-16` (48px - 64px)

### Container
- Max width: `max-w-6xl` (1152px) or `max-w-7xl` (1280px)
- Horizontal padding: `px-4` mobile, `px-6` tablet, `px-8` desktop

### Component Spacing
- Card padding: `p-6` to `p-8`
- Button padding: `px-6 py-3` (standard), `px-8 py-4` (large)
- Gap between cards: `gap-6` to `gap-8`
- Gap between sections: `space-y-4` to `space-y-6`

---

## Component Architecture

```
components/
├── layout/
│   ├── header.tsx           # Sticky navigation
│   └── footer.tsx           # Minimal conversion footer
├── sections/
│   ├── hero.tsx             # Hero with CTA
│   ├── trust-bar.tsx        # Trust badges
│   ├── problem-transformation.tsx
│   ├── treatments.tsx       # Service cards
│   ├── consultation-steps.tsx
│   ├── why-choose.tsx       # Unique value props
│   ├── results.tsx          # Before/after gallery
│   ├── testimonials.tsx     # Social proof
│   ├── pricing.tsx          # Featured pricing card
│   ├── clarity-promise.tsx  # Reassurance section
│   ├── faq.tsx              # Accordion FAQ
│   └── final-cta.tsx        # Final conversion section
├── ui/
│   └── (shadcn components)
├── booking-modal.tsx        # Contact form modal
└── back-to-top.tsx          # Scroll-to-top button
```

### File Size Guidelines
- Target: 100-300 lines per component
- Maximum: 400-600 lines
- Split if exceeding limits

---

## Section-by-Section Build Plan

### 1. Header
- **Layout:** Logo left, nav center/right, CTA button right
- **Behavior:** Sticky on scroll with subtle shadow
- **Mobile:** Hamburger menu with slide-out drawer
- **Nav Links:** Treatments, Results, Pricing, FAQ (anchor links)
- **CTA:** "Book a Smile Consultation" button (opens modal)

### 2. Hero Section
- **Layout:** Two columns on desktop (text left, image right), stacked on mobile
- **Content:**
  - Headline: "Your Smile Deserves Modern Care"
  - Subheadline: Clear value proposition
  - CTA button (primary, large)
  - Trust indicators (ratings, years of experience)
- **Image:** Placeholder with rounded corners, 16:10 aspect ratio
- **Background:** `bg-background` with subtle gradient overlay optional

### 3. Trust Bar
- **Layout:** Horizontal row of 3-4 badges
- **Content:** Certifications, patient count, experience years
- **Styling:** Icons + text, subtle borders between items
- **Mobile:** 2x2 grid or horizontal scroll

### 4. Problem & Transformation
- **Layout:** Two parts - pain points and transformation promise
- **Pain Points:** 3-4 bullet points addressing common concerns
- **Transformation:** Emotional outcome statement
- **Styling:** Soft background (`bg-muted`), contrast section

### 5. Treatments (Services)
- **Layout:** 3-column grid on desktop, stacked on mobile
- **Cards:** Glass effect, icon, title, description, "Learn more" link
- **Services:**
  - Teeth Whitening
  - Veneers & Smile Design
  - Invisible Aligners
- **Hover:** Subtle lift animation

### 6. Consultation Steps
- **Layout:** Horizontal steps on desktop, vertical on mobile
- **Steps:** 4 steps with numbered badges
  1. Book Online
  2. Meet Your Dentist
  3. Get Your Plan
  4. Transform Your Smile
- **Connector:** Subtle line between steps on desktop
- **CTA:** Button after steps (opens modal)

### 7. Why Choose Luma
- **Layout:** Two columns - image left, content right
- **Content:**
  - Dentist photo placeholder (portrait)
  - 4-5 unique value propositions with checkmarks
  - Brief clinic story/philosophy
- **Styling:** Checkmarks use `--accent` color (teal)

### 8. Results Gallery
- **Layout:** Grid of before/after cards
- **Cards:** Side-by-side placeholder images per card
- **Labels:** "Before" / "After" badges on images
- **Count:** 3-4 transformation examples
- **Disclaimer:** Small text about results varying

### 9. Testimonials
- **Layout:** 3-column carousel or grid
- **Cards:**
  - Avatar placeholder (circular)
  - Quote text
  - Name and treatment type
  - Star rating (5 stars)
- **Styling:** Glass effect cards

### 10. Pricing
- **Layout:** Centered single featured card
- **Content:**
  - "Smile Confidence Consultation"
  - Price: S$49
  - What's included (3-4 bullet points)
  - CTA button (opens modal)
- **Styling:** Highlighted border, subtle shadow, glass effect
- **Disclaimer:** Prototype pricing disclaimer text

### 11. Clarity Promise
- **Layout:** Centered text block with icon
- **Content:**
  - "No pressure, no judgment" promise
  - Reassurance about consultation experience
- **Styling:** Soft background, trust-building iconography

### 12. FAQ Section
- **Layout:** Single column accordion
- **Questions:** 5-6 common questions
- **Behavior:** Click to expand, others collapse (single open)
- **Animation:** Smooth height transition
- **Content:** Drawn from original plan

### 13. Final CTA Section
- **Layout:** Full-width centered
- **Content:**
  - Strong closing headline
  - Subtext with urgency (without being pushy)
  - Large primary CTA button (opens modal)
- **Styling:** Primary color background, white text

### 14. Footer
- **Layout:** 3-column - logo/tagline, nav links, CTA
- **Content:**
  - Clinic name and tagline
  - Quick links: Treatments, Pricing, FAQ, Contact
  - "Book a Consultation" button
  - Copyright and prototype disclaimer
- **Mobile:** Stacked, centered

---

## CTA Strategy

### Minimum 3 CTA Placements
1. **Hero Section** - Primary, large button
2. **After Consultation Steps** - Secondary placement
3. **Pricing Card** - Conversion focused
4. **Final CTA Section** - Closing conversion
5. **Header** - Persistent access
6. **Footer** - Final opportunity

### Button Styling
```tsx
// Primary CTA
className="bg-primary hover:bg-primary-hover text-primary-foreground 
           px-6 py-3 rounded-lg font-medium transition-all duration-200
           hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5"

// Large CTA (Hero, Final CTA)
className="... px-8 py-4 text-lg"
```

---

## Modal Behavior

### BookingModal Component
- **Trigger:** All "Book a Smile Consultation" buttons
- **Animation:** Fade in backdrop, scale up modal
- **Close:** Click outside, X button, or Escape key
- **Focus trap:** Accessible keyboard navigation

### Form Fields
| Field | Type | Required | Placeholder |
|-------|------|----------|-------------|
| Full Name | text | Yes | "Your full name" |
| Email | email | Yes | "your@email.com" |
| Phone | tel | Yes | "+65" |
| Treatment Interest | select | Yes | Dropdown options |
| Preferred Time | select | No | "Morning / Afternoon / Evening" |
| Message | textarea | No | "Tell us about your smile goals..." |

### Treatment Dropdown Options
- General Consultation
- Teeth Whitening
- Veneers & Smile Design
- Invisible Aligners
- Other

### Submit Behavior
1. Basic front-end validation
2. Show loading state
3. Display success message: "Thanks — this prototype form has been submitted."
4. Auto-close modal after 3 seconds or manual close

---

## Responsive Strategy

### Breakpoints
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px (`sm`) | Single column |
| Tablet | 640px - 1024px (`sm` to `lg`) | Two columns |
| Desktop | > 1024px (`lg`) | Full multi-column |

### Section-Specific Breakpoints

| Section | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Header | Hamburger | Hamburger | Full nav |
| Hero | Stacked | Stacked | 2-col |
| Trust Bar | 2x2 grid | Row | Row |
| Treatments | 1 col | 2 col | 3 col |
| Steps | Vertical | Vertical | Horizontal |
| Why Choose | Stacked | Stacked | 2-col |
| Results | 1 col | 2 col | 3-4 col |
| Testimonials | 1 col | 2 col | 3 col |
| Pricing | Full width | Centered | Centered |
| FAQ | Full width | Centered | Centered |

### Mobile-Specific Rules
- CTAs: Full-width or centered with `w-full sm:w-auto`
- Cards: Stacked vertically
- Header: Hamburger menu
- Tap targets: Minimum 44x44px
- Font sizes: Reduce headings by 1-2 steps

---

## Animation Strategy

### Framer Motion Patterns

```tsx
// Section reveal (fade up)
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

// Card hover
const cardHover = {
  rest: { y: 0, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
  hover: { 
    y: -4, 
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    transition: { duration: 0.2 }
  }
}

// Button hover
const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.15 }
}

// Modal
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  }
}
```

### Animation Rules
- Use `whileInView` for scroll-triggered animations
- Set `viewport={{ once: true }}` to animate only first time
- Keep durations under 500ms
- No bouncing or elastic effects
- Respect `prefers-reduced-motion`

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color Contrast | 4.5:1 minimum for body text, 3:1 for large text |
| Focus States | Visible `ring-2 ring-primary ring-offset-2` |
| Keyboard Nav | All interactive elements focusable via Tab |
| Semantic HTML | `<header>`, `<main>`, `<section>`, `<footer>` |
| ARIA Labels | `aria-label` on icon-only buttons, modals |
| Alt Text | Descriptive alt for all images |
| Form Labels | Explicit `<label>` for all inputs |
| Modal Focus Trap | Focus stays within modal when open |
| Reduced Motion | `motion-reduce:` variants for animations |

### Focus Ring Pattern
```tsx
className="focus-visible:outline-none focus-visible:ring-2 
           focus-visible:ring-primary focus-visible:ring-offset-2"
```

---

## Image Placeholders

### Specifications

| Image | Aspect Ratio | Size | Style |
|-------|--------------|------|-------|
| Hero | 16:10 | 600x375 | Rounded corners (`rounded-2xl`) |
| Dentist Portrait | 3:4 | 400x533 | Rounded corners |
| Before/After | 4:3 | 300x225 each | Side by side, subtle border |
| Testimonial Avatar | 1:1 | 64x64 | Circular (`rounded-full`) |
| Treatment Icons | 1:1 | 48x48 | Use Lucide icons |

### Placeholder Pattern
```tsx
<div className="bg-slate-200 rounded-2xl aspect-[16/10] flex items-center justify-center">
  <span className="text-slate-400">Image Placeholder</span>
</div>
```

---

## SEO & Metadata

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: "Luma Dental Studio | Modern Dental Care in Singapore",
  description: "A front-end prototype for a premium dental clinic landing page focused on smile consultations.",
  keywords: ["dental", "dentist", "Singapore", "smile consultation", "teeth whitening", "veneers"],
  openGraph: {
    title: "Luma Dental Studio",
    description: "Modern dental care for your best smile",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#0891B2",
  width: "device-width",
  initialScale: 1,
}
```

---

## Implementation Checklist

### Phase 1: Setup
- [ ] Update `globals.css` with color tokens
- [ ] Configure Inter font in `layout.tsx`
- [ ] Update `tailwind.config.ts` with extended colors
- [ ] Install Framer Motion (`pnpm add framer-motion`)
- [ ] Update metadata in `layout.tsx`

### Phase 2: Core Components
- [ ] Create `components/layout/header.tsx`
- [ ] Create `components/layout/footer.tsx`
- [ ] Create `components/booking-modal.tsx`
- [ ] Create `components/back-to-top.tsx`

### Phase 3: Sections (Build Order)
- [ ] `components/sections/hero.tsx`
- [ ] `components/sections/trust-bar.tsx`
- [ ] `components/sections/problem-transformation.tsx`
- [ ] `components/sections/treatments.tsx`
- [ ] `components/sections/consultation-steps.tsx`
- [ ] `components/sections/why-choose.tsx`
- [ ] `components/sections/results.tsx`
- [ ] `components/sections/testimonials.tsx`
- [ ] `components/sections/pricing.tsx`
- [ ] `components/sections/clarity-promise.tsx`
- [ ] `components/sections/faq.tsx`
- [ ] `components/sections/final-cta.tsx`

### Phase 4: Integration
- [ ] Assemble all sections in `app/page.tsx`
- [ ] Wire up modal open/close state
- [ ] Implement smooth scroll navigation
- [ ] Add scroll-triggered animations
- [ ] Test responsive layouts

### Phase 5: Polish
- [ ] Verify all CTA placements (minimum 3)
- [ ] Test keyboard navigation
- [ ] Verify color contrast
- [ ] Test on mobile devices
- [ ] Add reduced motion support
- [ ] Final visual review

---

## Prototype Disclaimer

This is a **front-end prototype only**.

- No backend functionality
- No real form submission
- No database storage
- No real patient data
- Pricing shown is for prototype purposes only

---

*Document created for Luma Dental Studio landing page implementation.*
