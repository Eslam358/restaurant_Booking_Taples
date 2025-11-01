"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/hooks/supabase/supabase-client";

type CartItem = { [productId: string]: number };

interface CardContextType {
  session: any;
  cart: CartItem[];
  fetchCart: () => any;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) =>
      setSession(session)
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchCart = async () => {
    if (!session?.user?.email) return;

    const { data, error } = await supabase
      .from("card")
      .select("id_products")
      .eq("email", session.user.email)
      .single();

    if (!data || error) {
      console.log("No cart yet");
      setCart([]);
      return;
    }

    setCart(data.id_products);
    return { data, error }
  };

  useEffect(() => {
    if (session) fetchCart(); // ✅ استنى السيشن الأول
  }, [session]);
console.log(cart);

  return (
    <CardContext.Provider value={{ session, cart, fetchCart, setCart }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCard() {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCard must be used inside CardProvider");
  return context;
}
