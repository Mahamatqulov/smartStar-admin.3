"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AuthUser, LoginCredentials } from "@/services/auth-service"
import { AuthService } from "@/services/auth-service"
import { MockAuthService } from "@/services/mock-auth-service"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Determine which auth service to use
// Use mock service in development or if we're in the v0 preview
const isPreviewEnvironment =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("vercel.app") || process.env.NODE_ENV === "development")

// Select the appropriate auth service
const authService = isPreviewEnvironment ? MockAuthService : AuthService

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser()
          setUser(currentUser)
        }
      } catch (err) {
        console.error("Auth check error:", err)
        // If there's an error checking auth, log the user out
        authService.logout()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)

    try {
      console.log("AuthContext: Login attempt with credentials:", credentials.login)
      const loggedInUser = await authService.login(credentials)
      console.log("AuthContext: Login successful, user:", loggedInUser.login)
      setUser(loggedInUser)
      router.push("/") // Redirect to dashboard after login
    } catch (err) {
      console.error("AuthContext: Login error:", err)
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials and try again.")
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    console.log("AuthContext: Logging out user")
    authService.logout()
    setUser(null)
    router.push("/login")
  }

  // Clear error
  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
