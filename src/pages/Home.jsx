// ✅ Fully Fixed Home.jsx - Language filtering using ISO codes
"use client"

import { useEffect, useState, useCallback } from "react"
import { getAllCountries, getCountryByName, getCountriesByRegion } from "../services/countryAPI"
import CountryCard from "../components/CountryCard"
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter"
import CountrySkeleton from "../components/CountrySkeleton"
import { Globe } from "lucide-react"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [region, setRegion] = useState("")
  const [language, setLanguage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true)
        const response = await getAllCountries()
        setCountries(response.data)
        setFilteredCountries(response.data)
      } catch (err) {
        console.error("Error fetching countries:", err)
        setError("Failed to load countries. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCountries()
  }, [])

  const applyLanguageFilter = useCallback((list, selectedLang) => {
    if (!selectedLang) return list

    return list.filter((country) => {
      if (!country.languages) return false
      return Object.keys(country.languages).includes(selectedLang)
    })
  }, [])

  const handleSearch = useCallback(
    async (term) => {
      setSearchTerm(term)
      setIsLoading(true)

      try {
        let result = []

        if (!term) {
          if (region) {
            const response = await getCountriesByRegion(region)
            result = response.data
          } else {
            result = [...countries]
          }
        } else {
          const response = await getCountryByName(term)
          result = response.data

          if (region) {
            result = result.filter((country) => country.region === region)
          }
        }

        if (language) {
          result = applyLanguageFilter(result, language)
        }

        setFilteredCountries(result)
      } catch (err) {
        console.error("Error searching countries:", err)
        setFilteredCountries([])
      } finally {
        setIsLoading(false)
      }
    },
    [countries, region, language, applyLanguageFilter],
  )

  const handleRegionChange = useCallback(
    async (selectedRegion) => {
      setRegion(selectedRegion)
      setIsLoading(true)

      try {
        let result = []

        if (selectedRegion) {
          const response = await getCountriesByRegion(selectedRegion)
          result = response.data
        } else {
          result = [...countries]
        }

        if (searchTerm) {
          result = result.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        if (language) {
          result = applyLanguageFilter(result, language)
        }

        setFilteredCountries(result)
      } catch (err) {
        console.error("Error filtering by region:", err)
        setFilteredCountries([])
      } finally {
        setIsLoading(false)
      }
    },
    [countries, searchTerm, language, applyLanguageFilter],
  )

  const handleLanguageChange = useCallback(
    (selectedLanguage) => {
      setLanguage(selectedLanguage)
      setIsLoading(true)

      try {
        let result = [...countries]

        if (region) {
          result = result.filter((country) => country.region === region)
        }

        if (searchTerm) {
          result = result.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        if (selectedLanguage) {
          result = applyLanguageFilter(result, selectedLanguage)
        }

        setFilteredCountries(result)
      } catch (err) {
        console.error("Error filtering by language:", err)
        setFilteredCountries([])
      } finally {
        setIsLoading(false)
      }
    },
    [countries, searchTerm, region, applyLanguageFilter],
  )

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-900/20 text-red-400 p-6 rounded-lg border border-red-800">
          <p className="text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-900/30 text-red-400 rounded-lg hover:bg-red-900/50 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="relative mb-12 overflow-hidden rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589519160732-576f165b9aad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="relative p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center text-white">
            <Globe className="h-8 w-8 mr-2 text-blue-500" />
            Explore Countries
          </h1>
          <p className="text-gray-300 max-w-2xl mb-6">
            Discover detailed information about countries around the world. Search by name, filter by region or
            language, and save your favorites.
          </p>

          <div className="space-y-4">
            <SearchBar onSearch={handleSearch} />
            <Filter onRegionChange={handleRegionChange} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </div>

      {isLoading ? (
        <CountrySkeleton count={12} />
      ) : filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
          <p className="text-gray-300 text-lg mb-4">No countries found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm("")
              setRegion("")
              setLanguage("")
              setFilteredCountries(countries)
            }}
            className="px-6 py-2 bg-blue-900/30 text-blue-400 rounded-lg border border-blue-800/50 hover:bg-blue-900/50 transition-colors duration-300"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
