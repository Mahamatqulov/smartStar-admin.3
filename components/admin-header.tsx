"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  HelpCircle,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Toaster, toast } from "sonner";

interface AdminHeaderProps {
  title: string;
}

export default function AdminHeader({ title }: AdminHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout with confirmation
  // const handleLogout = async () => {
  //   if (window.confirm("Are you sure you want to sign out?")) {
  //     setIsLoggingOut(true);
  //     try {
  //       await logout();
  //     } finally {
  //       setIsLoggingOut(false);
  //     }
  //   }
  // };

  const handleLogout = async () => {
    if (toast.warning("Are you sure you want to sign out?")) {
      setIsLoggingOut(true);
      try {
        await logout();
        toast.success("You have been logged out successfully");
      } catch (error) {
        toast.error("Logout failed");
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Toaster />
      <h1 className="text-xl font-bold">{title}</h1>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            className="relative p-2 rounded-full hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-gray-50 border-b cursor-pointer">
                  <p className="text-sm">New project submitted for review</p>
                  <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 border-b cursor-pointer">
                  <p className="text-sm">Funding goal reached for Project X</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm">
                    New user registration spike detected
                  </p>
                  <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                </div>
              </div>
              <div className="p-2 text-center border-t">
                <button className="text-sm text-green-600 hover:text-green-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5 text-gray-600" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-expanded={showUserMenu}
          >
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <span className="hidden md:block">
              {user?.name || "Admin User"}
            </span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">{user?.name || "Admin User"}</p>
                  <p className="text-xs text-gray-500">
                    Username: {user?.login}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Role: {user?.role || "Admin"}
                  </p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </button>
                <div className="border-t my-1">
                  {" "}
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-red-600"
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
                        Signing out...
                      </>
                    ) : (
                      <>
                        {" "}
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
