"use client"
import { HeroSection } from "@/components/hero-section"
import { CuisinesSection } from "@/components/cuisines-section"
import { FastFood } from "@/components/fast-foods"
import  BookingSection  from "@/components/booking-section"
import { useApp } from "@/contexts/app-context"
import CardProps from "@/components/cardd"
import { useProducts } from "@/data"




export default function Home() {
  const { pizzas, featuredProducts } = useProducts()

  const { language: lang , t} = useApp()

  return (
    <main className="min-h-screen">
      <HeroSection />
      <CuisinesSection />
 
      <CardProps cardProps={pizzas} title={t("pizzasTitle")}
        desc={t("pizzasDesc")} />

      <CardProps cardProps={featuredProducts } title={t("pizzasTitle")}
        desc={t("pizzasDesc")} />
    
      <FastFood />
      <BookingSection />

    </main>
  )
}
