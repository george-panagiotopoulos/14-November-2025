from django.contrib import admin
from .models import Destination, Hotel, HotelImage, Amenity, HotelAmenity, RoomType, RoomAmenity


class HotelImageInline(admin.TabularInline):
    model = HotelImage
    extra = 1


class HotelAmenityInline(admin.TabularInline):
    model = HotelAmenity
    extra = 1


class RoomTypeInline(admin.TabularInline):
    model = RoomType
    extra = 1
    fields = ['name', 'price_per_night', 'max_occupancy', 'total_rooms']


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'country', 'is_featured', 'created_at']
    list_filter = ['is_featured', 'country']
    search_fields = ['name', 'city', 'country']
    list_editable = ['is_featured']


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['name', 'destination', 'star_rating', 'hotel_type', 'is_active', 'created_at']
    list_filter = ['star_rating', 'hotel_type', 'is_active', 'destination__country']
    search_fields = ['name', 'destination__city', 'address']
    list_editable = ['is_active']
    inlines = [HotelImageInline, HotelAmenityInline, RoomTypeInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'destination', 'hotel_type', 'star_rating')
        }),
        ('Location', {
            'fields': ('address', 'latitude', 'longitude')
        }),
        ('Details', {
            'fields': ('description', 'check_in_time', 'check_out_time', 'cancellation_policy')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


@admin.register(HotelImage)
class HotelImageAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'is_primary', 'order', 'caption']
    list_filter = ['is_primary', 'hotel']
    search_fields = ['hotel__name', 'caption']
    list_editable = ['is_primary', 'order']


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'icon']
    list_filter = ['category']
    search_fields = ['name']


@admin.register(RoomType)
class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ['hotel', 'name', 'price_per_night', 'max_occupancy', 'total_rooms']
    list_filter = ['hotel', 'max_occupancy']
    search_fields = ['hotel__name', 'name']
