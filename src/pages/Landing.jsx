"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion"
import {
  Globe,
  ArrowRight,
  MapPin,
  Users,
  Languages,
  ChevronDown,
  Star,
  Compass,
  Map,
  Plane,
  ArrowUpRight,
} from "lucide-react"

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)

  const isHeroInView = useInView(heroRef, { once: true })
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const features = [
    {
      title: "Explore Countries",
      description:
        "Discover detailed information about countries around the world, from geography to culture and history.",
      icon: <Globe className="w-12 h-12 text-blue-500" />,
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "Save Favorites",
      description: "Create your personal collection of countries you love or want to visit for quick access anytime.",
      icon: <MapPin className="w-12 h-12 text-rose-500" />,
      color: "from-rose-600 to-rose-400",
    },
    {
      title: "Demographic Data",
      description: "Access population statistics and demographic information with interactive visualizations.",
      icon: <Users className="w-12 h-12 text-emerald-500" />,
      color: "from-emerald-600 to-emerald-400",
    },
    {
      title: "Language Insights",
      description: "Learn about languages spoken in different regions with pronunciation guides and key phrases.",
      icon: <Languages className="w-12 h-12 text-amber-500" />,
      color: "from-amber-600 to-amber-400",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Travel Blogger",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      content:
        "AtlasAura has completely transformed how I research countries for my travel blog. The detailed information and intuitive interface make planning my adventures so much easier!",
    },
    {
      name: "Michael Chen",
      role: "Geography Teacher",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      content:
        "As an educator, I find AtlasAura to be an invaluable resource for my students. The interactive maps and cultural insights bring geography lessons to life in my classroom.",
    },
    {
      name: "Elena Rodriguez",
      role: "Digital Nomad",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
      content:
        "I rely on AtlasAura daily as I travel the world while working remotely. The language guides and local customs information have saved me from many awkward situations!",
    },
  ]

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)

    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(testimonialInterval)
    }
  }, [features.length, testimonials.length])

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Animated Background */}
      <motion.div ref={heroRef} className="relative min-h-screen flex items-center" style={{ opacity, scale }}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Animated Dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                  ease: "easeInOut",
                }}
                style={{
                  width: `${Math.random() * 6 + 1}px`,
                  height: `${Math.random() * 6 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 z-10">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={isHeroInView ? "show" : "hidden"}
          >
            <motion.div className="max-w-2xl" variants={fadeInUp}>
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                variants={fadeInUp}
              >
                AtlasAura
              </motion.h1>
              <motion.p className="text-xl md:text-2xl text-gray-300 mb-8" variants={fadeInUp}>
                Your journey to discover the world begins here. Explore countries, cultures, and connect with the global
                community.
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/login"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-center inline-block"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-8 py-3 bg-black border border-blue-500/50 rounded-full text-white font-medium hover:bg-blue-900/20 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Create Account
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="relative w-full max-w-md aspect-square" variants={fadeInUp}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-4 bg-black/80 rounded-full backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{
                    rotateZ: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <Globe className="w-32 h-32 text-blue-500" />
                </motion.div>
              </div>

              {/* Orbiting elements */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center"
                  animate={{
                    x: `${Math.cos((i * Math.PI) / 2) * 150}px`,
                    y: `${Math.sin((i * Math.PI) / 2) * 150}px`,
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    margin: "-20px 0 0 -20px",
                  }}
                >
                  {i === 0 && <Compass className="w-5 h-5 text-blue-400" />}
                  {i === 1 && <Map className="w-5 h-5 text-purple-400" />}
                  {i === 2 && <Star className="w-5 h-5 text-amber-400" />}
                  {i === 3 && <Plane className="w-5 h-5 text-emerald-400" />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-8 h-8 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div ref={featuresRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black"></div>

        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 L100,0 L100,20 Q50,40 0,20 Z"
              fill="rgba(59, 130, 246, 0.05)"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFeaturesInView ? 1 : 0 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M0,100 L100,100 L100,80 Q50,60 0,80 Z"
              fill="rgba(139, 92, 246, 0.05)"
              initial={{ opacity: 0 }}
              animate={{ opacity: isFeaturesInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isFeaturesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4"
            >
              Powerful Features
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Discover Our Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore the world with our comprehensive set of tools designed to make your global discovery journey
              seamless and enjoyable.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "show" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-500 ${
                  currentFeature === index ? "ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10" : ""
                }`}
              >
                <motion.div
                  className="mb-6 relative"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="absolute -inset-2 rounded-full bg-gradient-to-r opacity-30 blur-lg"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${feature.color.split(" ")[0].replace("from-", "")}, ${feature.color.split(" ")[1].replace("to-", "")})`,
                    }}
                  ></div>
                  <div className="relative">{feature.icon}</div>
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                Start Exploring Now
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* World Map Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            animate={isFeaturesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={isFeaturesInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-blue-500/20"
              >
                <img
                  src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="World Map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Interactive points on the map */}
                {[
                  { top: "30%", left: "20%", color: "bg-blue-500" },
                  { top: "40%", left: "48%", color: "bg-purple-500" },
                  { top: "60%", left: "70%", color: "bg-emerald-500" },
                  { top: "25%", left: "80%", color: "bg-amber-500" },
                  { top: "70%", left: "30%", color: "bg-rose-500" },
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-3 h-3 rounded-full ${point.color} shadow-lg`}
                    style={{ top: point.top, left: point.left }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  >
                    <span className={`absolute -inset-1 rounded-full ${point.color} opacity-50 animate-ping`}></span>
                  </motion.div>
                ))}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Interactive World Map</h3>
                  <p className="text-gray-300 text-sm md:text-base">
                    Explore countries with our interactive map visualization
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="w-full lg:w-1/2"
              initial={{ x: 50, opacity: 0 }}
              animate={isFeaturesInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                Interactive Experience
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Visualize Your Journey
              </h2>
              <p className="text-gray-300 mb-8">
                Our interactive world map allows you to visually explore countries and regions. Click on any location to
                instantly access detailed information about culture, demographics, and travel insights.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Visual Navigation", description: "Click and zoom on any region to explore in detail" },
                  { title: "Real-time Data", description: "Access up-to-date information about any country" },
                  { title: "Custom Routes", description: "Plan and visualize your travel routes across countries" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isFeaturesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                  >
                    <div className="mt-1 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13.3334 4L6.00008 11.3333L2.66675 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/explore"
                  className="px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-medium hover:bg-blue-500/20 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Explore the Map
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <motion.div ref={testimonialsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTestimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isTestimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4"
            >
              Testimonials
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              What Our Explorers Say
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their global exploration experience with
              AtlasAura.
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-gray-700"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70"></div>
                    <div className="absolute inset-0.5 rounded-full overflow-hidden bg-gray-900">
                      <img
                        src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg italic mb-6">"{testimonials[activeTestimonial].content}"</p>
                    <div>
                      <h4 className="font-bold text-white text-lg">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-gray-400">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? "bg-blue-500 scale-125" : "bg-gray-600"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative py-16 bg-black border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Globe className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  AtlasAura
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                Your journey to discover the world begins here. Explore countries, cultures, and connect with the global
                community.
              </p>
              <div className="flex gap-4">
                {["twitter", "facebook", "instagram", "youtube"].map((social) => (
                  <Link
                    key={social}
                    to={`https://${social}.com`}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-900/50 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Integrations", "Documentation"],
              },
              {
                title: "Resources",
                links: ["Blog", "Guides", "Help Center", "Community", "Webinars"],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Press", "Contact", "Partners"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="text-white font-bold mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <Link to="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} AtlasAura. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-500 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-500 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-500 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
