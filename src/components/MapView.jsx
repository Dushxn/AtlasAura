"use client"

import { useEffect, useRef, useState } from "react"
import { Map, MapPin } from "lucide-react"

export default function MapView({ country, height = "400px" }) {
  const mapRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!country || !country.latlng || !mapRef.current) return

    // Use OpenStreetMap as a reliable alternative
    const loadMap = () => {
      try {
        setIsLoading(true)

        const [lat, lng] = country.latlng

        // Create an iframe with OpenStreetMap
        const iframe = document.createElement("iframe")
        iframe.width = "100%"
        iframe.height = "100%"
        iframe.frameBorder = "0"
        iframe.style.border = "0"
        iframe.style.borderRadius = "0.5rem"
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 10},${lat - 10},${lng + 10},${lat + 10}&layer=mapnik&marker=${lat},${lng}`

        // Clear previous content and append the iframe
        if (mapRef.current) {
          mapRef.current.innerHTML = ""
          mapRef.current.appendChild(iframe)
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error loading map:", err)
        setError("Failed to load map")
        setIsLoading(false)
      }
    }

    loadMap()
  }, [country])

  return (
    <div className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900/50 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-blue-500/10">
      {error ? (
        <div className="flex flex-col items-center justify-center p-8 text-center h-[400px] bg-gray-900/50">
          <Map className="h-16 w-16 text-red-500 mb-4" />
          <p className="text-red-400 mb-2">{error}</p>
          <p className="text-gray-400">We couldn't load the map for this country.</p>
        </div>
      ) : (
        <div className="relative" style={{ height }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-300">Loading map...</p>
              </div>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full bg-gray-900/50">
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-blue-500 animate-bounce mb-2" />
                <p className="text-gray-400">Loading map...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
