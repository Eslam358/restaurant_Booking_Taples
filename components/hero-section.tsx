"use client"

import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/app-context"
// *******************
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useEffect } from "react"
const cuisines = [
  {
    id: "mediterranean",
    image: "/mediterranean-cuisine-platter.jpg",
  },
  {
    id: "mediter",
    image: "/luks-restoran-tasarimlari.jpg",
  },
  {
    id: "asian",
    image: "/asian-fusion-dishes.jpg",
  },
  {
    id: "italian",
    image: "/italian-pasta-pizza.png",
  },
  {
    id: "seafood",
    image: "/fresh-seafood-platter.jpg",
  },
  {
    id: "Restaurant",
    image: "/elegant-restaurant-interior.png",
  },
]
// *******************
export function HeroSection() {

  const { t, language } = useApp()
  useEffect(() => {

    console.log("hhhhhhhhhhhh", language);

  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {/* //************ */}
      <Carousel
        key={language}
        opts={{
          align: "start",
          loop: true,
          direction: language === "ar" ? "rtl" : "ltr",
        }}
        // plugins={[Autoplay({ delay: 3000 })]}
        className="w-full h-full min-h-screen overflow-hidden absolute inset-0 z-0  "
      >
        <CarouselContent className="absolute inset-0 z-0  h-full !transform-none">
          {cuisines.map((cuisine) => (
            <CarouselItem
              key={cuisine.id}
              className="!p-0 !m-0 w-full h-full flex-shrink-0 basis-full"
            >
              <img
                src={cuisine.image}
                alt="Restaurant interior"
                className="w-full h-full object-cover block"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </Carousel>








      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-6 text-balance">{t("heroTitle")}</h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          {t("heroSubtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="#booking">{t("bookTable")}</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#menu">{t("menu")}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
