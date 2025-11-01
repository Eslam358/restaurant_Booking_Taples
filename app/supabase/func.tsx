"use client";
import { supabase } from "@/hooks/supabase/supabase-client";
import { useCard } from "@/contexts/data-context";
import { Delete } from "lucide-react";

export default function useAddToCard() {
  const { session, cart, setCart } = useCard();
  const addOrders = async (id_product: number) => {
    if (!session) return console.log("User not logged in");

    const card = cart[0]
    console.log(card, cart)
    //  return


    // لو مفيش row، نعمل واحد جديد
    if (!card) {

      const { data, error } = await supabase.from("card").insert({
        email: session.user.email,
        id_products: [{ [id_product]: 1 }],
      }).select("id_products").single();
      if (error) { return console.log(error) } else if (data) {
        setCart(data.id_products)
        return console.log(data);

      }

    } else {


      const cartProducts = card || {};
      const quantity = cartProducts[id_product] || 0;
      console.log(quantity)

      const updatedProducts = {
        ...cartProducts,
        [id_product]: quantity + 1,
      };
      console.log(updatedProducts)

      const { data, error } = await supabase
        .from("card")
        .update({ id_products: [updatedProducts] })
        .eq("email", session.user.email).select("id_products").single();
      if (error) return console.log("error update", error)
      if (data) {
        console.log(data)

        setCart(data.id_products)

        console.log("✅ Updated card", updatedProducts);
      }


    }






  };
  const removeOrders = async (id_product: number) => {
    if (!session) return console.log("User not logged in");

    const card = cart[0]
    console.log(card, cart)
    //  return


    // لو مفيش row، نعمل واحد جديد
  


      const cartProducts = card || {};
      const quantity = cartProducts[id_product] || 0;
      console.log(quantity)

      const updatedProducts = {
        ...cartProducts,
        [id_product]: quantity - 1,
      };
      console.log(updatedProducts)

      const { data, error } = await supabase
        .from("card")
        .update({ id_products: [updatedProducts] })
        .eq("email", session.user.email).select("id_products").single();
      if (error) return console.log("error update", error)
      if (data) {
        console.log(data)

        setCart(data.id_products)

        console.log("✅ Updated card", updatedProducts);
      


    }






  };
  const removeOrder = async (id_product: number) => {
    if (!session) return console.log("User not logged in");

    const card = cart[0]
    console.log(card, cart)

  


      const cartProducts = card || {};
      const quantity = delete cartProducts[id_product];
      console.log("quantity...........",quantity)
      console.log("quantity...........",cartProducts)
      const updatedProducts = cartProducts
       
    
      console.log(updatedProducts)

      const { data, error } = await supabase
        .from("card")
        .update({ id_products: [updatedProducts] })
        .eq("email", session.user.email).select("id_products").single();
      if (error) return console.log("error update", error)
      if (data) {
        console.log(data)

        setCart(data.id_products)

        console.log("✅ Updated card", updatedProducts);
      


    }






  };

  return {addOrders, removeOrders, removeOrder};
}
