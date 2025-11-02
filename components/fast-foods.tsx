"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import { useApp } from "@/contexts/app-context"
import { useProducts } from "@/data"
const cuisines = [
    {
        id: "mediterranean",
        image: "/mediterranean-cuisine-platter.jpg",
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
]

export function FastFood() {
    const { t, language: lang } = useApp()

    return (
        <section id="menu" className="py-24 bg-muted/70">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("cuisinesTitle")}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("cuisinesSubtitle")}</p>
                </div>

                <div className="overflow-hidden px-0 md:px-9">
                    <Carousel
                        key={lang}
                        opts={{
                            align: "start",
                            loop: true,
                            direction: lang === "ar" ? "rtl" : "ltr",
                        }}
                        plugins={[
                            Autoplay({ delay: 3000, stopOnInteraction: true })

                        ]}
                        className="w-full  "
                    >
                        <CarouselContent>
                            {cuisines.map((cuisine) => (
                                <CarouselItem key={cuisine.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">

                                        <Card className="overflow-hidden group cursor-pointer max-w-md mx-auto hover:shadow-lg transition-shadow">
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={cuisine.image || "/placeholder.svg"}
                                                    alt={t(cuisine.id as any)}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <CardContent className="p-6">
                                                <h3 className="text-2xl font-bold mb-2 line-clamp-1">{t(cuisine.id as any)}</h3>
                                                <p className="text-muted-foreground text-pretty line-clamp-2">{t(`${cuisine.id}Desc` as any)}</p>
                                            </CardContent>
                                        </Card>

                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="-left-9" />
                        <CarouselNext  className="-right-9" />
                    </Carousel>

                </div>
            </div>
        </section>
    )
}

