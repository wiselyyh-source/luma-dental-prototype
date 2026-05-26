"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Menu,
  X,
  Sparkles,
  Shield,
  Clock,
  Users,
  Check,
  Star,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Award,
  Heart,
  Smile,
  Calendar,
  FileText,
  MessageCircle,
  ChevronsUpDown,
  Grid,
  Columns,
  Activity,
  ChevronsDown,
  ChevronsUp,
  LayoutGrid,
  ArrowLeftRight,
  Flame,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const serviceDetailsMap: Record<string, {
  title: string;
  description: string;
  suitableFor: string;
  whatToExpect: string;
  suitableForShort: string;
  time: string;
  type: string;
}> = {
  whitening: {
    title: "Teeth Whitening",
    description: "Safe, professional whitening treatments that lift deep stains and brighten your smile by several shades in a single visit.",
    suitableFor: "Patients looking to treat surface stains from coffee, tea, food, or natural aging, and who want quick, visible results.",
    whatToExpect: "A 60-minute in-chair treatment. We apply a protective gel to your gums, followed by a professional whitening agent activated by a specialized light.",
    suitableForShort: "Stained or yellowed teeth",
    time: "60 mins",
    type: "Cosmetic Dentistry"
  },
  veneers: {
    title: "Veneers & Smile Design",
    description: "Custom-designed porcelain or composite veneers crafted to reshape, align, and restore your teeth for a natural-looking transformation.",
    suitableFor: "Patients with chipped, cracked, severely discolored, or slightly misaligned teeth who desire a complete, long-lasting aesthetic restoration.",
    whatToExpect: "A collaborative smile planning session with digital previews, followed by tooth preparation and custom placement of your veneers over 2–3 visits.",
    suitableForShort: "Chipped or uneven teeth",
    time: "2-3 visits",
    type: "Smile Design"
  },
  aligners: {
    title: "Invisible Aligners",
    description: "Modern, clear aligner systems that gently straighten teeth over time, offering a comfortable, discreet alternative to traditional braces.",
    suitableFor: "Teens and adults with mild to moderate tooth crowding, gaps, or bite issues who want a virtually invisible orthodontic solution.",
    whatToExpect: "A 3D scan of your teeth to map out your digital alignment journey. You will receive custom clear aligner trays to wear daily and change every 1–2 weeks.",
    suitableForShort: "Crowded teeth or gaps",
    time: "6-18 months",
    type: "Orthodontics"
  },
  "general-dentistry": {
    title: "General Dentistry",
    description: "Essential oral healthcare, including tooth-colored fillings, wisdom tooth extractions, and root canal therapy to keep your teeth healthy.",
    suitableFor: "Patients experiencing dental discomfort, tooth decay, structure damage, or requiring basic restorative treatments.",
    whatToExpect: "A thorough exam and diagnostic X-rays. Treatments are carried out using local anesthesia and gentle techniques to ensure absolute comfort.",
    suitableForShort: "Tooth pain, decay or damage",
    time: "30-60 mins",
    type: "General Restorative"
  },
  implants: {
    title: "Dental Implants",
    description: "Permanent restorative solutions for missing teeth, utilizing premium titanium posts and lifelike custom crowns to restore function and bite.",
    suitableFor: "Individuals with one or more missing teeth who have healthy bone density and seek a durable, natural-feeling tooth replacement.",
    whatToExpect: "A digital CT scan to assess bone structure, followed by precise placement of a titanium post, healing phase, and attachment of a custom crown.",
    suitableForShort: "Missing single/multiple teeth",
    time: "3-6 months",
    type: "Restorative Surgery"
  },
  cleaning: {
    title: "Dental Cleaning & Checkups",
    description: "Routine scaling, polishing, and comprehensive dental examinations to prevent decay, manage gum health, and maintain optimal hygiene.",
    suitableFor: "Everyone! Recommended every 6 months to maintain oral health, prevent gum disease, and catch potential dental issues early.",
    whatToExpect: "A professional scaling to remove plaque and tartar, airflow polishing to lift surface stains, followed by a detailed checkup and advice from your dentist.",
    suitableForShort: "Routine preventive care",
    time: "45 mins",
    type: "Hygiene & Prevention"
  }
}

const serviceModalDetailsMap: Record<string, {
  overview: string;
  idealFor: string;
  expect: string;
  timeline: string;
  aftercare: string;
}> = {
  whitening: {
    overview: "A professional in-clinic whitening procedure using concentrated whitening gels and specialized light activation to safely lift deep stains.",
    idealFor: "Discolored or yellowed teeth due to coffee, tea, food, tobacco, or natural aging, where regular scaling and polishing cannot remove the stains.",
    expect: "Gums are isolated with a barrier gel, then the whitening agent is applied to teeth and activated with a specialized blue LED light. Done in three 15-minute cycles.",
    timeline: "1 visit of about 60–75 minutes.",
    aftercare: "Avoid highly colored food/drinks (coffee, red wine, curry) for 48 hours. Mild, temporary sensitivity is normal and resolves in 1–2 days."
  },
  veneers: {
    overview: "Thin, custom-crafted porcelain or composite shells bonded to the front of teeth to improve shape, alignment, or color.",
    idealFor: "Chipped, worn, spaced, or severely stained teeth that do not respond to whitening, providing a long-term cosmetic restoration.",
    expect: "Collaborative smile planning with digital previews. Teeth are minimally prepped, temporary veneers are placed, and custom porcelain shells are bonded.",
    timeline: "2 to 3 visits over 2 weeks.",
    aftercare: "Brush and floss daily as normal. Avoid biting directly into very hard foods (like ice or hard candy) to prevent chips."
  },
  aligners: {
    overview: "A modern orthodontic treatment using a sequence of custom-made, clear, removable trays to gradually align teeth into their desired positions.",
    idealFor: "Patients with mild to moderate crowding, spacing, or minor bite issues who prefer a discreet, metal-free alternative to traditional braces.",
    expect: "3D digital scan of your teeth to simulate movement. You will receive sets of custom aligners to wear for 20–22 hours daily, changing them every 1–2 weeks.",
    timeline: "6 to 18 months, with short check-up visits every 6–8 weeks.",
    aftercare: "Clean trays daily. Wear a retainer nightly after treatment completion to maintain alignment."
  },
  "general-dentistry": {
    overview: "Core restorative treatments including tooth-colored fillings, crown restorations, root canals, or extractions to address decay or structural damage.",
    idealFor: "Patients experiencing localized toothache, sensitivity, cavities, or fractured tooth structure requiring conservative restoration.",
    expect: "A clinical exam and digital X-rays to locate the issue. Local anesthesia is administered for comfort, followed by decay removal and filling placement.",
    timeline: "Most fillings take 1 visit of 30–60 minutes. Crowns require 2 visits.",
    aftercare: "Sensitivity to hot and cold may persist for a few days. Maintain routine brushing and flossing around the restoration."
  },
  implants: {
    overview: "A premium, permanent replacement for a missing tooth, comprising a titanium implant post that acts as a root, and a custom porcelain crown.",
    idealFor: "Adults with one or more missing teeth who have adequate jawbone density and healthy gums to support the implant.",
    expect: "Detailed 3D CT scan and surgical planning. The implant is placed under local anesthesia, followed by a healing phase (osseointegration), and finally the crown placement.",
    timeline: "3 to 6 months total, across 3–4 planning and placement visits.",
    aftercare: "Treat the implant like a natural tooth with regular brushing, flossing, and twice-yearly clinical checkups."
  },
  cleaning: {
    overview: "Professional preventative care involving scaling to remove plaque and tartar, polishing to remove surface stains, and a clinical exam.",
    idealFor: "All patients. Recommended every 6 months to prevent gum disease, tooth decay, and to detect any potential oral health issues early.",
    expect: "The dentist uses ultrasonic instruments to gently remove plaque and hard tartar from above and below the gumline, followed by airflow stain removal.",
    timeline: "1 visit of 30–45 minutes.",
    aftercare: "Resume normal brushing and flossing. Mild gum tenderness for a few hours is normal if heavy tartar was removed."
  }
}

// Custom minimal dental-style SVG icons for patient concerns
const OverbiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Upper tooth (offset to the right / ahead) */}
    <path d="M13 3c-1.2 0-1.8.8-1.8 1.8v3.5c0 1.2.6 1.8 1.8 1.8h1c1.2 0 1.8-.6 1.8-1.8V4.8C15.8 3.6 15.2 3 14 3h-1z" />
    {/* Lower tooth (offset to the left / behind) */}
    <path d="M8 21c-1.2 0-1.8-.8-1.8-1.8v-3.5c0-1.2.6-1.8 1.8-1.8h1c1.2 0 1.8.6 1.8 1.8v3.5c0 1.2-.6 1.8-1.8 1.8H8z" className="opacity-40" />
    {/* Bite overlap arrow */}
    <path d="M7 11h7" className="opacity-30" />
    <path d="M12 9.5L14 11l-2 1.5" />
  </svg>
)

const UnderbiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Upper tooth (offset to the left / behind) */}
    <path d="M8 3c-1.2 0-1.8.8-1.8 1.8v3.5c0 1.2.6 1.8 1.8 1.8h1c1.2 0 1.8-.6 1.8-1.8V4.8C10.8 3.6 10.2 3 9 3H8z" />
    {/* Lower tooth (offset to the right / ahead) */}
    <path d="M13 21c-1.2 0-1.8-.8-1.8-1.8v-3.5c0-1.2.6-1.8 1.8-1.8h1c1.2 0 1.8.6 1.8 1.8v3.5c0 1.2-.6 1.8-1.8 1.8h-1z" className="opacity-40" />
    {/* Bite overlap arrow */}
    <path d="M7 13h7" className="opacity-30" />
    <path d="M9 11.5L7 13l2 1.5" />
  </svg>
)

const CrowdedTeethIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Left tooth */}
    <path d="M4 5c-.8 0-1.2.6-1.2 1.2v4.5c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.2c0-.6-.4-1.2-1.2-1.2H4z" />
    {/* Right tooth */}
    <path d="M17 5c-.8 0-1.2.6-1.2 1.2v4.5c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.2c0-.6-.4-1.2-1.2-1.2h-.5z" />
    {/* Tilted middle tooth overlapping */}
    <g transform="rotate(15 11 8.5)">
      <path d="M9.5 4.5c-.8 0-1.2.6-1.2 1.2v5c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2v-5c0-.6-.4-1.2-1.2-1.2h-.5z" fill="white" stroke="currentColor" />
    </g>
  </svg>
)

const GapsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Left tooth */}
    <path d="M5 5c-.8 0-1.2.6-1.2 1.2V12c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.2c0-.6-.4-1.2-1.2-1.2H5z" />
    {/* Right tooth */}
    <path d="M16 5c-.8 0-1.2.6-1.2 1.2V12c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.2c0-.6-.4-1.2-1.2-1.2h-.5z" />
    {/* Gap arrows */}
    <path d="M9 9h5" className="text-cyan-500" />
    <path d="M10.5 7.5L9 9l1.5 1.5M12.5 7.5L14 9l-1.5 1.5" className="text-cyan-500" />
  </svg>
)

const StainedTeethIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 5c-1.2 0-1.8.8-1.8 1.8v5.5c0 1.2.6 1.8 1.8 1.8h1c1.2 0 1.8-.6 1.8-1.8V6.8C11.8 5.6 11.2 5 10 5H9z" />
    {/* Stains */}
    <circle cx="8.5" cy="9" r="0.75" fill="currentColor" className="text-amber-500" />
    <circle cx="10" cy="11.5" r="0.5" fill="currentColor" className="text-amber-500" />
    {/* Sparkle mark */}
    <path d="M16 4.5l.5 1.2.5-1.2-.5-.8z" fill="currentColor" className="text-cyan-500" />
    <path d="M18.5 7l.8 1.5.8-1.5-.8-1.5z" fill="currentColor" className="text-cyan-500" />
  </svg>
)

const ChippedTeethIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Chipped tooth crown shape */}
    <path d="M9 5c-1.2 0-1.8.8-1.8 1.8v5.3c0 .5.2.9.5 1.1l.8.8c.2.2.5.2.7 0l.7-.7c.2-.2.6-.2.8 0l.8.7c.2.2.5.2.7 0l.5-.8c.3-.2.5-.6.5-1.1V6.8C12.8 5.6 12.2 5 11 5H9z" />
    {/* Crack highlights */}
    <path d="M11 12.8l.5-2" className="text-primary" />
    <path d="M10 13.2l-.5-1.2" className="text-primary" />
  </svg>
)

const MissingTeethIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Left tooth */}
    <path d="M4 5c-.8 0-1.2.6-1.2 1.2V12c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.2c0-.6-.4-1.2-1.2-1.2H4z" />
    {/* Missing gap (dashed lines of a tooth) */}
    <path d="M10.5 5.5c-.8 0-1.2.6-1.2 1.2v4.5c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.7c0-.6-.4-1.2-1.2-1.2h-.5z" strokeDasharray="2.5 2.5" className="opacity-30" />
    {/* Right tooth */}
    <path d="M17 5c-.8 0-1.2.6-1.2 1.2V12c0 .6.4 1.2 1.2 1.2h.5c.8 0 1.2-.6 1.2-1.2V6.2c0-.6-.4-1.2-1.2-1.2h-.5z" />
  </svg>
)

const ToothPainIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 5c-1.2 0-1.8.8-1.8 1.8v5.5c0 1.2.6 1.8 1.8 1.8h1c1.2 0 1.8-.6 1.8-1.8V6.8C11.8 5.6 11.2 5 10 5H9z" />
    {/* Radiating pain lines */}
    <path d="M5 8c-.5.5-.8 1.2-.8 2s.3 1.5.8 2M15 8c.5.5.8 1.2.8 2s-.3 1.5-.8 2" className="text-cyan-500" />
    {/* Tooth nerve root zaps */}
    <path d="M10 15v3" className="text-cyan-500" />
  </svg>
)

const testimonials = [
  {
    name: "Example Patient A",
    treatment: "Teeth Whitening Focus",
    quote: "Placeholder review text: The patient described their professional teeth whitening treatment as comfortable and straightforward. All steps were clearly explained beforehand.",
  },
  {
    name: "Example Patient B",
    treatment: "Smile Design Focus",
    quote: "Placeholder review text: The patient highlighted their smile design consultation, noting the detailed planning, digital scanner preview, and gentle approach.",
  },
  {
    name: "Example Patient C",
    treatment: "Invisible Aligners Focus",
    quote: "Placeholder review text: The patient described their invisible aligner journey as easy to follow, with clean tray changes and regular check-in schedules.",
  },
]

export default function LumaDentalStudio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState("general")
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isHoveringTestimonials, setIsHoveringTestimonials] = useState(false)
  const [activeService, setActiveService] = useState("whitening")
  const activeServiceDetails = serviceDetailsMap[activeService]

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Testimonials carousel autoplay logic
  useEffect(() => {
    if (isHoveringTestimonials) return
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isHoveringTestimonials])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setFormSubmitted(false)
    }, 3000)
  }

  const openBookingModal = (treatment = "general") => {
    setSelectedTreatment(treatment)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">Luma Dental</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#treatments" className="text-body hover:text-primary transition-colors">
                Treatments
              </a>
              <a href="#pricing" className="text-body hover:text-primary transition-colors">
                Pricing
              </a>
              <a href="#faq" className="text-body hover:text-primary transition-colors">
                FAQ
              </a>
            </nav>

            {/* CTA Button (Header) */}
            <div className="hidden lg:block">
              <Button
                onClick={openBookingModal}
                className="bg-primary hover:bg-[#0E7490] text-primary-foreground h-11 px-5 text-sm rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                Book a Smile Consultation
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden border-t border-border"
              >
                <nav className="py-4 flex flex-col gap-4">
                  <a
                    href="#treatments"
                    className="text-body hover:text-primary transition-colors px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Treatments
                  </a>
                  <a
                    href="#pricing"
                    className="text-body hover:text-primary transition-colors px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a
                    href="#faq"
                    className="text-body hover:text-primary transition-colors px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQ
                  </a>
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false)
                      openBookingModal()
                    }}
                    className="bg-primary hover:bg-[#0E7490] text-primary-foreground w-full mt-2"
                  >
                    Book a Consultation
                  </Button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-12 lg:py-24 bg-gradient-to-b from-cyan-50/40 via-background to-background relative overflow-hidden">
          {/* Subtle accent blur circles */}
          <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/10 right-1/10 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground leading-tight text-balance">
                  Your Smile Deserves Modern Care
                </h1>
                <p className="mt-6 text-lg text-body leading-relaxed text-pretty max-w-xl">
                  At Luma Dental Studio, we combine advanced technology with personalized attention
                  to help you achieve the confident smile you&apos;ve always wanted.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {/* CTA Button (Hero) */}
                  <Button
                    onClick={openBookingModal}
                    size="lg"
                    className="bg-primary hover:bg-[#0E7490] text-primary-foreground px-8 py-4 text-lg rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Book Your Consultation
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span>4.9 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>5,000+ Happy Patients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>15+ Years Experience</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="relative"
              >
                <div className="rounded-3xl aspect-[16/10] overflow-hidden border border-cyan-100/30 shadow-[0_20px_50px_rgba(8,145,178,0.06)] relative group">
                  <img
                    src="/images/pexels-olly-3884103.jpg"
                    alt="Dentist speaking with a smiling patient in a modern dental clinic."
                    className="w-full h-full object-cover object-[45%_center] transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Styled clinical elements */}
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-medium text-primary border border-cyan-100/50 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> Digital Smile Design
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-medium text-emerald-600 border border-emerald-100/50 flex items-center gap-1 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Comfort-First Studio
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="py-10 bg-gradient-to-b from-background to-slate-50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-white/60 backdrop-blur-md border border-cyan-100/60 rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-cyan-100/50"
            >
              {[
                { icon: Award, label: "MOH Licensed Clinic", sublabel: "Registered Practice" },
                { icon: Shield, label: "Safe & Sterile", sublabel: "Advanced Sterilization" },
                { icon: MapPin, label: "Orchard Road", sublabel: "Central Clinic" },
                { icon: Heart, label: "0% Interest", sublabel: "Flexible Installments" },
              ].map((item, index) => {
                const ItemIcon = item.icon
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-4 justify-center pt-4 lg:pt-0 first:pt-0 lg:first:pl-0 lg:pl-6 border-cyan-100/50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <ItemIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground tracking-wide">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.sublabel}</p>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Problem & Transformation */}
        <section className="py-12 lg:py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-foreground text-balance">
                Feel More Confident About Your Smile
              </h2>
              <p className="mt-4 text-base lg:text-lg text-body leading-relaxed max-w-xl mx-auto text-pretty">
                Your smile is often the first thing people notice. Whether it&apos;s discoloration, minor misalignment, or uneven spacing, feeling self-conscious about your teeth can hold you back from showing your true self.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                {[
                  "Hiding your smile in photos and social settings",
                  "Covering your mouth when laughing or talking",
                  "Feeling self-conscious in professional interactions",
                  "Postponing treatments due to past dental anxiety",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/70 backdrop-blur-xs p-4 rounded-xl border border-cyan-100/60 shadow-[0_8px_20px_rgba(8,145,178,0.03)] hover:shadow-lg hover:border-cyan-200/80 transition-all duration-300">
                    <div className="w-6 h-6 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <Check className="w-3.5 h-3.5 text-accent stroke-[3]" />
                    </div>
                    <span className="text-body text-sm font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-8 lg:p-10 bg-white/80 backdrop-blur-xs rounded-2xl border border-cyan-100/50 shadow-[0_15px_30px_rgba(8,145,178,0.03)] max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-accent" />
                <p className="text-xl lg:text-2xl font-serif font-medium text-foreground leading-relaxed">
                  Imagine walking into any room with complete confidence in your smile.
                </p>
                <p className="mt-4 text-body text-base lg:text-lg">
                  That transformation starts with a simple conversation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We Can Help With */}
        <section className="py-16 bg-slate-100/50 border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                What We Can Help With
              </h2>
              <p className="mt-4 text-lg text-body max-w-3xl mx-auto leading-relaxed">
                Not sure which treatment you need? Start with the concern you’re experiencing. Our team can assess your smile and recommend the right next step.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
            >
              {[
                {
                  title: "Overbite",
                  icon: OverbiteIcon,
                  description: "Upper teeth sit too far over the lower teeth."
                },
                {
                  title: "Underbite",
                  icon: UnderbiteIcon,
                  description: "Lower teeth sit ahead of the upper teeth."
                },
                {
                  title: "Crowded Teeth",
                  icon: CrowdedTeethIcon,
                  description: "Teeth overlap or feel tight due to limited space."
                },
                {
                  title: "Gaps Between Teeth",
                  icon: GapsIcon,
                  description: "Visible spacing between teeth or an uneven arch."
                },
                {
                  title: "Stained Teeth",
                  icon: StainedTeethIcon,
                  description: "Yellowing or staining that affects smile brightness."
                },
                {
                  title: "Chipped or Worn Teeth",
                  icon: ChippedTeethIcon,
                  description: "Small chips, worn edges, or uneven tooth shape."
                },
                {
                  title: "Missing Teeth",
                  icon: MissingTeethIcon,
                  description: "Gaps from missing teeth that affect comfort or confidence."
                },
                {
                  title: "Tooth Pain or Sensitivity",
                  icon: ToothPainIcon,
                  description: "Discomfort when chewing, drinking, or brushing."
                }
              ].map((concern, idx) => {
                const ConcernIcon = concern.icon
                return (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    className="bg-white border border-slate-200/60 rounded-3xl p-5 shadow-[0_4px_18px_rgba(8,145,178,0.015)] hover:shadow-[0_12px_30px_rgba(8,145,178,0.05)] hover:-translate-y-1 hover:border-cyan-200/60 transition-all duration-300 group flex flex-col items-start"
                  >
                    <div className="w-14 h-14 rounded-full bg-cyan-50/50 border border-cyan-100/30 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-cyan-50 group-hover:border-cyan-200/50">
                      <ConcernIcon className="w-9 h-9 text-cyan-600" />
                    </div>
                    <h3 className="font-serif font-bold text-slate-900 text-sm mb-1">
                      {concern.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground leading-relaxed text-pretty">
                      {concern.description}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Section CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-12 pt-4 flex flex-col items-center gap-3"
            >
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                Not sure where to start?
              </p>
              <Button
                onClick={() => openBookingModal()}
                className="bg-primary hover:bg-[#0E7490] text-primary-foreground h-12 px-8 text-base rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                Book an Appointment
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Treatments */}
        <section id="treatments" className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Our Dental Services
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                Comprehensive and modern dental care options tailored to your individual health and aesthetic goals.
              </p>
            </motion.div>

            {/* Split Panel Layout */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Side: Services List Menu */}
              <div className="lg:col-span-5 space-y-3">
                {[
                  {
                    icon: Sparkles,
                    title: "Teeth Whitening",
                    value: "whitening",
                    subtitle: "Fast, professional stain removal"
                  },
                  {
                    icon: Smile,
                    title: "Veneers & Smile Design",
                    value: "veneers",
                    subtitle: "Complete aesthetic transformations"
                  },
                  {
                    icon: Shield,
                    title: "Invisible Aligners",
                    value: "aligners",
                    subtitle: "Discreet clear orthodontic trays"
                  },
                  {
                    icon: Heart,
                    title: "General Dentistry",
                    value: "general-dentistry",
                    subtitle: "Essential restoration & health care"
                  },
                  {
                    icon: Award,
                    title: "Dental Implants",
                    value: "implants",
                    subtitle: "Durable, natural tooth replacements"
                  },
                  {
                    icon: Calendar,
                    title: "Dental Cleaning & Checkups",
                    value: "cleaning",
                    subtitle: "Routine prevention & maintenance"
                  }
                ].map((service) => {
                  const isActive = activeService === service.value
                  const IconComp = service.icon
                  return (
                    <button
                      key={service.value}
                      onClick={() => setActiveService(service.value)}
                      onMouseEnter={() => setActiveService(service.value)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${
                        isActive
                          ? "bg-cyan-50/60 border-cyan-200/80 shadow-[0_4px_20px_rgba(8,145,178,0.03)]"
                          : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200/50"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                      }`}>
                        <IconComp className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-base transition-colors ${
                          isActive ? "text-primary" : "text-slate-900"
                        }`}>
                          {service.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {service.subtitle}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Right Side: Featured Service Detail Panel */}
              <div className="lg:col-span-7 h-full">
                <AnimatePresence mode="wait">
                  {activeServiceDetails && (
                    <motion.div
                      key={activeService}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="bg-slate-50/50 border border-slate-200/40 rounded-3xl p-8 lg:p-10 flex flex-col justify-between h-full min-h-[480px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] relative overflow-hidden"
                    >
                      {/* Soft visual watermark/background icon */}
                      <div className="absolute top-8 right-8 text-cyan-500/5 pointer-events-none select-none">
                        <Sparkles className="w-32 h-32" />
                      </div>

                      <div className="relative z-10">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-cyan-50 border border-cyan-100/50 px-3 py-1 rounded-full">
                            {activeServiceDetails.type}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 border border-slate-200/50 px-3 py-1 rounded-full">
                            {activeServiceDetails.time}
                          </span>
                        </div>

                        <h3 className="text-2xl lg:text-3xl font-serif font-semibold text-slate-900 mb-4 text-balance">
                          {activeServiceDetails.title}
                        </h3>

                        <p className="text-body text-base leading-relaxed mb-6">
                          {activeServiceDetails.description}
                        </p>

                        <div className="border-t border-slate-200/60 pt-6 mt-6 space-y-5">
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                              Ideal For
                            </h4>
                            <p className="text-sm text-body leading-relaxed">
                              {activeServiceDetails.suitableFor}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                              What to Expect
                            </h4>
                            <p className="text-sm text-body leading-relaxed">
                              {activeServiceDetails.whatToExpect}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Row */}
                      <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row gap-3 relative z-10">
                        <Button
                          onClick={() => openBookingModal(activeService)}
                          className="bg-primary hover:bg-[#0E7490] text-primary-foreground h-12 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 flex-1"
                        >
                          Book a Smile Consultation
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedServiceDetail(activeService)}
                          className="text-slate-600 hover:text-primary hover:bg-slate-100/80 border border-slate-200 h-12 px-6 rounded-xl font-semibold transition-all"
                        >
                          View Treatment Details
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Steps */}
        <section className="py-16 lg:py-24 bg-slate-50/50 border-y border-border/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                How Your Appointment Works
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                A simple, transparent process from your first visit to your treatment plan.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  step: "01",
                  icon: Calendar,
                  title: "Book an Appointment",
                  description: "Choose a time that works for you and tell us what you’d like help with.",
                },
                {
                  step: "02",
                  icon: MessageCircle,
                  title: "Meet Your Dentist",
                  description: "Talk through your concerns, goals, and treatment options in a calm setting.",
                },
                {
                  step: "03",
                  icon: FileText,
                  title: "Get a Clear Plan",
                  description: "Review recommended treatments, timeline, and pricing before deciding.",
                },
                {
                  step: "04",
                  icon: Smile,
                  title: "Begin Your Smile Care",
                  description: "Start your treatment with a plan you understand and feel comfortable with.",
                },
              ].map((step, index) => {
                const StepIcon = step.icon
                return (
                  <motion.div key={index} variants={fadeInUp} className="text-center relative bg-white/70 backdrop-blur-md border border-cyan-100/60 rounded-2xl p-6 shadow-[0_8px_20px_rgba(8,145,178,0.03)] transition-all duration-300 hover:shadow-md hover:border-cyan-100/80 group">
                    <div className="absolute top-4 right-4 font-serif font-bold text-3xl text-cyan-200/70 group-hover:text-primary/30 transition-colors duration-300">
                      {step.step}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-cyan-50 border border-cyan-100/50 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                      <StepIcon className="w-7 h-7 stroke-[2.5]" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-body text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                )
              })}
            </motion.div>
            {/* CTA Button (After Steps) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <Button
                onClick={openBookingModal}
                size="lg"
                className="bg-primary hover:bg-[#0E7490] text-primary-foreground px-8 py-4 text-lg rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
              >
                Schedule a Visit
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Luma */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground text-balance">
                  Why Patients Choose Luma
                </h2>
                <p className="mt-4 text-lg text-body">
                  We believe everyone deserves access to modern, comfortable dental care without
                  judgment.
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Judgment-free consultations with empathetic dentists",
                    "Transparent pricing with no hidden fees",
                    "State-of-the-art technology for precise, comfortable treatments",
                    "Flexible payment plans to fit your budget",
                    "Convenient evening and weekend appointments",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-accent-foreground" />
                      </div>
                      <span className="text-body">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="order-1 lg:order-2"
              >
                <div className="rounded-3xl aspect-[4/3] overflow-hidden border border-cyan-100/30 shadow-[0_20px_50px_rgba(8,145,178,0.06)] relative group w-full">
                  <img
                    src="/images/pexels-pavel-danilyuk-6812453.jpg"
                    alt="Modern dental clinic treatment room with clean equipment."
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Floating Clinical Overlay Badges */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full text-[11px] font-bold text-primary border border-cyan-100/50 flex items-center gap-1.5 shadow-sm transition-all duration-300 group-hover:translate-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    <span>Tranquil Consultation Suites</span>
                  </div>

                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full text-[11px] font-bold text-teal-600 border border-teal-100/50 flex items-center gap-1.5 shadow-sm transition-all duration-300 group-hover:-translate-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span>3D Intraoral Scanning</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet Our Dentists */}
        <section className="py-16 lg:py-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Meet Our Dentists
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                A calm, experienced care team focused on clear communication, comfort, and personalized treatment planning.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {[
                {
                  name: "Dr. Maya Tan",
                  role: "Aesthetic Dentistry & Aligners",
                  specialty: "Invisalign & Smile Design",
                  initials: "MT",
                  bio: "Helps patients explore discreet alignment and smile design options.",
                  grad: "from-teal-500/10 to-emerald-500/10",
                  image: "/images/dentist-maya-tan.jpg",
                  alt: "Portrait of Dr. Maya Tan"
                },
                {
                  name: "Dr. Adrian Lee",
                  role: "Lead Dentist",
                  specialty: "Cosmetic & Restorative Dentistry",
                  initials: "AL",
                  bio: "Focuses on natural-looking smile improvements and clear treatment planning.",
                  grad: "from-cyan-500/10 to-teal-500/10",
                  image: "/images/dentist-adrian-lee.jpg",
                  alt: "Portrait of Dr. Adrian Lee"
                },
                {
                  name: "Dr. Rachel Lim",
                  role: "General Dentist",
                  specialty: "General Dentistry & Preventive Care",
                  initials: "RL",
                  bio: "Supports routine care, prevention, and anxious patients with a gentle approach.",
                  grad: "from-blue-500/10 to-cyan-500/10",
                  image: "/images/dentist-rachel-lim.jpg",
                  alt: "Portrait of Dr. Rachel Lim"
                }
              ].map((dentist, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/50 backdrop-blur-sm border border-cyan-100/30 rounded-3xl p-8 hover:shadow-[0_20px_40px_rgba(8,145,178,0.04)] hover:-translate-y-1.5 transition-all duration-300 group hover:border-cyan-200/50 flex flex-col items-center text-center"
                >
                  {/* Dentist Portrait Image */}
                  <div className="w-32 h-32 rounded-full overflow-hidden border border-cyan-100/40 shadow-md transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-300/40 mb-6 aspect-square">
                    <img
                      src={dentist.image}
                      alt={dentist.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100/30 mb-3">
                    {dentist.role}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 font-serif group-hover:text-primary transition-colors">
                    {dentist.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium mb-4">
                    {dentist.specialty}
                  </p>
                  <p className="text-body text-xs leading-relaxed max-w-sm">
                    {dentist.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>



        {/* Patient Experience Preview */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Patient Experience Preview
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                Example review-style content shown for prototype purposes only.
              </p>
            </motion.div>

            <div
              className="relative max-w-3xl mx-auto px-4 sm:px-12"
              onMouseEnter={() => setIsHoveringTestimonials(true)}
              onMouseLeave={() => setIsHoveringTestimonials(false)}
            >
              {/* Testimonial Card Wrapper */}
              <div className="overflow-hidden relative min-h-[280px] sm:min-h-[220px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    <Card className="h-full bg-white/60 backdrop-blur-md border border-cyan-100/40 rounded-3xl hover:shadow-[0_20px_40px_rgba(8,145,178,0.04)] transition-all duration-300 relative overflow-hidden group hover:border-cyan-200/50">
                      {/* Stylized quotes graphic */}
                      <div className="absolute -top-2 right-4 font-serif font-black text-7xl text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors pointer-events-none select-none">
                        &ldquo;
                      </div>
                      <CardContent className="p-8 md:p-10">
                        <div className="flex gap-1 mb-5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-body text-base md:text-lg leading-relaxed mb-6 italic font-serif text-slate-800" dangerouslySetInnerHTML={{ __html: `&ldquo;${testimonials[activeTestimonial].quote}&rdquo;` }} />
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/10 flex items-center justify-center border border-cyan-100/20">
                            <span className="text-primary text-sm font-semibold">
                              {testimonials[activeTestimonial].name[0]}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{testimonials[activeTestimonial].name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{testimonials[activeTestimonial].treatment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-4 lg:-left-6 z-20">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-cyan-100 shadow-sm flex items-center justify-center text-slate-600 hover:text-primary transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-4 lg:-right-6 z-20">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-cyan-100 shadow-sm flex items-center justify-center text-slate-600 hover:text-primary transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeTestimonial === index
                      ? "bg-primary w-6"
                      : "bg-slate-300 hover:bg-slate-400 w-2"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Disclaimer Note */}
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center text-xs text-muted-foreground mt-10 italic max-w-md mx-auto"
            >
              Placeholder review-style content for prototype demonstration. Final content should be replaced with clinic-approved, compliant trust or review content.
            </motion.p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 lg:py-24 bg-card">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Start With a Consultation
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                No commitment, no pressure &mdash; just honest advice about your smile options.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="mt-8 bg-white/90 backdrop-blur-md border border-cyan-100/60 rounded-3xl shadow-[0_25px_60px_rgba(8,145,178,0.08)] relative overflow-hidden max-w-md mx-auto">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-accent" />
                <CardContent className="p-6 sm:p-8">
                  <div className="absolute top-6 right-6 bg-cyan-50 text-primary border border-cyan-100/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    First Visit
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">
                      New Patient Consultation
                    </p>
                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground font-sans tracking-tight">S$49</span>
                      <span className="text-muted-foreground text-sm font-medium">/ nett</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">All-inclusive first visit consultation fee</p>
                  </div>
                  <div className="mt-6 space-y-3 max-w-sm mx-auto">
                    {[
                      "Comprehensive smile assessment",
                      "Digital X-rays included",
                      "Personalized treatment options",
                      "Transparent pricing breakdown",
                      "No obligation to proceed",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span className="text-body text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  {/* CTA Button (Pricing) */}
                  <div className="mt-6">
                    <Button
                      onClick={openBookingModal}
                      className="w-full bg-primary hover:bg-[#0E7490] text-primary-foreground h-12 text-base rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Book an Appointment
                    </Button>
                  </div>
                  <p className="mt-4 text-center text-[11px] text-muted-foreground italic">
                    *This is prototype pricing for demonstration purposes only.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>


        {/* FAQ */}
        <section id="faq" className="py-16 lg:py-24 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-body">
                Got questions? We&apos;ve got answers.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    question: "How long does a consultation take?",
                    answer:
                      "A typical consultation takes about 30-45 minutes. This gives us enough time to understand your goals, conduct a thorough assessment, and discuss your options without feeling rushed.",
                  },
                  {
                    question: "Is the consultation fee applied to treatment?",
                    answer:
                      "Yes! If you decide to proceed with any treatment, the S$49 consultation fee is credited toward your first procedure.",
                  },
                  {
                    question: "Do you offer payment plans?",
                    answer:
                      "Absolutely. We partner with several financing providers to offer 0% interest payment plans for up to 24 months on qualifying treatments.",
                  },
                  {
                    question: "What if I'm nervous about dental procedures?",
                    answer:
                      "You're in good hands. Our team specializes in treating anxious patients. We offer various comfort options including sedation dentistry for more involved procedures.",
                  },
                  {
                    question: "How do I know which treatment is right for me?",
                    answer:
                      "That's exactly what the consultation is for! We'll assess your dental health, discuss your aesthetic goals, and recommend options that fit your needs and budget.",
                  },
                ].map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-body">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-primary-foreground text-balance">
                Ready to Love Your Smile?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Take the first step toward the confident smile you deserve. Book your consultation
                today and discover what&apos;s possible.
              </p>
              {/* CTA Button (Final) */}
              <Button
                onClick={openBookingModal}
                size="lg"
                className="mt-8 bg-card text-primary hover:bg-card/90 px-8 py-4 text-lg rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
              >
                Start Your Smile Journey
              </Button>
              <p className="mt-4 text-sm text-primary-foreground/70">
                No commitment required. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-[#0B1220] text-slate-300 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md shadow-primary/20">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-xl font-serif font-bold text-white tracking-wide">Luma Dental Studio</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Modern patient-first dental care for your best smile. Serving Singapore with compassion, transparency, and clinical excellence.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                Opening Hours: Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base mb-5 tracking-wide">Quick Links</h3>
              <nav className="flex flex-col gap-3">
                <a href="#treatments" className="text-slate-400 hover:text-primary hover:translate-x-0.5 transition-all text-sm w-fit">
                  Treatments
                </a>
                <a href="#pricing" className="text-slate-400 hover:text-primary hover:translate-x-0.5 transition-all text-sm w-fit">
                  Pricing
                </a>
                <a href="#faq" className="text-slate-400 hover:text-primary hover:translate-x-0.5 transition-all text-sm w-fit">
                  FAQ
                </a>
              </nav>
            </div>
            <div className="space-y-5">
              <h3 className="font-serif font-bold text-white text-base tracking-wide">Contact Us</h3>
              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-2.5 text-slate-400">
                  <MapPin className="w-4.5 h-4.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>123 Orchard Road, Singapore 238888</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Phone className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                  <span>+65 9480 0366</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400">
                  <Mail className="w-4.5 h-4.5 text-primary flex-shrink-0" />
                  <span>hello@lumadental.sg</span>
                </div>
              </div>
              {/* CTA Button (Footer) */}
              <div className="pt-2">
                <Button
                  onClick={openBookingModal}
                  className="bg-primary hover:bg-[#0E7490] text-primary-foreground font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
                >
                  Request a Consultation
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800/40 text-center text-xs text-slate-500 space-y-2">
            <p>&copy; 2024 Luma Dental Studio. All rights reserved.</p>
            <p className="text-[11px] text-slate-600 italic">This is a front-end prototype for demonstration purposes only.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-22 right-6 w-12 h-12 bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-[#0E7490] transition-colors z-50 border border-cyan-100/10 backdrop-blur-sm"
            aria-label="Back to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6594800366?text=Hi%20Luma%20Dental%20Studio%2C%20I%20would%20like%20to%20book%20a%20smile%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-semibold text-sm border border-emerald-400/20"
        aria-label="WhatsApp Us"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.025 14.12 1 11.51 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.63.43 3.224 1.246 4.634L1.87 20.89l5.48-1.424c.002-.001.002-.001.002-.002zm9.713-7.533c-.267-.133-1.58-.778-1.825-.865-.243-.088-.422-.132-.599.132-.176.265-.683.865-.838 1.041-.155.176-.311.197-.578.064-.267-.133-1.126-.415-2.145-1.325-.793-.705-1.327-1.577-1.484-1.842-.155-.266-.016-.41.117-.541.12-.119.267-.311.4-.467.133-.156.178-.266.267-.442.089-.178.045-.332-.022-.466-.067-.132-.599-1.44-.82-1.97-.215-.52-.45-.449-.62-.457-.159-.007-.34-.008-.523-.008-.182 0-.479.068-.73.342-.25.275-.956.934-.956 2.278 0 1.345.98 2.64 1.117 2.825.137.185 1.929 2.946 4.673 4.129.653.282 1.162.451 1.56.577.656.208 1.252.179 1.724.11.526-.078 1.58-.646 1.802-1.24.223-.593.223-1.1.157-1.202-.066-.104-.244-.155-.511-.289z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl border border-cyan-100/50 bg-white/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif font-bold text-foreground">
              Book an Appointment
            </DialogTitle>
            <DialogDescription className="text-body text-sm mt-1">
              Fill in your details and we&apos;ll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-serif">Booking Request Sent</h3>
              <p className="mt-2 text-body text-sm max-w-xs mx-auto">
                Thank you! Your prototype smile consultation request has been submitted successfully.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 mt-2">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-bold text-slate-700">Full Name *</Label>
                <Input id="name" placeholder="Your full name" required className="rounded-xl border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold text-slate-700">Email *</Label>
                <Input id="email" type="email" placeholder="your@email.com" required className="rounded-xl border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-bold text-slate-700">Phone *</Label>
                <Input id="phone" type="tel" placeholder="+65" required className="rounded-xl border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="treatment" className="text-xs font-bold text-slate-700">Treatment Interest *</Label>
                <Select required value={selectedTreatment} onValueChange={setSelectedTreatment}>
                  <SelectTrigger className="rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select a treatment" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="general">General Consultation</SelectItem>
                    <SelectItem value="whitening">Teeth Whitening</SelectItem>
                    <SelectItem value="veneers">Veneers & Smile Design</SelectItem>
                    <SelectItem value="aligners">Invisible Aligners</SelectItem>
                    <SelectItem value="general-dentistry">General Dentistry</SelectItem>
                    <SelectItem value="implants">Dental Implants</SelectItem>
                    <SelectItem value="cleaning">Dental Cleaning & Checkups</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="time" className="text-xs font-bold text-slate-700">Preferred Time</Label>
                <Select>
                  <SelectTrigger className="rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                    <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-bold text-slate-700">Message (Optional)</Label>
                <Textarea id="message" placeholder="Tell us about your smile goals..." rows={3} className="rounded-xl border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary" />
              </div>
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-[#0E7490] text-primary-foreground py-3.5 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Submit Booking Request
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Service Detail Modal */}
      <Dialog open={selectedServiceDetail !== null} onOpenChange={(open) => !open && setSelectedServiceDetail(null)}>
        <DialogContent className="sm:max-w-2xl rounded-3xl border border-cyan-100/50 bg-white/95 backdrop-blur-md p-6 sm:p-8">
          {selectedServiceDetail && (() => {
            const details = serviceDetailsMap[selectedServiceDetail];
            const modalDetails = serviceModalDetailsMap[selectedServiceDetail];
            if (!details || !modalDetails) return null;
            return (
              <>
                <DialogHeader className="text-left border-b border-border pb-4 mb-4">
                  <DialogTitle className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
                    {details.title}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    Detailed treatment information for {details.title}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4 text-left">
                  {/* Highlighted Short Overview */}
                  <div className="bg-cyan-50/40 border border-cyan-100/50 rounded-2xl p-5 shadow-xs">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Treatment Overview
                    </h4>
                    <p className="text-sm text-slate-800 leading-relaxed font-serif italic">
                      {modalDetails.overview}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Ideal For
                        </h4>
                        <p className="text-sm text-body leading-relaxed">{modalDetails.idealFor}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Typical Visit / Timeline
                        </h4>
                        <p className="text-sm text-body leading-relaxed">{modalDetails.timeline}</p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          What To Expect
                        </h4>
                        <p className="text-sm text-body leading-relaxed">{modalDetails.expect}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Aftercare & Next Steps
                        </h4>
                        <p className="text-sm text-body leading-relaxed">{modalDetails.aftercare}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border mt-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      const val = selectedServiceDetail;
                      setSelectedServiceDetail(null);
                      openBookingModal(val);
                    }}
                    className="flex-1 bg-primary hover:bg-[#0E7490] text-primary-foreground h-12 text-base rounded-xl font-semibold transition-all duration-300 shadow-md"
                  >
                    Book a Smile Assessment
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="sm:w-32 text-slate-500 hover:text-slate-700 h-12 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50"
                  >
                    Close
                  </Button>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
