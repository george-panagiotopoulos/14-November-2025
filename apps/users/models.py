from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user model extending Django's AbstractUser"""
    phone = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email or self.username


class UserPreference(models.Model):
    """User preferences for personalized experience"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    preferred_currency = models.CharField(max_length=3, default='USD')
    budget_range_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_range_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    newsletter_subscription = models.BooleanField(default=True)

    def __str__(self):
        return f"Preferences for {self.user.username}"


class SavedSearch(models.Model):
    """Saved searches for quick access"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_searches')
    destination = models.CharField(max_length=200)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Saved searches'

    def __str__(self):
        return f"{self.user.username} - {self.destination}"
