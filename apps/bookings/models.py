from django.db import models
from django.conf import settings
from apps.hotels.models import RoomType
import uuid


class Booking(models.Model):
    """Hotel room bookings"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    booking_reference = models.CharField(max_length=10, unique=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='bookings')
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    num_guests = models.IntegerField()
    num_rooms = models.IntegerField(default=1)

    # Guest details
    guest_first_name = models.CharField(max_length=100)
    guest_last_name = models.CharField(max_length=100)
    guest_email = models.EmailField()
    guest_phone = models.CharField(max_length=20)
    special_requests = models.TextField(blank=True)

    # Pricing
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    num_nights = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    taxes = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.booking_reference:
            self.booking_reference = str(uuid.uuid4())[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_reference} - {self.user.username}"

    class Meta:
        ordering = ['-created_at']


class Payment(models.Model):
    """Payment records for bookings"""
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    PAYMENT_METHOD = [
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('paypal', 'PayPal'),
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD)
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')

    # Card details (last 4 digits only for security)
    card_last4 = models.CharField(max_length=4, blank=True)
    card_brand = models.CharField(max_length=20, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.booking.booking_reference}"
