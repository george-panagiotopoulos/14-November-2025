from django.contrib import admin
from .models import Review, ReviewPhoto, ReviewVote


class ReviewPhotoInline(admin.TabularInline):
    model = ReviewPhoto
    extra = 1


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'user', 'overall_rating', 'is_verified', 'helpful_count', 'created_at']
    list_filter = ['overall_rating', 'is_verified', 'created_at', 'hotel']
    search_fields = ['user__username', 'hotel__name', 'title', 'content']
    readonly_fields = ['is_verified', 'helpful_count', 'not_helpful_count', 'created_at', 'updated_at']
    date_hierarchy = 'created_at'
    inlines = [ReviewPhotoInline]
    fieldsets = (
        ('Review Information', {
            'fields': ('user', 'hotel', 'booking', 'is_verified')
        }),
        ('Ratings', {
            'fields': ('overall_rating', 'cleanliness_rating', 'location_rating', 'service_rating', 'value_rating')
        }),
        ('Content', {
            'fields': ('title', 'content')
        }),
        ('Engagement', {
            'fields': ('helpful_count', 'not_helpful_count')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(ReviewPhoto)
class ReviewPhotoAdmin(admin.ModelAdmin):
    list_display = ['review', 'caption', 'uploaded_at']
    list_filter = ['uploaded_at']
    search_fields = ['review__user__username', 'review__hotel__name', 'caption']


@admin.register(ReviewVote)
class ReviewVoteAdmin(admin.ModelAdmin):
    list_display = ['review', 'user', 'vote_type', 'created_at']
    list_filter = ['vote_type', 'created_at']
    search_fields = ['review__hotel__name', 'user__username']
