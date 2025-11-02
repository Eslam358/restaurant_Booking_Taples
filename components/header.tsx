"use client"

import { Moon, Sun, Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useApp } from "@/contexts/app-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import Card from "@/components/card"
import { useEffect, useState } from "react"
import { useCard } from "@/contexts/data-context";
import { AuthButtons } from "./auth/auth-buttons"

const menuItems: Array<"home" | "menu" | "about" | "contact"> = [
  "home",
  "menu",
  "about",
  "contact",

];


type MenuItem = "home" | "menu" | "about" | "contact";
export function Header() {
  const { theme, language, toggleTheme, setLanguage, t } = useApp()



  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1  sm:gap-2  md:gap-8">
          <div className="md:hidden">
            <DropdownMenu dir={language === "ar" ? "rtl" : "ltr"}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="h-10 w-10  sm:h-12 sm:w-12 flex items-center justify-center rounded-md hover:bg-accent"
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

        <div className="flex items-center gap-0  sm:gap-2">
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
          <span className="hidden sm:block">

            <Card />
          </span>

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
