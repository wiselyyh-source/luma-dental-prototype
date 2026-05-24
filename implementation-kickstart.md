# Luma Dental Studio - Implementation Kickstart Plan

> **Status**: Front-end prototype only. No backend, database, or API integration.

---

## Project Overview

**Project**: Luma Dental Studio Landing Page  
**Type**: Single-page front-end prototype  
**Framework**: Next.js 16 with App Router  
**Styling**: Tailwind CSS + shadcn/ui components  
**Animation**: Framer Motion  
**Target**: Premium dental clinic in Singapore  

**Primary Goal**: Drive users to book a Smile Consultation (S$49)

---

## Design System

### Visual Direction
- Clean, calm, modern, trustworthy, premium
- Light theme (not dark mode)
- Subtle glassmorphism on cards (semi-transparent white, soft blur, soft shadows)
- Medical and professional aesthetic
- Generous whitespace

### Color Tokens

```css
/* globals.css CSS variables */
--background: #F8FAFC;        /* Page background */
--surface: #FFFFFF;           /* Card/component surfaces */
--surface-soft: #ECFEFF;      /* Soft section backgrounds */
--primary: #0891B2;           /* Main accent / CTA */
--primary-hover: #0E7490;     /* CTA hover state */
--foreground: #0F172A;        /* Dark heading text */
--muted-foreground: #475569;  /* Body text */
--muted: #64748B;             /* Caption/muted text */
--border: #E2E8F0;            /* Borders and dividers */
--success: #14B8A6;           /* Checkmarks, success states */
```

**Tailwind Mapping**:
- Background: `bg-slate-50` (#F8FAFC)
- Surface: `bg-white`
- Soft sections: `bg-cyan-50` (#ECFEFF)
- Primary: `bg-cyan-600` (#0891B2)
- Primary hover: `bg-cyan-700` (#0E7490)
- Headings: `text-slate-900` (#0F172A)
- Body: `text-slate-600` (#475569)
- Muted: `text-slate-500` (#64748B)
- Border: `border-slate-200` (#E2E8F0)
- Success: `text-teal-500` (#14B8A6)

### Typography System

**Font**: Inter (Google Fonts) - single font across entire site

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| H1 | text-5xl to text-7xl | text-4xl | font-bold (700) | leading-tight |
| H2 | text-3xl to text-5xl | text-2xl to text-3xl | font-bold (700) | leading-tight |
| H3 | text-xl to text-2xl | text-lg to text-xl | font-semibold (600) | leading-snug |
| Body | text-base to text-lg | text-base | font-normal (400) | leading-relaxed |
| Caption | text-sm | text-sm | font-normal (400) | leading-normal |

### Spacing Scale

- Section vertical padding: `py-16 md:py-24 lg:py-32`
- Container max-width: `max-w-7xl` (1280px) or `max-w-6xl` (1152px)
- Card padding: `p-6 md:p-8`
- Component gaps: `gap-4`, `gap-6`, `gap-8`
- Border radius: `rounded-lg` (cards), `rounded-xl` (featured), `rounded-full` (buttons/badges)

### Glassmorphism Card Style

```css
/* Subtle glass effect */
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(8px);
border: 1px solid rgba(226, 232, 240, 0.6);
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
```

Tailwind approximation:
```
bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm
```

---

## Component Architecture

```
/components
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx
│   ├── TrustBar.tsx
│   ├── ProblemTransformation.tsx
│   ├── Treatments.tsx
│   ├── ConsultationSteps.tsx
│   ├── WhyChoose.tsx
│   ├── Results.tsx
│   ├── Testimonials.tsx
│   ├── Pricing.tsx
│   ├── ClarityPromise.tsx
│   ├── FAQ.tsx
│   └── FinalCTA.tsx
├── ui/
│   └── (shadcn components - already installed)
├── BookingModal.tsx
└── BackToTopButton.tsx
```

**File size guideline**: 400-600 lines max per file

---

## Section-by-Section Build Plan

### 1. Header (Sticky)
- **Left**: Luma Dental Studio logo/text
- **Center**: Navigation links (Treatments, Results, Pricing, FAQ) - anchor scroll
- **Right**: CTA button "Book a Smile Consultation"
- **Mobile**: Hamburger menu with full navigation + CTA
- **Behavior**: Sticky on scroll, subtle shadow on scroll

### 2. Hero Section
- **Layout**: Two columns on desktop, stacked on mobile
- **Left column**: 
  - H1: "Smile With Confidence Again"
  - Subheadline about transformation
  - Primary CTA button
  - Trust indicators (ratings, reviews)
- **Right column**: Hero image placeholder (4:3 or 16:10, rounded corners)

### 3. Trust Bar
- 3-4 trust badges in horizontal row
- Icons + short text (e.g., "15+ Years Experience", "5,000+ Smiles", "MOH Licensed")
- Subtle background differentiation

### 4. Problem & Transformation
- Two-part narrative section
- Problem: Empathy with patient concerns
- Transformation: Aspirational outcome
- Optional subtle before/after visual hint

### 5. Treatments (3 Cards)
- Card layout: 3 columns desktop, 2 tablet, 1 mobile
- Each card: Icon, treatment name, brief description
- Treatments: Teeth Whitening, Smile Makeovers, Dental Implants
- Glassmorphism card styling
- Hover lift animation

### 6. Consultation Steps (Process)
- Horizontal step layout on desktop
- 3-4 steps with numbered indicators
- Connected visually (line or flow)
- Stacked on mobile

### 7. Why Choose Luma
- Feature list with checkmarks (success color)
- Dentist photo placeholder (portrait)
- Trust-building copy
- Optional credentials/awards

### 8. Results / Before-After
- Card-based layout
- Each card: Side-by-side placeholder blocks (before | after)
- Brief transformation description
- 2-3 result cards

### 9. Testimonials
- Quote cards with avatar placeholders
- Patient name, treatment type
- Star rating display
- Carousel or grid layout

### 10. Pricing
- Featured pricing card for "Smile Confidence Consultation"
- Price: S$49
- Included items list
- CTA button
- Disclaimer text at bottom
- Glassmorphism with subtle emphasis border

### 11. Clarity Promise
- Reassurance section
- No hidden fees messaging
- Transparency commitment
- Trust-building final push

### 12. FAQ (Accordion)
- 5-6 common questions
- shadcn Accordion component
- Smooth open/close animation
- One item open at a time (optional)

### 13. Final CTA Section
- Strong headline
- Subtext with urgency/value
- Large CTA button
- Soft background color (#ECFEFF)

### 14. Footer (Option A - Minimal)
- **Left**: Clinic name + tagline
- **Center**: Simple navigation links
- **Right**: CTA button
- Copyright line at bottom

---

## CTA Behavior

**All "Book a Smile Consultation" buttons**:
1. Open `BookingModal` component
2. Modal contains contact form (front-end only)
3. No backend submission

**Navigation links**:
- Smooth scroll to anchor sections
- Offset for sticky header height

---

## Modal Behavior

### BookingModal Component

**Trigger**: Any CTA button click

**Form Fields**:
| Field | Type | Required |
|-------|------|----------|
| Full Name | text input | Yes |
| Email | email input | Yes |
| Phone Number | tel input | Yes |
| Treatment Interest | dropdown select | Yes |
| Preferred Consultation Time | text/select | No |
| Message | textarea | No |

**Treatment Interest Options**:
- Teeth Whitening
- Smile Makeover
- Dental Implants
- General Consultation
- Other

**Submit Behavior**:
1. Basic front-end validation
2. On submit: Show success message
3. Success message: "Thanks — this prototype form has been submitted."
4. Close modal after brief delay or manual close

**Modal UX**:
- Centered overlay
- Click outside to close
- Escape key to close
- Focus trap for accessibility
- Smooth open/close animation (Framer Motion)

---

## Responsive Strategy

### Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Layout Changes

| Section | Desktop (lg+) | Tablet (md) | Mobile (sm) |
|---------|---------------|-------------|-------------|
| Header | Full nav | Full nav | Hamburger |
| Hero | 2 columns | 2 columns | Stacked |
| Treatments | 3 columns | 2 columns | 1 column |
| Steps | Horizontal | Horizontal | Stacked |
| Results | 3 columns | 2 columns | 1 column |
| Testimonials | 3 columns | 2 columns | 1 column |
| Pricing | Centered card | Centered card | Full width |

### Mobile Specifics
- CTA buttons: Full width or clearly centered
- Cards: Stack vertically with consistent spacing
- Images: Maintain aspect ratio, max-width contained
- Typography: Reduced sizes per typography scale
- Touch targets: Minimum 44x44px

---

## Animation Strategy

**Library**: Framer Motion

### Section Reveals
- Fade-up on scroll into view
- Stagger children elements
- `initial={{ opacity: 0, y: 20 }}`
- `animate={{ opacity: 1, y: 0 }}`
- Duration: 0.5-0.6s
- Ease: easeOut

### Card Hover
- Subtle lift: `translateY(-4px)`
- Soft shadow increase
- Duration: 0.2s

### Button Hover
- Slight scale: `scale(1.02)`
- Shadow enhancement
- Background color transition to hover state

### Modal
- Overlay: Fade in
- Content: Scale up from 0.95 + fade
- Duration: 0.2-0.3s

### FAQ Accordion
- Height animation on expand/collapse
- Content fade in
- Use shadcn accordion with CSS transitions

### Back to Top Button
- Fade in when scrolled past first section
- Smooth scroll to top on click

**Animation Principles**:
- No bouncing
- No heavy motion
- No distracting effects
- Subtle and professional only

---

## Accessibility Requirements (WCAG 2.1 AA)

### Semantic HTML
- Use `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`
- Proper heading hierarchy (h1 > h2 > h3)
- `<button>` for interactive elements
- `<a>` for navigation links

### Focus States
- Visible focus ring on all interactive elements
- `focus-visible:ring-2 focus-visible:ring-cyan-600 focus-visible:ring-offset-2`

### Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- All color combinations verified

### Modal Accessibility
- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` for modal title
- Focus trap within modal
- Return focus to trigger on close
- Escape key closes modal

### Images
- Meaningful `alt` text for all images
- Decorative images: `alt=""`

### Forms
- Labels associated with inputs (`htmlFor`)
- Error messages linked with `aria-describedby`
- Required fields marked with `aria-required`

### Skip Link
- "Skip to main content" link (optional but recommended)

---

## SEO & Metadata

### Page Metadata (layout.tsx)
```typescript
export const metadata = {
  title: "Luma Dental Studio | Modern Dental Care in Singapore",
  description: "A front-end prototype for a premium dental clinic landing page focused on smile consultations.",
};
```

### Semantic Structure
- Single `<h1>` in Hero
- Logical `<h2>` for each section
- `<h3>` for subsections/cards

---

## Final Implementation Checklist

### Setup
- [ ] Configure Inter font in layout.tsx
- [ ] Update globals.css with color tokens
- [ ] Update tailwind.config.ts with extended colors
- [ ] Update layout.tsx metadata

### Components
- [ ] Header (sticky, responsive, hamburger)
- [ ] Hero section
- [ ] TrustBar
- [ ] ProblemTransformation
- [ ] Treatments (3 cards)
- [ ] ConsultationSteps
- [ ] WhyChoose
- [ ] Results (before/after cards)
- [ ] Testimonials
- [ ] Pricing (featured card, S$49)
- [ ] ClarityPromise
- [ ] FAQ (accordion)
- [ ] FinalCTA
- [ ] Footer (Option A)
- [ ] BookingModal
- [ ] BackToTopButton

### Functionality
- [ ] Smooth scroll navigation
- [ ] Modal open/close with form
- [ ] Form validation (front-end)
- [ ] Success message display
- [ ] Back to top button visibility
- [ ] Mobile hamburger menu toggle

### Animations
- [ ] Section fade-up reveals
- [ ] Card hover effects
- [ ] Button hover states
- [ ] Modal transitions
- [ ] Accordion animations

### Accessibility
- [ ] Semantic HTML structure
- [ ] Focus states on all interactive elements
- [ ] Modal focus trap
- [ ] Alt text for images
- [ ] Color contrast verified

### Responsive
- [ ] Desktop layout (1024px+)
- [ ] Tablet layout (768px-1023px)
- [ ] Mobile layout (<768px)
- [ ] Touch targets verified

### Final Review
- [ ] All CTA buttons open modal
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Visual consistency across sections
- [ ] Performance check (no heavy animations)

---

## Notes

- This is a **front-end prototype only**
- No backend, database, or API integration
- Form submissions are simulated with local state
- All images use placeholders
- Pricing is prototype pricing (S$49)
