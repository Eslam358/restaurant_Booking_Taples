"use client"

import { Moon, Sun, Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/app-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCard } from "@/contexts/data-context";
import { AuthButtons } from "./auth/auth-buttons"

const menuItems: Array<"home" | "menu" | "about" | "contact"> = [
  "home",
  "menu",
  "about",
  "contact",
];

type CartItem = { [productId: string]: number }[];

type MenuItem = "home" | "menu" | "about" | "contact";
export function Header() {
  const { theme, language, toggleTheme, setLanguage, t } = useApp()

  const { cart: card } = useCard();
  const [cart, setCart] = useState<CartItem>(card)
  const cartProducts = cart[0] || {};        // { "1": 2, "4": 1 ... }
  const cartIds = Object.keys(cartProducts).length;
  useEffect(() => {
    setCart(card)
  }, [card])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2  md:gap-8">
          <div className="md:hidden">
            <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="h-12 w-12 flex items-center justify-center rounded-md hover:bg-accent"
                >
                  <Menu className="!h-6 !w-6" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align={language === "ar" ? "end" : "start"}
                className="!bg-background/80 backdrop-blur-lg w-[calc(100vw-1rem)] rounded-2xl shadow-lg border border-white/20"
              >
                {menuItems.map((item: MenuItem) => (
                  <DropdownMenuItem key={item}>
                    <a
                      href={`#${item}`}
                      className="block w-full  text-lg font-medium  transition-colors"
                    >
                      {t(item)}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            <Link href="/" >
              Savoria
            </Link>
          </h1>
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item: MenuItem) => (
              <a href={`#${item}`} key={item} className="text-sm font-medium hover:text-primary transition-colors">{t(item)}</a>
            ))}

          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-accent"
              >
                <Globe className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English {language === "en" && "✓"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية {language === "ar" && "✓"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Link
            href="/cart"
            className="relative  p-2 "
          >
            <span className="text-xl hover:bg-accent  rounded-md  'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 text-white  p-2">🛒</span>

            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartIds || 0}
            </span>
          </Link>

          <AuthButtons />
          {/* Book Table Button */}
          <Button asChild className="hidden sm:inline-fle">
            <a href="#booking">{t("bookTable")}</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
