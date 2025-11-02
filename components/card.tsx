import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { useCard } from "@/contexts/data-context";
type CartItem = { [productId: string]: number }[];

export default function card() {


    const { cart: card } = useCard();
    const [cart, setCart] = useState<CartItem>(card)
    const cartProducts = cart[0] || {};        // { "1": 2, "4": 1 ... }
    const cartIds = Object.keys(cartProducts).length;
    useEffect(() => {
      setCart(card)
    }, [card])

  return (
    <div>
            <Link
            href="/cart"
            className="relative  p-2 "
          >
            <span className="text-xl hover:bg-accent  rounded-md  'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-white  p-2">🛒</span>

            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartIds || 0}
            </span>
          </Link>
    </div>
  )
}
