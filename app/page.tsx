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

export default function LumaDentalStudio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const openBookingModal = () => {
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
              <a href="#results" className="text-body hover:text-primary transition-colors">
                Results
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
                className="bg-primary hover:bg-[#0E7490] text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
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
                    href="#results"
                    className="text-body hover:text-primary transition-colors px-2 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Results
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
                    Book a Smile Consultation
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
                    className="bg-primary hover:bg-[#0E7490] text-primary-foreground px-8 py-4 text-lg rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Book a Smile Consultation
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
                <div className="bg-gradient-to-tr from-cyan-500/10 via-teal-500/5 to-cyan-500/20 rounded-3xl aspect-[16/10] flex items-center justify-center overflow-hidden border border-cyan-100/30 shadow-[0_20px_50px_rgba(8,145,178,0.06)] relative group">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none" />
                  <div className="text-center p-8 relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mx-auto mb-4 border border-cyan-100/20">
                      <Smile className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-foreground font-semibold text-lg font-serif">Luma Smile Studio</p>
                    <p className="text-muted-foreground text-xs mt-1">Experience Modern Patient-First Dentistry</p>
                  </div>
                  {/* Styled clinical elements */}
                  <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-medium text-primary border border-cyan-100/50 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> Digital Consultation Studio
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-medium text-emerald-600 border border-emerald-100/50 flex items-center gap-1 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> Professional Singapore MDA Certified
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
                { icon: Award, label: "MDA Certified", sublabel: "Licensed Clinic" },
                { icon: Shield, label: "Safe & Sterile", sublabel: "COVID-19 Protocols" },
                { icon: Users, label: "5,000+", sublabel: "Happy Patients" },
                { icon: Clock, label: "15+ Years", sublabel: "Experience" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-center gap-4 justify-center pt-4 lg:pt-0 first:pt-0 lg:first:pl-0 lg:pl-6 border-cyan-100/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground tracking-wide">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sublabel}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Problem & Transformation */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground text-balance">
                Tired of Hiding Your Smile?
              </h2>
              <p className="mt-6 text-lg text-body leading-relaxed max-w-2xl mx-auto text-pretty">
                You&apos;re not alone. Many people feel self-conscious about their teeth &mdash; whether
                it&apos;s discoloration, misalignment, or just feeling like your smile doesn&apos;t
                represent the real you.
              </p>
              <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
                {[
                  "Avoiding photos because of your teeth",
                  "Covering your mouth when you laugh",
                  "Feeling judged in professional settings",
                  "Putting off dental care due to past experiences",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-body">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-card rounded-xl border border-border">
                <p className="text-xl font-medium text-foreground">
                  Imagine walking into any room with complete confidence in your smile.
                </p>
                <p className="mt-2 text-body">
                  That transformation starts with a simple conversation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Treatments */}
        <section id="treatments" className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Our Smile Treatments
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                Personalized solutions designed to give you the smile you deserve.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {[
                {
                  icon: Sparkles,
                  title: "Teeth Whitening",
                  description:
                    "Professional-grade whitening that delivers results up to 8 shades brighter in just one visit.",
                },
                {
                  icon: Smile,
                  title: "Veneers & Smile Design",
                  description:
                    "Custom-crafted porcelain veneers that transform your smile while looking completely natural.",
                },
                {
                  icon: Shield,
                  title: "Invisible Aligners",
                  description:
                    "Straighten your teeth discreetly with clear aligners &mdash; no metal braces required.",
                },
              ].map((treatment, index) => (
                <motion.div key={index} variants={fadeInUp} className="h-full">
                  <Card className="h-full bg-white/60 backdrop-blur-md border border-cyan-100/40 rounded-3xl hover:shadow-[0_20px_40px_rgba(8,145,178,0.06)] hover:-translate-y-1.5 transition-all duration-300 group hover:border-cyan-200/60">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-accent transition-all duration-300 shadow-[0_4px_12px_rgba(8,145,178,0.05)]">
                        <treatment.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-3 tracking-wide">
                        {treatment.title}
                      </h3>
                      <p className="text-body text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: treatment.description }} />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Consultation Steps */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Your Journey to a Better Smile
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                Four simple steps to transform your confidence.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {[
                {
                  step: "01",
                  icon: Calendar,
                  title: "Book Online",
                  description: "Choose a convenient time for your consultation.",
                },
                {
                  step: "02",
                  icon: MessageCircle,
                  title: "Meet Your Dentist",
                  description: "Discuss your goals and concerns in a relaxed setting.",
                },
                {
                  step: "03",
                  icon: FileText,
                  title: "Get Your Plan",
                  description: "Receive a personalized treatment plan with clear pricing.",
                },
                {
                  step: "04",
                  icon: Smile,
                  title: "Transform Your Smile",
                  description: "Watch your confidence grow with every visit.",
                },
              ].map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="text-center relative bg-white/40 backdrop-blur-md border border-cyan-100/30 rounded-2xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:border-cyan-200/50 group">
                  <div className="absolute top-4 right-4 font-serif font-bold text-3xl text-cyan-100 group-hover:text-primary/20 transition-colors duration-300">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-body text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
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
                className="bg-primary hover:bg-[#0E7490] text-primary-foreground px-8 py-4 text-lg rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              >
                Start Your Journey Today
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
                <div className="bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/15 rounded-3xl aspect-[3/4] flex items-center justify-center overflow-hidden border border-cyan-100/30 shadow-[0_20px_50px_rgba(8,145,178,0.06)] relative group">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] pointer-events-none" />
                  <div className="text-center p-8 relative z-10 transition-transform duration-500 group-hover:scale-105">
                    <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-6 border border-cyan-100/20">
                      <Heart className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-foreground font-bold text-xl font-serif">Patient-Centric Studio</h3>
                    <p className="text-muted-foreground text-sm mt-2 max-w-[220px] mx-auto">
                      &ldquo;Where patient comfort, clinical excellence, and state-of-the-art care meet.&rdquo;
                    </p>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute bottom-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-primary border border-cyan-100 shadow-md">
                    Clinical Care Team
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
                Our clinical team combines decades of professional experience with a gentle, patient-first approach.
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
                  name: "Dr. Adrian Lee",
                  role: "Lead Dentist",
                  specialty: "Cosmetic & Restorative Dentistry",
                  initials: "AL",
                  bio: "Dr. Adrian has over 15 years of experience crafting beautiful, custom smiles. He specializes in porcelain veneers, smile design, and complex restorative procedures with a focus on patient comfort.",
                  grad: "from-cyan-500/10 to-teal-500/10"
                },
                {
                  name: "Dr. Maya Tan",
                  role: "Invisalign & Smile Design Specialist",
                  specialty: "Invisalign & Smile Design",
                  initials: "MT",
                  bio: "Dr. Maya is dedicated to straightening smiles discreetly. As a certified Invisalign provider, she utilizes advanced digital scanning technology to design precise, clear aligner treatments tailored to you.",
                  grad: "from-teal-500/10 to-emerald-500/10"
                },
                {
                  name: "Dr. Rachel Lim",
                  role: "General Dentist",
                  specialty: "General Dentistry & Preventive Care",
                  initials: "RL",
                  bio: "Dr. Rachel excels in providing gentle preventive care and family dentistry. She is passionate about judgment-free consultations and helping patients overcome dental anxiety.",
                  grad: "from-blue-500/10 to-cyan-500/10"
                }
              ].map((dentist, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/50 backdrop-blur-sm border border-cyan-100/30 rounded-3xl p-8 hover:shadow-[0_20px_40px_rgba(8,145,178,0.04)] hover:-translate-y-1.5 transition-all duration-300 group hover:border-cyan-200/50 flex flex-col items-center text-center"
                >
                  {/* Custom Fictional Doctor Graphic Avatar */}
                  <div className="relative mb-6">
                    <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${dentist.grad} border border-cyan-100/40 flex items-center justify-center shadow-[inset_0_4px_12px_rgba(8,145,178,0.05)] transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-300/40 relative`}>
                      {/* Abstract pattern */}
                      <div className="absolute inset-2 rounded-full border border-white/40 border-dashed" />
                      <span className="font-serif font-bold text-3xl text-primary/80 group-hover:text-primary transition-colors">
                        {dentist.initials}
                      </span>
                    </div>
                    {/* Badge */}
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md border border-cyan-100 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100/30 mb-3">
                    {dentist.role}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-1 font-serif group-hover:text-primary transition-colors">
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

        {/* Results Gallery */}
        <section id="results" className="py-16 lg:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-semibold text-foreground">
                Real Transformations
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                See the confidence our patients have gained through their smile journeys.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { treatment: "Teeth Whitening", duration: "1 session" },
                { treatment: "Veneers", duration: "2 weeks" },
                { treatment: "Invisible Aligners", duration: "6 months" },
              ].map((result, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-card border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-2">
                        <div className="bg-secondary aspect-[4/3] flex items-center justify-center relative">
                          <span className="absolute top-2 left-2 bg-foreground/80 text-card text-xs px-2 py-1 rounded">
                            Before
                          </span>
                          <span className="text-muted-foreground text-sm">Before</span>
                        </div>
                        <div className="bg-primary/10 aspect-[4/3] flex items-center justify-center relative">
                          <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            After
                          </span>
                          <span className="text-muted-foreground text-sm">After</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-foreground">{result.treatment}</p>
                        <p className="text-sm text-muted-foreground">
                          Treatment time: {result.duration}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              *Results may vary. Images shown are for illustration purposes.
            </p>
          </div>
        </section>

        {/* Testimonials */}
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
                What Our Patients Say
              </h2>
              <p className="mt-4 text-lg text-body max-w-2xl mx-auto">
                Real stories from real smiles.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                {
                  name: "Sarah L.",
                  treatment: "Teeth Whitening",
                  quote:
                    "I was nervous about whitening, but the team made me feel so comfortable. My teeth are 6 shades brighter and I can't stop smiling!",
                },
                {
                  name: "Michael T.",
                  treatment: "Veneers",
                  quote:
                    "After years of hiding my teeth, I finally have a smile I'm proud of. The veneers look completely natural.",
                },
                {
                  name: "Amanda C.",
                  treatment: "Invisible Aligners",
                  quote:
                    "I never thought I'd straighten my teeth as an adult. The clear aligners were so discreet &mdash; most people didn't even notice!",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp} className="h-full">
                  <Card className="h-full bg-white/60 backdrop-blur-md border border-cyan-100/40 rounded-3xl hover:shadow-[0_20px_40px_rgba(8,145,178,0.04)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group hover:border-cyan-200/50">
                    {/* Stylized quotes graphic */}
                    <div className="absolute -top-2 right-4 font-serif font-black text-7xl text-cyan-500/5 group-hover:text-cyan-500/10 transition-colors pointer-events-none select-none">
                      &ldquo;
                    </div>
                    <CardContent className="p-8">
                      <div className="flex gap-1 mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-body text-sm leading-relaxed mb-6 italic" dangerouslySetInnerHTML={{ __html: `&ldquo;${testimonial.quote}&rdquo;` }} />
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/10 to-teal-500/10 flex items-center justify-center border border-cyan-100/20">
                          <span className="text-primary text-sm font-semibold">
                            {testimonial.name[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{testimonial.treatment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
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
              <Card className="mt-10 bg-white/90 backdrop-blur-md border border-cyan-100/60 rounded-3xl shadow-[0_25px_60px_rgba(8,145,178,0.08)] relative overflow-hidden max-w-xl mx-auto">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-accent" />
                <CardContent className="p-8 sm:p-10">
                  <div className="absolute top-6 right-6 bg-cyan-50 text-primary border border-cyan-100/50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Signature Offer
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-xs font-bold text-primary uppercase tracking-widest">
                      Smile Confidence Consultation
                    </p>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-black text-foreground font-serif">S$49</span>
                      <span className="text-muted-foreground text-sm font-medium">/ nett</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">All-inclusive first visit consultation fee</p>
                  </div>
                  <div className="mt-8 space-y-4 max-w-sm mx-auto">
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
                  <div className="mt-8">
                    <Button
                      onClick={openBookingModal}
                      size="lg"
                      className="w-full bg-primary hover:bg-[#0E7490] text-primary-foreground py-4 text-base rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Book Your Consultation
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

        {/* Clarity Promise */}
        <section className="py-16 lg:py-20 bg-muted">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-foreground text-balance">
                Our Promise to You
              </h2>
              <p className="mt-4 text-lg text-body leading-relaxed max-w-xl mx-auto text-pretty">
                We understand that visiting the dentist can feel intimidating. That&apos;s why every
                consultation at Luma is designed to be pressure-free, judgment-free, and focused
                entirely on understanding your goals.
              </p>
              <p className="mt-4 text-body">
                You&apos;ll never be pushed into a treatment you don&apos;t want or need.
              </p>
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
                className="mt-8 bg-card text-primary hover:bg-card/90 px-8 py-4 text-lg rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
              >
                Book a Smile Consultation
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
                <a href="#results" className="text-slate-400 hover:text-primary hover:translate-x-0.5 transition-all text-sm w-fit">
                  Results
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
                  <span>+65 6123 4567</span>
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
                  Book a Smile Consultation
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
        href="https://wa.me/6591234567?text=Hi%20Luma%20Dental%20Studio%2C%20I%20would%20like%20to%20book%20a%20smile%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 font-semibold text-sm border border-emerald-400/20"
        aria-label="WhatsApp Us"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.025 14.12 1 11.51 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.63.43 3.224 1.246 4.634L1.87 20.89l5.48-1.424c.002-.001.002-.001.002-.002zm9.713-7.533c-.267-.133-1.58-.778-1.825-.865-.243-.088-.422-.132-.599.132-.176.265-.683.865-.838 1.041-.155.176-.311.197-.578.064-.267-.133-1.126-.415-2.145-1.325-.793-.705-1.327-1.577-1.484-1.842-.155-.266-.016-.41.117-.541.12-.119.267-.311.4-.467.133-.156.178-.266.267-.442.089-.178.045-.332-.022-.466-.067-.132-.599-1.44-.82-1.97-.215-.52-.45-.449-.62-.457-.159-.007-.34-.008-.523-.008-.182 0-.479.068-.73.342-.25.275-.956.934-.956 2.278 0 1.345.98 2.64 1.117 2.825.137.185 1.929 2.946 4.673 4.129.653.282 1.162.451 1.56.577.656.208 1.252.179 1.724.11.526-.078 1.58-.646 1.802-1.24.223-.593.223-1.1.157-1.202-.066-.104-.244-.155-.511-.289z"/>
        </svg>
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>

      {/* Booking Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl border border-cyan-100/50 bg-white/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif font-bold text-foreground">
              Book Your Smile Consultation
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
                <Select required>
                  <SelectTrigger className="rounded-xl border-slate-200 focus:ring-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select a treatment" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200">
                    <SelectItem value="general">General Consultation</SelectItem>
                    <SelectItem value="whitening">Teeth Whitening</SelectItem>
                    <SelectItem value="veneers">Veneers & Smile Design</SelectItem>
                    <SelectItem value="aligners">Invisible Aligners</SelectItem>
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
    </div>
  )
}
