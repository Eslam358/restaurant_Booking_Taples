// useBooking.ts (Hook)
"use client"

import { useState } from "react"
import { supabase } from "@/hooks/supabase/supabase-client"
import { toast } from "@/hooks/use-toast"
import { useCard } from "@/contexts/data-context";

export interface BookingData {
  id?: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  requests?: string
  created_at?: string
}

export function useBooking() {
  const { session } = useCard();
  const [loading, setLoading] = useState(false)
  const [data_Booking, setData_Booking] = useState<BookingData[]>([])
  const [currentBooking, setCurrentBooking] = useState<BookingData | null>(null)

  // جلب جميع الحجوزات
  const getAllBookings = async () => {
    if (!session) {
      toast({ title: "❌ Error", description: "Something went wrong. User not logged in." })
      return []
    }
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("booking")
        .select("*")
        .eq("email", session.user.email)
        .order("created_at", { ascending: false })

      if (error) throw error
      
      setData_Booking(data || [])
      return data || []
      
    } catch (error) {
      console.error("Error fetching bookings:", error)
      toast({ title: "❌ Error", description: "Failed to load bookings." })
      return []
    } finally {
      setLoading(false)
    }
  }

  // جلب حجز محدد
  const getBookingById = async (id: string) => {
    if (!session) {
      toast({ title: "❌ Error", description: "User not logged in." })
      return null
    }
    
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("booking")
        .select("*")
        .eq("id", id)
        .eq("email", session.user.email)
        .single()

      if (error) throw error
      
      setCurrentBooking(data)
      return data
      
    } catch (error) {
      console.error("Error fetching booking:", error)
      toast({ title: "❌ Error", description: "Failed to load booking details." })
      return null
    } finally {
      setLoading(false)
    }
  }

  // إضافة حجز جديد
  const addBooking = async (data: BookingData) => {
    if (!session) {
      toast({ title: "❌ Error", description: "Something went wrong. User not logged in." })
      return null
    }
    
    try {
      setLoading(true)
      const { data: newBooking, error } = await supabase
        .from("booking")
        .insert([{ ...data, email: session.user.email }])
        .select("*")
        .single()

      if (error) throw error
      
      setData_Booking(prev => [newBooking, ...prev])
      toast({ title: "✅ Booking Successful", description: "Your reservation has been saved." })
      return newBooking
      
    } catch (error) {
      console.error("Error adding booking:", error)
      toast({ title: "❌ Error", description: "Something went wrong. Try again." })
      return null
    } finally {
      setLoading(false)
    }
  }

  // تحديث حجر موجود
  const updateBooking = async (id: string, updates: Partial<BookingData>) => {
    if (!session) {
      toast({ title: "❌ Error", description: "User not logged in." })
      return null
    }
    
    try {
      setLoading(true)
      const { data: updatedBooking, error } = await supabase
        .from("booking")
        .update(updates)
        .eq("id", id)
        .eq("email", session.user.email)
        .select("*")
        .single()

      if (error) throw error
      
      // تحديث القائمة المحلية
      setData_Booking(prev => 
        prev.map(booking => booking.id === id ? updatedBooking : booking)
      )
      
      if (currentBooking?.id === id) {
        setCurrentBooking(updatedBooking)
      }
      
      toast({ title: "✅ Updated", description: "Booking has been updated successfully." })
      return updatedBooking
      
    } catch (error) {
      console.error("Error updating booking:", error)
      toast({ title: "❌ Error", description: "Failed to update booking." })
      return null
    } finally {
      setLoading(false)
    }
  }

  // حذف حجز
  const deleteBooking = async (id: string) => {
    if (!session) {
      toast({ title: "❌ Error", description: "User not logged in." })
      return false
    }
    
    try {
      setLoading(true)
      const { error } = await supabase
        .from("booking")
        .delete()
        .eq("id", id)
        .eq("email", session.user.email)

      if (error) throw error
      
      // تحديث القائمة المحلية
      setData_Booking(prev => prev.filter(booking => booking.id !== id))
      
      if (currentBooking?.id === id) {
        setCurrentBooking(null)
      }
      
      toast({ title: "✅ Deleted", description: "Booking has been deleted successfully." })
      return true
      
    } catch (error) {
      console.error("Error deleting booking:", error)
      toast({ title: "❌ Error", description: "Failed to delete booking." })
      return false
    } finally {
      setLoading(false)
    }
  }

  return { 
    addBooking, 
    updateBooking, 
    deleteBooking, 
    getAllBookings, 
    getBookingById,
    loading, 
    data_Booking, 
    currentBooking 
  }
}