from django.contrib import admin
from .models import Booking, Payment


class PaymentInline(admin.StackedInline):
    model = Payment
    extra = 0
    readonly_fields = ['transaction_id', 'created_at', 'completed_at']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['booking_reference', 'user', 'room_type', 'check_in', 'check_out', 'status', 'total_price', 'created_at']
    list_filter = ['status', 'check_in', 'check_out', 'created_at']
    search_fields = ['booking_reference', 'user__username', 'user__email', 'guest_email']
    readonly_fields = ['booking_reference', 'created_at', 'updated_at']
    date_hierarchy = 'check_in'
    inlines = [PaymentInline]
    fieldsets = (
        ('Booking Information', {
            'fields': ('booking_reference', 'user', 'room_type', 'status')
        }),
        ('Dates & Guests', {
            'fields': ('check_in', 'check_out', 'num_guests', 'num_rooms')
        }),
        ('Guest Details', {
            'fields': ('guest_first_name', 'guest_last_name', 'guest_email', 'guest_phone', 'special_requests')
        }),
        ('Pricing', {
            'fields': ('price_per_night', 'num_nights', 'subtotal', 'taxes', 'total_price')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'booking', 'amount', 'payment_method', 'status', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['transaction_id', 'booking__booking_reference']
    readonly_fields = ['transaction_id', 'created_at', 'completed_at']
    date_hierarchy = 'created_at'
