"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { getCountryByCode } from "../services/countryAPI"
import MapView from "../components/MapView"
import { useAuth } from "../auth/AuthContext"
import {
  ArrowLeft,
  Heart,
  Globe2,
  Users,
  MapPin,
  Languages,
  Clock,
  DollarSign,
  Map,
  ExternalLink,
  Compass,
  Building2,
  Phone,
  Car,
  Plane,
  Palmtree,
  Mountain,
  Waves,
  Cloud,
  Droplets,
  Wind,
  Utensils,
  Music,
  Landmark,
  BookOpen,
  Calendar,
  Ticket,
  Hotel,
  AlertTriangle,
} from "lucide-react"
import CountryImages from "../components/CountryImages"

export default function CountryDetail() {
  const { code } = useParams()
  const [country, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth()
  const [flagLoaded, setFlagLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [scrollY, setScrollY] = useState(0)

  const detailsRef = useRef(null)
  const mapRef = useRef(null)
  const bordersRef = useRef(null)
  const geographyRef = useRef(null)
  const cultureRef = useRef(null)
  const travelRef = useRef(null)
  const imagesRef = useRef(null) // Add imagesRef

  const isDetailsInView = useInView(detailsRef, { triggerOnce: true, threshold: 0.2 })
  const isMapInView = useInView(mapRef, { triggerOnce: true, threshold: 0.2 })
  const isBordersInView = useInView(bordersRef, { triggerOnce: true, threshold: 0.2 })
  const isGeographyInView = useInView(geographyRef, { triggerOnce: true, threshold: 0.2 })
  const isCultureInView = useInView(cultureRef, { triggerOnce: true, threshold: 0.2 })
  const isTravelInView = useInView(travelRef, { triggerOnce: true, threshold: 0.2 })
  const isImagesInView = useInView(imagesRef, { triggerOnce: true, threshold: 0.2 }) // Add isImagesInView

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsLoading(true)
        const response = await getCountryByCode(code)
        setCountry(response.data[0])
      } catch (err) {
        console.error("Error fetching country:", err)
        setError("Failed to load country details. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountry()

    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    // Add scroll listener
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [code])

  const handleFavoriteToggle = () => {
    if (isFavorite(country.cca3)) {
      removeFromFavorites(country.cca3)
    } else {
      addToFavorites(country)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    // Add a default initial state to ensure content is visible
    initial: { opacity: 1 },
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)

    // Smooth scroll to the appropriate section
    const sectionMap = {
      overview: detailsRef,
      geography: geographyRef,
      culture: cultureRef,
      travel: travelRef,
    }

    const targetRef = sectionMap[tab]
    if (targetRef && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 100, // Offset for the sticky header
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 backdrop-blur-sm p-10 rounded-2xl border border-gray-800 shadow-xl text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse-slow"></div>
            <div className="absolute inset-2 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
            <Globe2 className="absolute inset-0 m-auto w-10 h-10 text-blue-400" />
          </div>
          <p className="text-xl text-gray-300 mt-4">Loading country details...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching information about {code}</p>
        </motion.div>
      </div>
    )
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-red-800/50 shadow-xl text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-900/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error || "Country not found"}</p>
          <Link
            to="/explore"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>
        </motion.div>
      </div>
    )
  }

  const favorite = user && isFavorite(country.cca3)

  // Extract additional country data
  const countryName = country.name.common
  const flagUrl = country.flags.svg || country.flags.png
  const flagAlt = country.flags.alt || `Flag of ${countryName}`
  const capital = country.capital?.[0] || "N/A"
  const region = country.region
  const subregion = country.subregion
  const population = country.population.toLocaleString()
  const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A"
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol || "N/A"})`)
        .join(", ")
    : "N/A"
  const timezones = country.timezones || []
  const borders = country.borders || []
  const googleMapsUrl = country.maps?.googleMaps
  const openStreetMapsUrl = country.maps?.openStreetMaps

  // Additional data
  const area = country.area ? `${country.area.toLocaleString()} km²` : "N/A"
  const drivingSide = country.car?.side || "N/A"
  const tld = country.tld?.join(", ") || "N/A"
  const callingCode =
    country.idd?.root && country.idd?.suffixes?.[0] ? `${country.idd.root}${country.idd.suffixes[0]}` : "N/A"

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Parallax Flag Background */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {flagLoaded ? (
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
              backgroundImage: `url(${flagUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"></div>
        )}

        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              {region} {subregion ? `• ${subregion}` : ""}
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {countryName}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {country.name.official}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/explore"
              className="px-6 py-3 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Link>

            {user && (
              <motion.button
                onClick={handleFavoriteToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  favorite
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-black/50 text-white border border-white/20"
                }`}
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
                <span>{favorite ? "Remove from Favorites" : "Add to Favorites"}</span>
              </motion.button>
            )}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-30 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar py-4 gap-2">
            {[
              { id: "overview", label: "Overview", icon: <Globe2 className="w-4 h-4" /> },
              { id: "geography", label: "Geography", icon: <Mountain className="w-4 h-4" /> },
              { id: "culture", label: "Culture", icon: <Palmtree className="w-4 h-4" /> },
              { id: "travel", label: "Travel", icon: <Plane className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-900/30 text-blue-400 border border-blue-500/30"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <motion.div
          ref={detailsRef}
          initial="visible"
          animate={isDetailsInView ? "visible" : "visible"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Country Details
            </div>
            <h2 className="text-3xl font-bold text-white">Overview</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Flag Card */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-1 bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden group shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={flagUrl || "/placeholder.svg"}
                  alt={flagAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onLoad={() => setFlagLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">National Flag</h3>
                <p className="text-gray-300 text-sm">{flagAlt}</p>
              </div>
            </motion.div>

            {/* Key Facts */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <MapPin className="text-rose-500" />, title: "Capital", value: capital },
                {
                  icon: <Globe2 className="text-blue-500" />,
                  title: "Region",
                  value: `${region}${subregion ? ` (${subregion})` : ""}`,
                },
                { icon: <Users className="text-emerald-500" />, title: "Population", value: population },
                { icon: <Map className="text-amber-500" />, title: "Area", value: area },
                { icon: <Languages className="text-purple-500" />, title: "Languages", value: languages },
                { icon: <DollarSign className="text-green-500" />, title: "Currencies", value: currencies },
                {
                  icon: <Clock className="text-blue-400" />,
                  title: "Timezones",
                  value:
                    timezones.length > 3
                      ? `${timezones.slice(0, 3).join(", ")} (+${timezones.length - 3} more)`
                      : timezones.join(", ") || "N/A",
                },
                { icon: <Building2 className="text-gray-400" />, title: "Top-level Domain", value: tld },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-gray-900">{item.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-300">{item.title}</h3>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          ref={mapRef}
          initial="visible"
          animate={isMapInView ? "visible" : "visible"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Location
            </div>
            <h2 className="text-3xl font-bold text-white">Discover on the Map</h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-gray-800/70 backdrop-blur-sm p-1 rounded-2xl border border-gray-700 overflow-hidden shadow-xl"
          >
            <MapView country={country} height="500px" />
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-4">
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900/30 text-blue-400 rounded-lg border border-blue-800/50 hover:bg-blue-900/50 transition-all duration-300 group"
              >
                <Map className="h-5 w-5" />
                <span>View on Google Maps</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            )}

            {openStreetMapsUrl && (
              <a
                href={openStreetMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-900/30 text-purple-400 rounded-lg border border-purple-800/50 hover:bg-purple-900/50 transition-all duration-300 group"
              >
                <Map className="h-5 w-5" />
                <span>View on OpenStreetMap</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial="visible"
          animate={isDetailsInView ? "visible" : "visible"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              More Details
            </div>
            <h2 className="text-3xl font-bold text-white">Additional Information</h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Car className="text-blue-400 w-10 h-10" />,
                title: "Driving Side",
                value: drivingSide.charAt(0).toUpperCase() + drivingSide.slice(1),
                color: "from-blue-600/30 to-blue-400/30",
                border: "border-blue-500/30",
                bg: "bg-gray-800/70",
              },
              {
                icon: <Phone className="text-emerald-400 w-10 h-10" />,
                title: "Calling Code",
                value: callingCode,
                color: "from-emerald-600/30 to-emerald-400/30",
                border: "border-emerald-500/30",
                bg: "bg-gray-800/70",
              },
              {
                icon: <Compass className="text-amber-400 w-10 h-10" />,
                title: "Continent",
                value: country.continents?.join(", ") || "N/A",
                color: "from-amber-600/30 to-amber-400/30",
                border: "border-amber-500/30",
                bg: "bg-gray-800/70",
              },
              {
                icon: <Waves className="text-purple-400 w-10 h-10" />,
                title: "Landlocked",
                value: country.landlocked ? "Yes" : "No",
                color: "from-purple-600/30 to-purple-400/30",
                border: "border-purple-500/30",
                bg: "bg-gray-800/70",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`${item.bg} backdrop-blur-sm p-6 rounded-2xl border ${item.border} hover:shadow-lg shadow-lg shadow-blue-900/5 transition-all duration-300 text-center`}
              >
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} blur-md`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">{item.icon}</div>
                </div>
                <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                <p className="text-gray-300">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Geography Section */}
        <motion.div
          ref={geographyRef}
          initial="visible"
          animate={isGeographyInView ? "visible" : "visible"}
          variants={staggerContainer}
          className={`mb-16 ${activeTab === "geography" ? "block" : "block"}`}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium mb-4">
              Physical Features
            </div>
            <h2 className="text-3xl font-bold text-white">Geography</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30 shadow-lg shadow-green-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Mountain className="text-green-400" /> Terrain
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "South Georgia is a rugged, mountainous island with 11 peaks rising above 2,000 meters. The South Sandwich Islands are volcanic islands with some active volcanoes. The terrain is mostly barren and covered with ice and snow year-round."
                    : `The terrain of ${country.name.common} features diverse landscapes including mountains, plains, and coastal areas. The geography is shaped by its ${region} location and natural boundaries.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Cloud className="text-blue-400" /> Climate
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "The climate is maritime polar, characterized by persistent cold temperatures, strong winds, and high precipitation. The islands experience a tundra climate with average temperatures below freezing for much of the year."
                    : `${country.name.common}'s climate is influenced by its geographical location in ${region}. The weather patterns vary across different parts of the country, with seasonal changes affecting temperature and precipitation.`}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Droplets className="text-blue-400" /> Natural Resources
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "The islands have limited natural resources. The surrounding waters are rich in marine life, including krill, fish, and squid, which support the local ecosystem and have historically been targets for commercial fishing."
                    : `${country.name.common} possesses various natural resources that contribute to its economy and development. These resources are distributed across the country's diverse geographical regions.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Wind className="text-cyan-400" /> Environmental Issues
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "Environmental concerns include the impact of historical whaling and sealing activities, introduced species like rats and reindeer (now eradicated), and the effects of climate change on the fragile Antarctic ecosystem. The government has implemented strict environmental protection measures."
                    : `Like many nations, ${country.name.common} faces environmental challenges related to development, resource management, and climate change. Conservation efforts are ongoing to protect the country's natural heritage.`}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div
          ref={cultureRef}
          initial="visible"
          animate={isCultureInView ? "visible" : "visible"}
          variants={staggerContainer}
          className={`mb-16 ${activeTab === "culture" ? "block" : "block"}`}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium mb-4">
              Heritage & Traditions
            </div>
            <h2 className="text-3xl font-bold text-white">Culture</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Utensils className="text-amber-400" /> Cuisine
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "As there is no permanent population, South Georgia doesn't have a traditional cuisine. However, research stations and visitors typically consume imported foods, with an emphasis on high-calorie meals suitable for the harsh climate. Seafood from the surrounding waters may occasionally supplement diets."
                    : `The cuisine of ${country.name.common} reflects its cultural heritage and local ingredients. Traditional dishes are an important part of the national identity and are often featured in celebrations and gatherings.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-rose-500/30 shadow-lg shadow-rose-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Music className="text-rose-400" /> Arts & Music
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "The islands don't have indigenous arts or music traditions due to the lack of permanent inhabitants. However, the natural beauty of the islands has inspired visiting artists, photographers, and filmmakers who have documented the stunning landscapes and wildlife."
                    : `${country.name.common} has a rich artistic heritage that includes traditional and contemporary forms of expression. Music, dance, visual arts, and literature all contribute to the country's cultural landscape.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Landmark className="text-blue-400" /> Historical Sites
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "Historical sites on South Georgia include abandoned whaling stations like Grytviken, which operated from 1904 to 1965. The island also contains the grave of explorer Ernest Shackleton, who died there in 1922 during his final Antarctic expedition. These sites are protected as historical monuments."
                    : `${country.name.common} is home to numerous historical sites that reflect its past. These landmarks are important for understanding the nation's development and are often popular destinations for visitors.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="text-emerald-400" /> Language & Literature
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "English is the official language used in administration and by visitors. The islands have been featured in literature related to Antarctic exploration, most notably in accounts of Shackleton's expeditions and in scientific publications about the region's unique ecosystem."
                    : `The linguistic landscape of ${country.name.common} includes ${languages}. Literature in these languages has contributed to the country's cultural identity and has gained recognition both nationally and internationally.`}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Travel Section */}
        <motion.div
          ref={travelRef}
          initial="visible"
          animate={isTravelInView ? "visible" : "visible"}
          variants={staggerContainer}
          className={`mb-16 ${activeTab === "travel" ? "block" : "block"}`}
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-medium mb-4">
              Visitor Information
            </div>
            <h2 className="text-3xl font-bold text-white">Travel</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="text-blue-400" /> Best Time to Visit
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "The best time to visit is during the austral summer (November to March) when temperatures are milder and days are longer. December to February offers the best wildlife viewing opportunities, with peak penguin and seal activity. Outside these months, harsh weather conditions make visits difficult or impossible."
                    : `The ideal time to visit ${country.name.common} depends on the region and activities planned. Weather patterns, seasonal events, and tourist seasons should be considered when planning a trip.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-rose-500/30 shadow-lg shadow-rose-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Ticket className="text-rose-400" /> Attractions
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "The main attractions are the abundant wildlife, including vast colonies of king penguins, elephant seals, and fur seals. Visitors also come to see the dramatic landscapes, glaciers, and historical whaling stations. Grytviken, with its museum and Shackleton's grave, is a popular site for expedition cruises."
                    : `${country.name.common} offers a variety of attractions for visitors, from natural wonders to cultural sites. These destinations showcase the country's unique characteristics and provide memorable experiences.`}
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Hotel className="text-amber-400" /> Accommodation
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "There are no hotels or public accommodations on the islands. Visitors typically stay aboard the expedition cruise ships that bring them to the islands. The British Antarctic Survey maintains research stations, but these are not open to tourists. All visits must be pre-approved by the government."
                    : `Accommodation options in ${country.name.common} range from luxury hotels to budget-friendly alternatives. Visitors can find places to stay that suit their preferences and budget in various locations throughout the country.`}
                </p>
              </div>

              <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-900/10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="text-amber-400" /> Travel Advisory
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  {country.name.common === "South Georgia and the South Sandwich Islands"
                    ? "Travel to these remote islands requires careful planning and preparation. Visitors must obtain permits in advance, and strict environmental regulations must be followed. The extreme weather, rough seas, and isolation mean that medical facilities are limited, and evacuation can be difficult. Travel insurance with emergency evacuation coverage is essential."
                    : `Before traveling to ${country.name.common}, visitors should check current travel advisories and requirements. Information about safety, health precautions, and entry regulations can help ensure a smooth and enjoyable trip.`}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Country Images Section */}
        <motion.div
          ref={imagesRef}
          initial="visible"
          animate={isImagesInView ? "visible" : "visible"}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              Photo Gallery
            </div>
            <h2 className="text-3xl font-bold text-white">Explore {countryName} in Pictures</h2>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CountryImages countryName={countryName} />
          </motion.div>
        </motion.div>

        {/* Bordering Countries */}
        {borders.length > 0 && (
          <motion.div
            ref={bordersRef}
            initial="visible"
            animate={isBordersInView ? "visible" : "visible"}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                Neighbors
              </div>
              <h2 className="text-3xl font-bold text-white">Bordering Countries</h2>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
              {borders.map((borderCode) => (
                <motion.div key={borderCode} whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to={`/country/${borderCode}`}
                    className="px-5 py-2.5 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-blue-500/50 transition-all duration-300 inline-block shadow-md"
                  >
                    {borderCode}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
