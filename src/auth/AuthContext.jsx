"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null)
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || [])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const userExists = users.some((user) => user.username === username || user.email === email)
    if (userExists) throw new Error("Username or email already exists")

    const newUser = { username, email, password, createdAt: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    return login(username, password)
  }

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    const foundUser = users.find((user) => user.username === username && user.password === password)
    if (!foundUser) throw new Error("Invalid username or password")

    const userData = { username: foundUser.username, email: foundUser.email, createdAt: foundUser.createdAt }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addToFavorites = (country) => {
    const updatedFavorites = [...favorites, country]
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const removeFromFavorites = (countryCode) => {
    const updatedFavorites = favorites.filter((country) => country.cca3 !== countryCode)
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  }

  const isFavorite = (countryCode) => favorites.some((country) => country.cca3 === countryCode)

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isLoading,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)
