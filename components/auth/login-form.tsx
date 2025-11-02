// components/auth/login-form.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

interface LoginFormProps {
  onToggleMode: () => void
  onClose?: () => void
}

export function LoginForm({ onToggleMode, onClose }: LoginFormProps) {
  const { signIn, loading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn(formData)

    if (result.success && onClose) {
      onClose()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value="eslam900aa@gmail.com"
                // value={formData.email}

                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value="Eslam@51234"
                placeholder="Enter your password"
                // value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex gap-2 items-center">
                <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-150"></div>
                <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-300"></div>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onToggleMode}
            className="text-sm text-blue-600 hover:underline"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  )
}