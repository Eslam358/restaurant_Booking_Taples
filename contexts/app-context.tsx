"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations, type TranslationKey } from "@/lib/translations"

type Theme = "light" | "dark"

interface AppContextType {
  theme: Theme
  language: Language
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  // const [theme, setTheme] = useState<Theme>("light")
  // const [language, setLanguage] = useState<Language>("en")
  const [theme, setTheme] = useState<Theme>(() => (typeof window !== "undefined" ? (localStorage.getItem("theme") as Theme) || "light" : "light"))

const [language, setLanguage] = useState<Language>(() => (typeof window !== "undefined" ? (localStorage.getItem("lang") as Language) || "en" : "en"))

useEffect(() => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  localStorage.setItem("theme", theme);
}, [theme]);

useEffect(() => {
  const root = document.documentElement;
  root.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
  root.setAttribute("lang", language);
  localStorage.setItem("lang", language);
}, [language]);


 



  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key
  }

  return <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within AppProvider")
  }
  return context
}
