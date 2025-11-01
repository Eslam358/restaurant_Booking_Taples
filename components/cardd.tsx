"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
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
import AddToCard from "@/app/supabase/func"



  type CardProps = {
    id: number;
    title: string;
    desc: string;
    img: string;
    price: number;
    options: {
        title: string;
        additionalPrice: number;
    }[];
}[]



export default function cardProps({cardProps, title,desc}: {cardProps: CardProps, title: string, desc: string}) {
    const { language: lang, t } = useApp()
    const {addOrders} = AddToCard()

    return (
        <section id="menu" className="py-24 bg-muted/70">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{title}</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{desc}</p>
                </div>

                <div>

                    <Carousel
                        key={lang}
                        opts={{
                            align: "center",
                            loop: true,
                            direction: lang === "ar" ? "rtl" : "ltr",
                        }}
                        plugins={[
                            Autoplay({ delay: 30000, stopOnInteraction: true })

                        ]}
                        className="w-full "
                    >
                        <CarouselContent>
                            {cardProps.map((cuisine) => (

                                <CarouselItem key={cuisine.id} className="basis-full  md:basis-1/2 lg:basis-1/3">
                                    <Card className="overflow-hidden relative h-[500px] max-w-[400px] m-auto group cursor-pointer hover:shadow-lg transition-shadow py-0">
                                        <div className="p-1">
                                            <Link href={{
                                                pathname: `/cuisine/${cuisine.id}`,

                                            }}>
                                                <div className="relative flex justify-center items-center   overflow-hidden h-70  ">

                                                    <Image
                                                        width={300}
                                                        height={300}
                                                        src={cuisine.img || "/placeholder.svg"}
                                                        alt={cuisine.title}
                                                        className=" w-[250px] object-cover   group-hover:rotate-180  transition-transform duration-300"
                                                    />
                                                </div>
                                            </Link>
                                            <CardContent className="p-6 pt-0  overflow-hidden ">
                                                <h3 className="text-2xl font-bold mb-2 line-clamp-1">{cuisine.title}</h3>
                                                <h1>{cuisine.id}</h1>
                                                <p className="text-muted-foreground text-pretty line-clamp-3 h-[72px]">{cuisine.desc}</p>
                                                <Button onClick={()=>addOrders(cuisine.id)}  size="lg" className=" mt-6 mx-auto w-full ">
                                                    Add to Cart
                                                </Button>
                                            </CardContent>
                                        </div>
                                    </Card>
                                </CarouselItem>

                            ))}

                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>


                </div>
            </div>
        </section >
    )
}
