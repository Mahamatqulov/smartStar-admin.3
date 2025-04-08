import { AuthService } from "@/services/auth-service"

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  body?: any
  headers?: Record<string, string>
}

// Fix the API_URL - it was pointing directly to the login endpoint
const API_URL = "http://3.76.98.221:4000/api"

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  try {
    const token = AuthService.getToken()

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    // Add auth token if available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const config: RequestInit = {
      method: options.method || "GET",
      headers,
      mode: "cors",
      credentials: "include",
    }

    // Add body if provided
    if (options.body) {
      config.body = JSON.stringify(options.body)
    }

    console.log(`Making API request to: ${API_URL}${endpoint}`, { method: config.method })
    const response = await fetch(`${API_URL}${endpoint}`, config)

    // Handle unauthorized errors (expired token, etc.)
    if (response.status === 401) {
      AuthService.logout()
      window.location.href = "/login"
      throw new Error("Session expired. Please login again.")
    }

    // Handle other errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    // Return successful response
    return response.json()
  } catch (error) {
    console.error("API request failed:", error)
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("Unable to connect to the server. Please check your internet connection or try again later.")
    }
    throw error
  }
}
