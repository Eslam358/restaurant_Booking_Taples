// BookingSection.tsx (الجزء المعدل فقط)
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useApp } from "@/contexts/app-context"
import { useToast } from "@/hooks/use-toast"
import { useBooking, BookingData } from "@/hooks/Use-booking-hook"
import { useCard } from "@/contexts/data-context"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Trash2, Calendar, Clock, Phone } from "lucide-react"

export default function BookingSection() {
  const { session } = useCard();
  const { t } = useApp()
  const { toast } = useToast()
  const { 
    addBooking, 
    updateBooking, 
    deleteBooking, 
    getAllBookings, 
    loading, 
    data_Booking 
  } = useBooking()
  
  const [editingBooking, setEditingBooking] = useState<BookingData | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<BookingData>>({})

  useEffect(() => {
    if (session) {
      getAllBookings()
    }
  }, [session])

  // تحديث بيانات النموذج عند فتح التعديل
  useEffect(() => {
    if (editingBooking) {
      setEditFormData({
        name: editingBooking.name,
        phone: editingBooking.phone,
        date: editingBooking.date,
        time: editingBooking.time,
        guests: editingBooking.guests,
        requests: editingBooking.requests
      })
    }
  }, [editingBooking])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const payload: BookingData = {
      name: formData.get('name') as string,
      email: session?.user?.email || (formData.get('email') as string),
      phone: formData.get('phone') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      guests: Number(formData.get('guests')),
      requests: formData.get('requests') as string,
    }

    const result = await addBooking(payload)
    
    if (result) {
      (e.target as HTMLFormElement).reset()
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingBooking?.id) return

    // الطريقة الصحيحة للوصول إلى البيانات
    const formData = new FormData(e.currentTarget)
    
    const updates: Partial<BookingData> = {
      name: formData.get('edit-name') as string,
      phone: formData.get('edit-phone') as string,
      date: formData.get('edit-date') as string,
      time: formData.get('edit-time') as string,
      guests: Number(formData.get('edit-guests')),
      requests: formData.get('edit-requests') as string,
    }

    // أو استخدام حالة editFormData مباشرة
    // const updates = { ...editFormData }

    const result = await updateBooking(editingBooking.id, updates)
    
    if (result) {
      setIsEditDialogOpen(false)
      setEditingBooking(null)
      setEditFormData({})
    }
  }

  // بديل: استخدام onChange لتحديث الحالة
  const handleEditInputChange = (field: keyof BookingData, value: string | number) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleEdit = async (booking: BookingData) => {
    setEditingBooking(booking)
    setIsEditDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      await deleteBooking(id)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="booking" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* نموذج الحجز الجديد */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-2">
                {t("bookingTitle")}
              </CardTitle>
              <CardDescription className="text-base">
                {t("bookingSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input 
                      id="name" 
                      name="name"
                      required 
                      placeholder={t("name")} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={session?.user?.email || ""} 
                      required 
                      placeholder={t("email")}
                      readOnly={!!session}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("phone")}</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    required 
                    placeholder={t("phone")} 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">{t("date")}</Label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">{t("time")}</Label>
                    <Input 
                      id="time" 
                      name="time"
                      type="time" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">{t("guests")}</Label>
                    <Input 
                      id="guests" 
                      name="guests"
                      defaultValue={2} 
                      type="number" 
                      min="1" 
                      max="20" 
                      required 
                      placeholder="2" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requests">{t("specialRequests")}</Label>
                  <Textarea 
                    id="requests" 
                    name="requests"
                    placeholder={t("specialRequests")} 
                    className="min-h-24" 
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <div className="flex gap-2 items-center">
                      <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-150"></div>
                      <div className="h-2 w-2 bg-white rounded-full animate-bounce delay-300"></div>
                    </div>
                  ) : (
                    t("submitBooking")
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* قائمة الحجوزات */}
          {data_Booking.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Bookings</CardTitle>
                <CardDescription>
                  You have {data_Booking.length} booking{data_Booking.length !== 1 ? 's' : ''}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data_Booking.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{booking.name}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                      
                      {booking.requests && (
                        <p className="mt-2 text-sm text-gray-600">
                          <strong>Requests:</strong> {booking.requests}
                        </p>
                      )}
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(booking)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => booking.id && handleDelete(booking.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* نموذج التعديل - الإصدار المصحح */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Booking</DialogTitle>
                <DialogDescription>
                  Update your reservation details below.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input 
                      id="edit-name" 
                      name="edit-name"
                      value={editFormData.name || ''}
                      onChange={(e) => handleEditInputChange('name', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input 
                      id="edit-phone" 
                      name="edit-phone"
                      type="tel" 
                      value={editFormData.phone || ''}
                      onChange={(e) => handleEditInputChange('phone', e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input 
                      id="edit-date" 
                      name="edit-date"
                      type="date" 
                      value={editFormData.date || ''}
                      onChange={(e) => handleEditInputChange('date', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input 
                      id="edit-time" 
                      name="edit-time"
                      type="time" 
                      value={editFormData.time || ''}
                      onChange={(e) => handleEditInputChange('time', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-guests">Guests</Label>
                    <Input 
                      id="edit-guests" 
                      name="edit-guests"
                      type="number" 
                      min="1" 
                      max="20" 
                      value={editFormData.guests || 2}
                      onChange={(e) => handleEditInputChange('guests', Number(e.target.value))}
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-requests">Special Requests</Label>
                  <Textarea 
                    id="edit-requests" 
                    name="edit-requests"
                    value={editFormData.requests || ''}
                    onChange={(e) => handleEditInputChange('requests', e.target.value)}
                    className="min-h-24" 
                  />
                </div>

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Booking"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}