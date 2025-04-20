"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password) return setError("Username and password are required")
    setIsLoading(true)
    setError("")
    try {
      await login(username, password)
      navigate("/explore")
    } catch (err) {
      console.error("Login error:", err)
      setError(err.message || "Login failed.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md animate-fade-in">
      <div className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-lg p-6 md:p-8">
        <div className="relative text-center mb-6">
          <LogIn className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="text-2xl font-bold mt-4 text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to continue</p>
        </div>

        {error && <div className="bg-red-900/20 text-red-400 p-3 rounded-md mb-4 text-sm border border-red-800/50">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" className="w-full px-4 py-2 rounded-md bg-white/10 border border-gray-700 text-white" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />

          <div className="relative">
            <input type={showPassword ? "text" : "password"} className="w-full px-4 py-2 pr-10 rounded-md bg-white/10 border border-gray-700 text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white font-medium">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}
