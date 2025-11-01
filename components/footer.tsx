"use client"

import { Facebook, Instagram, Twitter } from "lucide-react"
import { useApp } from "@/contexts/app-context"

export function Footer() {
  const { t } = useApp()

  return (
    <footer className="bg-muted/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Savoria</h3>
            <p className="text-muted-foreground text-sm">{t("heroSubtitle")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("openingHours")}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t("monFri")}</p>
              <p>{t("satSun")}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("followUs")}</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Savoria Restaurant. {t("rights")}.</p>
        </div>
      </div>
    </footer>
  )
}
