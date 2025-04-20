"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { Sun, Moon, Menu, X, Globe, Heart, LogOut, User } from "lucide-react"
import useDarkMode from "../hooks/useDarkMode"

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isDark, setIsDark] = useDarkMode()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleDarkMode = () => setIsDark(!isDark)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-800" : "bg-black"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={user ? "/explore" : "/"} className="flex items-center space-x-2 text-blue-500">
            <Globe className="h-6 w-6" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            AtlasAura
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/explore"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === "/explore" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Explore
                </Link>
                <Link
                  to="/favorites"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === "/favorites" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Favorites
                </Link>
                <div className="flex items-center space-x-2 text-sm text-gray-300 bg-gray-800/50 px-3 py-2 rounded-full backdrop-blur-sm">
                  <User className="h-4 w-4 text-blue-400" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === "/login" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === "/register" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Register
                </Link>
              </>
            )}

            {/* Dark mode toggle */}
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-300 hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-300 hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-lg border-b border-gray-800 shadow-lg animate-slide-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link
                  to="/explore"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/explore" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Explore
                </Link>
                <Link
                  to="/favorites"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/favorites" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Favorites</span>
                  </div>
                </Link>
                <div className="flex items-center space-x-2 px-3 py-2 text-gray-300 bg-gray-800/50 rounded-md">
                  <User className="h-4 w-4 text-blue-400" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-400 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/login" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/register" ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  Register
                </Link>
              </>
            )}

            {/* Dark mode toggle in mobile menu */}
            {/* <button
              onClick={toggleDarkMode}
              className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-800"
            >
              {isDark ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span>Dark Mode</span>
                </>
              )}
            </button> */}
          </div>
        </div>
      )}
    </nav>
  )
}
