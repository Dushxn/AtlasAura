"use client"

import { useState, useEffect } from "react"
import { Camera, ExternalLink, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export default function CountryImages({ countryName }) {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const fetchImages = async (country, pageNum = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${country}&page=${pageNum}&per_page=9&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID -MV62anfJgIGrNHYZ3WQ70WbgUyMs8vnC_HhGHXYv8g`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status}`)
      }

      const data = await response.json()
      setImages(data.results)
    } catch (err) {
      console.error("Error fetching images:", err)
      setError("Failed to load images. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (countryName) {
      fetchImages(countryName, page)
    }
  }, [countryName, page])

  const handleRefresh = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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

  if (error) {
    return (
      <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/10 text-center">
        <Camera className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Image Loading Error</h3>
        <p className="text-gray-300 mb-4">{error}</p>
        <button
          onClick={() => fetchImages(countryName, page)}
          className="px-4 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors duration-300 inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Camera className="text-blue-400" /> {countryName} Images
        </h3>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-lg hover:bg-blue-900/50 transition-colors duration-300 inline-flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Loading..." : "More Images"}
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-video bg-gray-800 animate-pulse rounded-lg"></div>
          ))}
        </div>
      ) : images.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {images.map((image) => (
            <motion.div
              key={image.id}
              className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="aspect-video bg-gray-900 overflow-hidden">
                <img
                  src={image.urls.regular || "/placeholder.svg"}
                  alt={image.alt_description || `${countryName} image`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex justify-between items-end">
                  <div>
                    {image.user && (
                      <p className="text-sm text-gray-300">
                        Photo by <span className="text-white">{image.user.name}</span>
                      </p>
                    )}
                  </div>
                  <a
                    href={image.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-blue-900/50 transition-colors"
                    aria-label="View on Unsplash"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 text-center">
          <Camera className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Images Found</h3>
          <p className="text-gray-400">We couldn't find any images for {countryName}.</p>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-4">Images powered by Unsplash</p>
    </div>
  )
}
