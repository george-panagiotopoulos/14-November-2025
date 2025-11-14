from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserPreference, SavedSearch


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone', 'is_staff', 'date_joined']
    list_filter = ['is_staff', 'is_superuser', 'is_active', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'phone']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('phone', 'date_of_birth', 'profile_photo')}),
    )


@admin.register(UserPreference)
class UserPreferenceAdmin(admin.ModelAdmin):
    list_display = ['user', 'preferred_currency', 'budget_range_min', 'budget_range_max', 'newsletter_subscription']
    list_filter = ['preferred_currency', 'newsletter_subscription']
    search_fields = ['user__username', 'user__email']


@admin.register(SavedSearch)
class SavedSearchAdmin(admin.ModelAdmin):
    list_display = ['user', 'destination', 'check_in', 'check_out', 'guests', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__username', 'destination']
    date_hierarchy = 'created_at'
