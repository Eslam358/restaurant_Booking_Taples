// types/auth.ts
export interface AuthFormData {
    email: string
    password: string
    name?: string
    img_file?:File
  }
  
  export interface AuthResponse {
    success: boolean
    message: string
    error?: string
  }