"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, MapPin, Users, Globe2 } from "lucide-react"
import { useAuth } from "../auth/AuthContext"

export default function CountryCard({ country }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth()
  const favorite = user && isFavorite(country.cca3)

  const handleFavoriteToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (favorite) {
      removeFromFavorites(country.cca3)
    } else {
      addToFavorites(country)
    }
  }

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/50 animate-fade-in">
        <div className="relative h-48 overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <Globe2 className="h-10 w-10 text-gray-700" />
            </div>
          )}
          <img
            src={country.flags.svg || "/placeholder.svg"}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            className={`w-full h-full object-cover object-center transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${isHovered ? "scale-110" : "scale-100"}`}
            onLoad={() => setIsLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {user && (
            <button
              onClick={handleFavoriteToggle}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
                favorite
                  ? "bg-red-900/80 text-red-400 backdrop-blur-sm"
                  : "bg-gray-900/50 text-gray-400 backdrop-blur-sm opacity-0 group-hover:opacity-100"
              }`}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
            </button>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-white truncate group-hover:text-blue-400 transition-colors duration-300">
            {country.name.common}
          </h3>

          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-400">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
              <span className="truncate">{country.capital?.[0] || "N/A"}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <Globe2 className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
              <span>{country.region}</span>
            </div>

            <div className="flex items-center text-gray-400">
              <Users className="h-4 w-4 mr-2 flex-shrink-0 text-blue-500" />
              <span>{country.population.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
