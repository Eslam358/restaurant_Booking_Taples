// components/auth/auth-modal.tsx
"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { LoginForm } from "./login-form"
import { SignupForm } from "./signup-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, defaultMode = "signup" }: AuthModalProps) {
  
  const [mode, setMode] = useState<"login" | "signup">(defaultMode)
  useEffect(() => {
    setMode(defaultMode)
  
  }, [defaultMode]);
  console.log(mode,"..................",defaultMode)

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 bg-transparent border-none">
        {mode === "login" ? (
          <LoginForm onToggleMode={toggleMode} onClose={onClose} />
        ) : (
          <SignupForm onToggleMode={toggleMode} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  )
}