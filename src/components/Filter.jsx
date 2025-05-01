"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, X, Globe2, Languages } from "lucide-react"
import { createPortal } from "react-dom"

export default function Filter({ onRegionChange, onLanguageChange }) {
  const [isRegionOpen, setIsRegionOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const regionButtonRef = useRef(null)
  const languageButtonRef = useRef(null)
  const regionDropdownRef = useRef(null)
  const languageDropdownRef = useRef(null)
  const [portalContainer, setPortalContainer] = useState(null)

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  const languages = [
    { code: "eng", label: "English" },
    { code: "spa", label: "Spanish" },
    { code: "fra", label: "French" },
    { code: "ara", label: "Arabic" },
    { code: "por", label: "Portuguese" },
    { code: "rus", label: "Russian" },
    { code: "zho", label: "Chinese" },
    { code: "jpn", label: "Japanese" },
    { code: "deu", label: "German" },
    { code: "ita", label: "Italian" },
    { code: "hin", label: "Hindi" },
    { code: "kor", label: "Korean" },
  ]

  useEffect(() => {
    setPortalContainer(document.body)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isRegionOpen &&
        !regionButtonRef.current?.contains(event.target) &&
        !regionDropdownRef.current?.contains(event.target)
      ) {
        setIsRegionOpen(false)
      }
      if (
        isLanguageOpen &&
        !languageButtonRef.current?.contains(event.target) &&
        !languageDropdownRef.current?.contains(event.target)
      ) {
        setIsLanguageOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isRegionOpen, isLanguageOpen])

  const handleRegionSelect = (region) => {
    setSelectedRegion(region)
    onRegionChange(region)
    setIsRegionOpen(false)
  }

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code)
    onLanguageChange(code)
    setIsLanguageOpen(false)
  }

  const clearFilters = () => {
    setSelectedRegion("")
    setSelectedLanguage("")
    onRegionChange("")
    onLanguageChange("")
  }

  const getPosition = (ref) => {
    if (!ref.current) return { top: 0, left: 0, width: 0 }
    const rect = ref.current.getBoundingClientRect()
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Region Filter */}
      <div className="relative">
        <button
          ref={regionButtonRef}
          onClick={() => setIsRegionOpen(!isRegionOpen)}
          className="flex items-center justify-between w-full sm:w-48 px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-center">
            <Globe2 className="h-4 w-4 mr-2 text-blue-500" />
            <span className={selectedRegion ? "text-white" : "text-gray-500"}>
              {selectedRegion || "Filter by Region"}
            </span>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${isRegionOpen ? "rotate-180" : ""}`} />
        </button>

        {portalContainer &&
          isRegionOpen &&
          createPortal(
            <div
              ref={regionDropdownRef}
              className="fixed z-[9999] bg-gray-900/90 border border-gray-800 rounded-md py-1 max-h-60 overflow-auto"
              style={getPosition(regionButtonRef)}
            >
              <ul className="py-1">
                {regions.map((region) => (
                  <li
                    key={region}
                    onClick={() => handleRegionSelect(region)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${
                      selectedRegion === region ? "bg-blue-900/30 text-blue-400" : "text-gray-300"
                    }`}
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>,
            portalContainer,
          )}
      </div>

      {/* Language Filter */}
      <div className="relative">
        <button
          ref={languageButtonRef}
          onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          className="flex items-center justify-between w-full sm:w-48 px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg text-gray-300 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-center">
            <Languages className="h-4 w-4 mr-2 text-blue-500" />
            <span className={selectedLanguage ? "text-white" : "text-gray-500"}>
              {languages.find((l) => l.code === selectedLanguage)?.label || "Filter by Language"}
            </span>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
        </button>

        {portalContainer &&
          isLanguageOpen &&
          createPortal(
            <div
              ref={languageDropdownRef}
              className="fixed z-[9999] bg-gray-900/90 border border-gray-800 rounded-md py-1 max-h-60 overflow-auto"
              style={getPosition(languageButtonRef)}
            >
              <ul className="py-1">
                {languages.map((lang) => (
                  <li
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-800 ${
                      selectedLanguage === lang.code ? "bg-blue-900/30 text-blue-400" : "text-gray-300"
                    }`}
                  >
                    {lang.label}
                  </li>
                ))}
              </ul>
            </div>,
            portalContainer,
          )}
      </div>

      {/* Clear Filters Button */}
      {(selectedRegion || selectedLanguage) && (
        <button
          onClick={clearFilters}
          className="flex items-center space-x-1 text-sm text-blue-400 hover:text-blue-300 px-3 py-2 border border-blue-500/30 bg-blue-900/20 rounded-lg"
        >
          <X className="h-4 w-4" />
          <span>Clear filters</span>
        </button>
      )}
    </div>
  )
}
