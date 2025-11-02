// components/auth/user-menu.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import Card from "@/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { useCard } from "@/contexts/data-context"
import { User, LogOut, Settings } from "lucide-react"

export function UserMenu() {
  const { session } = useCard()
  const { signOut, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")


  const handleSignOut = async () => {



    await signOut()
    setIsOpen(false)
  }

  const openLogin = () => {
    setAuthMode("login")
    setIsAuthModalOpen(true)
  }

  const openSignup = () => {
    setAuthMode("signup")
    setIsAuthModalOpen(true)
  }


  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <User className="h-4 w-4 text-white" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.user_metadata?.name || "User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email || "email"}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!session ?
            <>
              <DropdownMenuItem onClick={openLogin}
              >
                <Settings className="mr-2 h-4 w-4" />

                <span>Sign In</span>

              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}
              >
                <Settings className="mr-2 h-4 w-4" />

                <span>Sign up</span>

              </DropdownMenuItem>
            </>
            :

            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={loading}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{loading ? "Signing out..." : "Sign out"}</span>
              </DropdownMenuItem>

            </>

          }
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-3 sm:hidden">
            
            <span className="-ml-3">

              <Card />
            </span>
            <span>Card</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

        </DropdownMenuContent>
      </DropdownMenu>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </>
  )
}