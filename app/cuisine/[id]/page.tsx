"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import AddToCard from "@/app/supabase/func"
import { useProducts } from "@/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProductDetails() {

  const { id } = useParams()
  const router = useRouter()
  const { featuredProducts, pizzas } = useProducts()

  const allProducts = [...featuredProducts, ...pizzas]
  const product = allProducts.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }
  const {addOrders} = AddToCard()


  return (
    <section className="relative min-h-[calc(100vh_-_50px)] mt-10 flex flex-col items-center justify-center bg-background/50 text-foreground px-4 py-16">
     
      <div className="absolute inset-0 -z-10 ">
        <Image
          src={product.img}
          alt={product.title}
          fill
          className="object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/95" />
      </div>

    
    
      <Card className="relative z-10 h-4/5 max-w-4xl w-full mx-auto overflow-hidden bg-background/70 backdrop-blur-md border border-border rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row">
       
          <div className="relative w-full md:w-1/2  overflow-hidden 
          h-auto">
        
            <Image
            width={500} 
      height={500}
              src={product.img}
              alt={product.title}
              className="object-cover m-auto"
            />
          </div>

          <CardContent className="flex flex-col justify-center p-6 space-y-4 md:w-1/2">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-muted-foreground">{product.desc}</p>
            <p className="text-xl font-semibold">${product.price}</p>

            <div>
              <h4 className="font-semibold mb-2">Choose size:</h4>
              <div className="flex gap-2">
                {product.options?.map((opt) => (
                  <Button
                    key={opt.title}
                    variant="outline"
                    className="rounded-full"
                  >
                    {opt.title}
                  </Button>
                ))}
              </div>
            </div>

           
            
             <Button size="lg" className=" cursor-pointer" onClick={()=>addOrders(product.id)}  >
              Add to Cart
            </Button>
          
            {/* <AddToCard id_product={product.id}/>  */}
           
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-muted-foreground"
            >
              ← Back
            </Button>
          </CardContent>
        </div>
      </Card>
    </section>
  )
}
