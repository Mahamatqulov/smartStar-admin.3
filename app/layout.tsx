import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { AuthProvider } from "@/contexts/auth-context"

export const metadata: Metadata = {
  title: "SmartStar",
  description: "Admin panel for SmartStar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'