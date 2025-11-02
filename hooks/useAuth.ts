// hooks/useAuth.ts
"use client"

import { useState } from "react"
import { supabase } from "@/hooks/supabase/supabase-client"
import { toast } from "@/hooks/use-toast"
import { AuthFormData, AuthResponse } from "@/types/auth"

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)




  const signUp = async (formData: AuthFormData): Promise<AuthResponse> => {


    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            img_url: "imageUrl" 
          },
        },
      })



      if (error) throw error

      toast({
        title: "✅ Success",
        description: "Account created successfully! Please check your email for verification.",
      })

      return { success: true, message: "Account created successfully!" }
    } catch (error: any) {
      console.error("Signup error:", error)
      
      let errorMessage = "Failed to create account. Please try again."
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please sign in instead."
      } else if (error.message.includes("password")) {
        errorMessage = "Password should be at least 6 characters long."
      }

      toast({
        title: "❌ Error",
        description: errorMessage,
      })

      return { success: false, message: errorMessage, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (formData: AuthFormData): Promise<AuthResponse> => {
    try {
      setLoading(true)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      toast({
        title: "✅ Welcome back!",
        description: "You have successfully signed in.",
      })

      return { success: true, message: "Signed in successfully!" }
    } catch (error: any) {
      console.error("Signin error:", error)
      
      let errorMessage = "Failed to sign in. Please try again."
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please try again."
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email address before signing in."
      }

      toast({
        title: "❌ Error",
        description: errorMessage,
      })

      return { success: false, message: errorMessage, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async (): Promise<AuthResponse> => {
    try {
      setLoading(true)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error

      toast({
        title: "👋 Signed out",
        description: "You have been successfully signed out.",
      })

      return { success: true, message: "Signed out successfully!" }
    } catch (error: any) {
      console.error("Signout error:", error)
      
      toast({
        title: "❌ Error",
        description: "Failed to sign out. Please try again.",
      })

      return { success: false, message: "Failed to sign out.", error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string): Promise<AuthResponse> => {
    try {
      setLoading(true)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      toast({
        title: "📧 Check your email",
        description: "Password reset instructions have been sent to your email.",
      })

      return { success: true, message: "Password reset email sent!" }
    } catch (error: any) {
      console.error("Reset password error:", error)
      
      toast({
        title: "❌ Error",
        description: "Failed to send reset email. Please try again.",
      })

      return { success: false, message: "Failed to send reset email.", error: error.message }
    } finally {
      setLoading(false)
    }
  }

  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
    loading,
    user,
  }
}