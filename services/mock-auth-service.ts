import type { AuthUser, LoginCredentials } from "./auth-service";

// Mock users for testing
const MOCK_USERS = [
  {
    id: "1",
    login: "administrator",
    name: "Admin User",
    role: "admin",
    password: "admin123",
  },
];

// Create a memory store for auth in case localStorage is not available
let memoryToken: string | null = null;
let memoryUser: AuthUser | null = null;

export const MockAuthService = {
  // Login function
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    console.log(
      "MockAuthService: Login attempt with credentials:",
      credentials.login
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user - make the comparison case-insensitive for better user experience
    const user = MOCK_USERS.find(
      (u) =>
        u.login.toLowerCase() === credentials.login.toLowerCase() &&
        u.password === credentials.password
    );

    if (!user) {
      console.error("MockAuthService: Login failed - Invalid credentials");
      throw new Error("Invalid username or password");
    }

    console.log("MockAuthService: Login successful for user:", user.login);

    // Create mock token
    const token = `mock-token-${user.id}-${Date.now()}`;

    // Create user object
    const authUser: AuthUser = {
      id: user.id,
      login: user.login,
      name: user.name,
      role: user.role,
      token,
    };

    // Store in memory
    memoryToken = token;
    memoryUser = authUser;

    // Try to store in localStorage if available
    this.setToken(token);
    this.setUser(authUser);

    return authUser;
  },

  // Logout function
  logout(): void {
    console.log("MockAuthService: Logging out user");
    memoryToken = null;
    memoryUser = null;
    this.removeToken();
    this.removeUser();

    // Also clear cookies for middleware
    if (typeof document !== "undefined") {
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    // First check memory
    if (memoryToken) {
      return true;
    }

    // Then try localStorage
    return !!this.getToken();
  },

  // Get current user
  getCurrentUser(): AuthUser | null {
    // First check memory
    if (memoryUser) {
      return memoryUser;
    }

    // Then try localStorage
    try {
      const userJson =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_user")
          : null;
      if (!userJson) return null;
      const user = JSON.parse(userJson);
      memoryUser = user; // Update memory cache
      return user;
    } catch (e) {
      console.warn("MockAuthService: Could not read user from localStorage", e);
      return null;
    }
  },

  // Get auth token
  getToken(): string | null {
    return (
      memoryToken ||
      (typeof window !== "undefined"
        ? localStorage.getItem("auth_token")
        : null)
    );
  },

  // Set auth token
  setToken(token: string): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);

        // Also set cookie for middleware
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7); // 7 days expiry
        document.cookie = `auth_token=${token}; path=/; expires=${expiryDate.toUTCString()}`;
      }
    } catch (e) {
      console.warn("MockAuthService: Could not store token in localStorage", e);
    }
  },

  // Remove auth token
  removeToken(): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
    } catch (e) {
      console.warn(
        "MockAuthService: Could not remove token from localStorage",
        e
      );
    }
  },

  // Set user
  setUser(user: AuthUser): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_user", JSON.stringify(user));
      }
    } catch (e) {
      console.warn("MockAuthService: Could not store user in localStorage", e);
    }
  },

  // Remove user
  removeUser(): void {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_user");
      }
    } catch (e) {
      console.warn(
        "MockAuthService: Could not remove user from localStorage",
        e
      );
    }
  },

  // For testing purposes - allow direct setting of the user
  setTestUser(user: AuthUser): void {
    memoryUser = user;
    memoryToken = user.token;
    this.setToken(user.token);
    this.setUser(user);
  },
};
