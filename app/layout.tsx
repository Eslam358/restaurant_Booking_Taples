import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AppProvider } from "@/contexts/app-context"
import { CardProvider } from "@/contexts/data-context"
import { Suspense } from "react"
import "./globals.css"
import { Header } from "@/components/header"
import  {Loading}  from "@/components/loading-screen"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"



export const metadata: Metadata = {
  title: "Islam Restaurant ",
  description: "Experience authentic flavors and exceptional dining",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<Loading/>}>
          <AppProvider>
          <CardProvider>
          <Header />
          <div className="h-16"/>
            {children}
            <Footer />
            <Toaster />
            </CardProvider>
            </AppProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
