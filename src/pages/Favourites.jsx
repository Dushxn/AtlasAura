"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import CountryCard from "../components/CountryCard"
import { Heart, Search, X, Globe } from "lucide-react"

export default function Favorites() {
  const { favorites } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFavorites, setFilteredFavorites] = useState([])

  useEffect(() => {
    if (!searchTerm) {
      setFilteredFavorites(favorites)
      return
    }

    const filtered = favorites.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredFavorites(filtered)
  }, [favorites, searchTerm])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="relative mb-12 overflow-hidden rounded-xl bg-gradient-to-r from-red-900/30 to-pink-900/30 backdrop-blur-sm border border-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516571748831-5d81767b788d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center text-white">
            <Heart className="h-8 w-8 mr-2 text-red-500" />
            My Favorite Countries
          </h1>

          {favorites.length > 0 && (
            <div className="max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-red-500" />
                </div>

                <input
                  type="text"
                  placeholder="Search your favorites..."
                  className="w-full px-10 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={handleSearch}
                />

                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {favorites.length > 0 ? (
        <>
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFavorites.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
              <p className="text-gray-300 text-lg mb-4">No favorites found matching your search.</p>
              <button
                onClick={clearSearch}
                className="px-6 py-2 bg-red-900/30 text-red-400 rounded-lg border border-red-800/50 hover:bg-red-900/50 transition-colors duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
          <Heart className="h-16 w-16 mx-auto text-gray-700 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-white">No Favorites Yet</h2>
          <p className="text-gray-400 mb-6">Start exploring countries and add them to your favorites!</p>
          <Link
            to="/explore"
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 inline-flex items-center gap-2"
          >
            <Globe className="h-5 w-5" />
            Explore Countries
          </Link>
        </div>
      )}
    </div>
  )
}
