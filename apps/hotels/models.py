from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Destination(models.Model):
    """Travel destinations"""
    name = models.CharField(max_length=200)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='destinations/')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city}, {self.country}"


class Hotel(models.Model):
    """Hotel listings"""
    HOTEL_TYPES = [
        ('hotel', 'Hotel'),
        ('resort', 'Resort'),
        ('apartment', 'Apartment'),
        ('guesthouse', 'Guesthouse'),
        ('hostel', 'Hostel'),
    ]

    name = models.CharField(max_length=200)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='hotels')
    address = models.CharField(max_length=300)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    star_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    hotel_type = models.CharField(max_length=20, choices=HOTEL_TYPES, default='hotel')
    description = models.TextField()
    check_in_time = models.TimeField(default='14:00')
    check_out_time = models.TimeField(default='11:00')
    cancellation_policy = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if reviews.exists():
            return sum(r.overall_rating for r in reviews) / reviews.count()
        return 0

    @property
    def review_count(self):
        return self.reviews.count()

    @property
    def starting_price(self):
        room_types = self.room_types.all()
        if room_types.exists():
            return min(rt.price_per_night for rt in room_types)
        return 0


class HotelImage(models.Model):
    """Hotel images"""
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='hotels/')
    caption = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-is_primary', 'order']

    def __str__(self):
        return f"{self.hotel.name} - Image {self.id}"


class Amenity(models.Model):
    """Hotel amenities"""
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50)  # e.g., 'general', 'room', 'activity'

    class Meta:
        verbose_name_plural = 'Amenities'
        ordering = ['category', 'name']

    def __str__(self):
        return self.name


class HotelAmenity(models.Model):
    """Relationship between hotels and amenities"""
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='hotel_amenities')
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['hotel', 'amenity']
        verbose_name_plural = 'Hotel amenities'


class RoomType(models.Model):
    """Different room types available in a hotel"""
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='room_types')
    name = models.CharField(max_length=100)
    description = models.TextField()
    size_sqm = models.IntegerField(null=True, blank=True)
    max_occupancy = models.IntegerField()
    bed_type = models.CharField(max_length=100)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    total_rooms = models.IntegerField()
    image = models.ImageField(upload_to='rooms/', null=True, blank=True)

    def __str__(self):
        return f"{self.hotel.name} - {self.name}"

    def is_available(self, check_in, check_out):
        """Check if room is available for given dates"""
        from apps.bookings.models import Booking
        overlapping_bookings = Booking.objects.filter(
            room_type=self,
            status__in=['confirmed', 'pending'],
            check_in__lt=check_out,
            check_out__gt=check_in
        ).count()
        return overlapping_bookings < self.total_rooms


class RoomAmenity(models.Model):
    """Room-specific amenities"""
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='room_amenities')
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['room_type', 'amenity']
        verbose_name_plural = 'Room amenities'
