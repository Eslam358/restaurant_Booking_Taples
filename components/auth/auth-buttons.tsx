// components/auth/auth-buttons.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import { UserMenu } from "./user-menu"
import { useCard } from "@/contexts/data-context"

export function AuthButtons() {
  const { session } = useCard()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")

  const openLogin = () => {
    setAuthMode("login")
    setIsAuthModalOpen(true)
  }

  const openSignup = () => {
    setAuthMode("signup")
    setIsAuthModalOpen(true)
  }
  return <UserMenu />

  // if (session) {
  // }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={openLogin} size="sm">
          Sign In
        </Button>
        <Button onClick={openSignup} size="sm">
          Sign Up
        </Button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  )
}