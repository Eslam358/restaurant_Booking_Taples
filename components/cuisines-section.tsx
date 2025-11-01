"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"

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

export function CuisinesSection() {
  const { t } = useApp()

  return (
    <section id="menu" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t("cuisinesTitle")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t("cuisinesSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cuisines.map((cuisine) => (
            <Card key={cuisine.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={cuisine.image || "/placeholder.svg"}
                  alt={t(cuisine.id as any)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2">{t(cuisine.id as any)}</h3>
                <p className="text-muted-foreground text-pretty">{t(`${cuisine.id}Desc` as any)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
