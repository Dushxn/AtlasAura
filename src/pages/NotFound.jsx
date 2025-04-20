"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Globe, MapPin, Compass, Search, ArrowRight, RefreshCw, Map, Navigation } from "lucide-react"

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSearching, setIsSearching] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const controls = useAnimation()
  const globeRef = useRef(null)
  const searchRef = useRef(null)

  const popularCountries = ["United States", "Japan", "France", "Brazil", "Australia"]

  // Interactive effect - move globe with mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setPosition({ x, y })
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Floating animation for the globe
  useEffect(() => {
    controls.start({
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    })
  }, [controls])

  // Show suggestions after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuggestions(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Handle clicks outside the search container to close suggestions
  useEffect(() => {
    if (showSuggestions) {
      const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setShowSuggestions(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions])

  const handleSearchFocus = () => {
    setIsSearching(true)
  }

  const handleSearchBlur = () => {
    if (!searchText) {
      setIsSearching(false)
    }
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black overflow-hidden">
      {/* Dynamic background with parallax effect */}
      <div className="fixed inset-0 overflow-hidden">
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
          style={{
            transform: `translate(${position.x * -1.5}px, ${position.y * -1.5}px)`,
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
          style={{
            transform: `translate(${position.x * 1.5}px, ${position.y * 1.5}px)`,
          }}
        />

        {/* Animated stars/particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20"
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

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px), 
                              linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              transform: `translate(${position.x * 0.5}px, ${position.y * 0.5}px)`,
            }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div className="relative mx-auto mb-12 w-64 h-64" animate={controls} ref={globeRef}>
          {/* 3D-like globe with layers */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-4 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${position.y}deg) rotateY(${position.x}deg)`,
            }}
          >
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
              <Globe className="w-40 h-40 text-blue-500" />
            </motion.div>
          </motion.div>

          {/* Orbiting elements */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                top: "50%",
                left: "50%",
                margin: "-20px 0 0 -20px",
                transformOrigin: `${32 + i * 20}px center`,
              }}
            >
              {i === 0 && <MapPin className="w-5 h-5 text-red-400" />}
              {i === 1 && <Navigation className="w-5 h-5 text-purple-400" />}
              {i === 2 && <Map className="w-5 h-5 text-emerald-400" />}
            </motion.div>
          ))}

          {/* Animated "lost" pin */}
          <motion.div
            className="absolute w-16 h-16 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              top: "30%",
              left: "70%",
            }}
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <MapPin className="w-10 h-10 text-red-500 drop-shadow-glow" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-9xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              animate={{
                backgroundPosition: ["0% center", "100% center", "0% center"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{ backgroundSize: "200% auto" }}
            >
              404
            </motion.span>
          </motion.h1>

          <motion.h2
            className="text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.span
              animate={{
                color: ["#60A5FA", "#8B5CF6", "#60A5FA"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Lost in Navigation
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-gray-300 mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            The country you're looking for seems to be off the map.
            <br />
            Let's help you find your way back.
          </motion.p>
        </motion.div>

        {/* Interactive search bar */}
        <motion.div
          className="max-w-md mx-auto mb-16 relative z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          ref={searchRef}
        >
          <div
            className={`relative flex items-center transition-all duration-300 ${isSearching ? "bg-gray-800/70" : "bg-gray-900/50"} backdrop-blur-sm rounded-full border ${isSearching ? "border-blue-500/50" : "border-gray-700"} overflow-hidden group search-container`}
          >
            <Search
              className={`absolute left-4 w-5 h-5 transition-colors duration-300 ${isSearching ? "text-blue-400" : "text-gray-500"}`}
            />
            <input
              type="text"
              placeholder="Try searching for a country..."
              className="w-full py-3 pl-12 pr-4 bg-transparent text-white placeholder-gray-500 focus:outline-none"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onChange={handleSearchChange}
              value={searchText}
            />
            <motion.div
              className="absolute right-3 opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                <RefreshCw className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Animated suggestions */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                className="absolute left-0 right-0 mt-2 bg-gray-800/80 backdrop-blur-md rounded-xl border border-gray-700 overflow-hidden shadow-xl z-40"
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 border-b border-gray-700">
                  <p className="text-sm text-gray-400">Popular destinations:</p>
                </div>
                <div className="max-h-60 overflow-auto">
                  {popularCountries.map((country, index) => (
                    <motion.div
                      key={country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="px-4 py-2 hover:bg-blue-900/30 transition-colors duration-200"
                    >
                      <Link to={`/country/${country}`} className="flex items-center text-gray-300 hover:text-white">
                        <Globe className="w-4 h-4 mr-2 text-blue-400" />
                        {country}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Compass className="h-5 w-5" />
              <span>Back to Home</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/explore"
              className="px-8 py-3 bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-400 font-medium hover:bg-blue-900/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Map className="h-5 w-5" />
              <span>Explore Countries</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-24 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-30 rounded-full"></div>
          <motion.div
            className="relative p-6"
            animate={{
              boxShadow: [
                "0 0 0 rgba(59, 130, 246, 0.1)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 0 rgba(59, 130, 246, 0.1)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.p
              className="text-lg text-gray-300 italic"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              "Not all those who wander are lost."
            </motion.p>
            <p className="text-sm text-gray-500 mt-2">— J.R.R. Tolkien</p>
          </motion.div>
        </motion.div>

        {/* Mouse follower effect */}
        <motion.div
          className="fixed w-6 h-6 rounded-full pointer-events-none z-50 hidden md:block"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            translateX: "-50%",
            translateY: "-50%",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            mixBlendMode: "screen",
          }}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}
