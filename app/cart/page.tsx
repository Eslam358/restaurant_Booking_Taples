"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/contexts/app-context"
import { useProducts } from "@/data"
import { useCard } from "@/contexts/data-context";
import AddToCard from "@/app/supabase/func"

// type CartItem = {
//   id: string
//   name: string
//   image: string
//   price: number
//   quantity: number

// }

type CartItem = {
  id: number;
  title: string;
  desc: string;
  img: string;
  price: number;
  quantity: number;
  options: {
    title: string;
    additionalPrice: number;
  }[];
}[]

// export const products: CartItem[] = [
//     {
//       id: "1",
//       name: "Grilled Salmon",
//       image: "/fresh-seafood-platter.jpg",
//       price: 180,
//       quantity: 1,
//     },
//     {
//       id: "2",
//       name: "Italian Pasta",
//       image: "/italian-pasta-pizza.png",
//       price: 120,
//       quantity: 1,
//     },
//     {
//       id: "3",
//       name: "Asian Noodles",
//       image: "/asian-fusion-dishes.jpg",
//       price: 95,
//       quantity: 1,
//     },
//     {
//       id: "4",
//       name: "Mediterranean Platter",
//       image: "/mediterranean-cuisine-platter.jpg",
//       price: 160,
//       quantity: 1,
//     },
//     {
//       id: "5",
//       name: "Steak Plate",
//       image: "/luks-restoran-tasarimlari.jpg",
//       price: 200,
//       quantity: 1,
//     },
//   ]


export default function CartPage() {
  const { featuredProducts, pizzas } = useProducts()
  const { cart: card } = useCard();
  const { addOrders, removeOrders, removeOrder } = AddToCard()
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");



  const cartProducts = card[0] || {};        // { "1": 2, "4": 1 ... }
  const cartIds = Object.keys(cartProducts); // ["1","4"]

  const allProducts = [...featuredProducts, ...pizzas];


  const cartList = allProducts
    .filter(p => cartIds.includes(String(p.id)))
    .map(p => ({
      ...p,
      quantity: cartProducts[p.id] || 0
    }));


  const [cart, setCart] = useState<CartItem>(cartList)
  const { t, language } = useApp()
  useEffect(() => {

    setCart(cartList)

  }, [card,language]);



  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <section
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-background  py-10 px-6"
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🛒 {t("cart") || "Cart"}
        </h1>

        {cart.length === 0 ? (
          <>
          <h2 className="text-9xl  my-30 text-center -rotate-50">
          🛒
          </h2>
          <p className="text-center text-muted-foreground text-lg">
            {t("emptyCart") || "Your cart is empty."}
          </p>
          </>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cart.map((item, id) => (
              <Card key={id} className="overflow-hidden px-1">
                <img
                  src={item.img}
                  alt={item.img}
                  className="w-86 h-full object-cover m-auto"
                />
                <CardContent className="p-4 space-y-3">
                  <h2 className="text-xl font-semibold">{t(item.title)}</h2>
                  <p className="text-muted-foreground">
                    {t("price") || "Price"}: ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 `}>
                      <Button
                        variant="outline"
                        className={`${item.quantity === 1?'cursor-no-drop':'cursor-pointer'}`}
                        size="icon"
                        disabled={item.quantity == 1}
                        onClick={() => removeOrders(item.id)}
                      >
                        -
                      </Button>
                      <span className="text-lg font-medium">
                        {item.quantity}

                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => addOrders(item.id)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                    className="cursor-pointer"
                      variant="destructive"
                      onClick={() => removeOrder(item.id)}
                    >
                      {t("remove") || "Remove"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">

              {t("total") || "Total"}: ${total.toFixed(2)}
            </h2>
            <Button size="lg" className="rounded-2xl text-lg px-8">
              {t("checkout") || "Checkout"}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
