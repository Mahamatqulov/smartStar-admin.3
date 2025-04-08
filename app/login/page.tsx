"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { AlertCircle, Eye, EyeOff, Lock, User, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { login, loading, error, clearError, user } = useAuth();
  const router = useRouter();

  // Check if we're in the preview environment
  useEffect(() => {
    const checkPreview = () => {
      const isPreviewEnv =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("vercel.app") ||
          process.env.NODE_ENV === "development");

      setIsPreview(isPreviewEnv);

      // Set default credentials in preview mode
      if (isPreviewEnv) {
        setUsername("admin");
        setPassword("admin123");
      }
    };

    checkPreview();
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Load remembered username
  useEffect(() => {
    const rememberedUsername = localStorage.getItem("remembered_username");
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setLoginAttempted(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      return;
    }

    try {
      console.log("LoginPage: Submitting login with username:", username);
      await login({ login: username, password });

      // Store username in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem("remembered_username", username);
      } else {
        localStorage.removeItem("remembered_username");
      }
    } catch (err) {
      console.error("LoginPage: Login submission error:", err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900">
            SmartStar
          </h1>
          <h2 className="mt-6 text-center text-xl font-medium text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded"
            onClick={clearError}
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-red-700 font-medium">Login failed</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className={`appearance-none block w-full pl-10 pr-3 py-2.5 border ${
                    loginAttempted && !username.trim()
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm`}
                  placeholder="Enter your username"
                  // value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
              {loginAttempted && !username.trim() && (
                <p className="mt-1 text-xs text-red-500">
                  Username is required
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`appearance-none block w-full pl-10 pr-10 py-2.5 border ${
                    loginAttempted && !password.trim()
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-sm`}
                  placeholder="Enter your password"
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={togglePasswordVisibility}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {loginAttempted && !password.trim() && (
                <p className="mt-1 text-xs text-red-500">
                  Password is required
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? (
                <>
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="animate-spin h-5 w-5 text-green-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
        {/* 
        {isPreview && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Available test accounts:</p>
            <p className="mt-1">
              <strong>Username:</strong> admin, <strong>Password:</strong> admin123
            </p>
            <p className="mt-1">
              <strong>Username:</strong> moderator, <strong>Password:</strong> mod123
            </p>
            <p className="mt-1">
              <strong>Username:</strong> user, <strong>Password:</strong> user123
            </p>
          </div>
      )} */}
      </div>
    </div>
  );
}
