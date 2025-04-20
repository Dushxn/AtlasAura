import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import { AuthProvider } from "./auth/AuthContext"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "./components/Navbar"
import LoadingSpinner from "./components/LoadingSpinner"
import ProtectedRoute from "./pages/ProtectedRoute"

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"))
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Register = lazy(() => import("./pages/Register"))
const CountryDetail = lazy(() => import("./pages/CountryDetail"))
const Favorites = lazy(() => import("./pages/Favourites"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-black">
              <LoadingSpinner size="large" message="Loading page..." />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                <>
                  <Navbar />
                  <div className="pt-16 min-h-screen bg-black">
                    <Login />
                  </div>
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Navbar />
                  <div className="pt-16 min-h-screen bg-black">
                    <Register />
                  </div>
                </>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-16 min-h-screen bg-black">
                    <Home />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/country/:code"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-16 min-h-screen bg-black">
                    <CountryDetail />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <div className="pt-16 min-h-screen bg-black">
                    <Favorites />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  )
}

export default App
