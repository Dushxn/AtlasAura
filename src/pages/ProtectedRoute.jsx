"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import LoadingSpinner from "../components/LoadingSpinner"

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <LoadingSpinner size="large" message="Checking authentication..." />
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}
