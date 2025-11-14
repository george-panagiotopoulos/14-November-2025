from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.hotels.models import Hotel
from apps.bookings.models import Booking


class Review(models.Model):
    """Hotel reviews from verified guests"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reviews')
    booking = models.OneToOneField(Booking, on_delete=models.SET_NULL, null=True, blank=True)

    # Ratings (1-5 scale)
    overall_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    cleanliness_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    location_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    service_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    value_rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])

    # Review content
    title = models.CharField(max_length=200)
    content = models.TextField()

    # Metadata
    is_verified = models.BooleanField(default=False)  # Verified if linked to booking
    helpful_count = models.IntegerField(default=0)
    not_helpful_count = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.hotel.name}"

    def save(self, *args, **kwargs):
        # Auto-verify if linked to a booking
        if self.booking:
            self.is_verified = True
        super().save(*args, **kwargs)


class ReviewPhoto(models.Model):
    """Photos uploaded with reviews"""
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='reviews/')
    caption = models.CharField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for review {self.review.id}"


class ReviewVote(models.Model):
    """Helpful/not helpful votes on reviews"""
    VOTE_CHOICES = [
        ('helpful', 'Helpful'),
        ('not_helpful', 'Not Helpful'),
    ]

    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vote_type = models.CharField(max_length=15, choices=VOTE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['review', 'user']

    def __str__(self):
        return f"{self.user.username} - {self.vote_type}"
