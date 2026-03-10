import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { DiagnosticProvider } from "./diagnostic-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Quiet Ground Diagnostic",
  description: "Operational intelligence diagnostic for founder-led teams",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <DiagnosticProvider>{children}</DiagnosticProvider>
      </body>
    </html>
  )
}
