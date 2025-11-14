# Phase 1: MVP Implementation - Detailed Design

## Overview

Phase 1 focuses on building the core MVP (Minimum Viable Product) with user authentication, basic search functionality, hotel booking, and reviews system. This phase is split into two steps to ensure proper validation and iterative development.

---

## Step 1: Mock User Interface (Frontend Prototype)

**Objective**: Create a fully interactive frontend prototype with mock data to visualize the application flow, gather feedback, and validate UX decisions before backend implementation.

### 1.1 Technology Stack for Prototype

- **HTML5/CSS3**: Core structure and styling
- **JavaScript (Vanilla or lightweight framework)**: Interactivity and mock data handling
- **Bootstrap 5 or Tailwind CSS**: Responsive design framework
- **Mock Data**: JSON files to simulate API responses
- **Local Storage**: Simulate user sessions and cart functionality

### 1.2 Pages to Build

#### Home Page
**Components**:
- **Header/Navigation Bar**
  - Logo
  - Navigation links (Home, Hotels, Flights, Activities, My Bookings)
  - User menu (Sign In/Register or User Profile dropdown)

- **Hero Section**
  - Large banner image with travel theme
  - Search widget (destination, check-in, check-out, guests)
  - Quick search button

- **Featured Destinations**
  - Card grid showing 6-8 popular destinations
  - Image, destination name, starting price
  - "Explore" button

- **Popular Hotels Section**
  - Horizontal scrollable list of hotel cards
  - Hotel image, name, location, rating, price

- **Customer Reviews Highlight**
  - 3-4 recent reviews with star ratings
  - User photo, name, review snippet

- **Footer**
  - Links (About, Contact, Terms, Privacy)
  - Social media icons
  - Newsletter signup

#### Search Results Page
**Components**:
- **Search Bar** (sticky at top)
  - Modify search parameters
  - Filter toggle button

- **Filters Sidebar**
  - Price range slider
  - Star rating checkboxes
  - Amenities (WiFi, Pool, Parking, etc.)
  - Guest rating filter
  - Hotel type (Hotel, Resort, Apartment, etc.)
  - "Apply Filters" and "Clear All" buttons

- **Results Header**
  - Number of results found
  - Sort dropdown (Price: Low to High, Rating, etc.)

- **Hotel Cards Grid**
  - Each card shows:
    - Hotel image carousel (multiple photos)
    - Hotel name and location
    - Star rating
    - Guest review score (e.g., 8.5/10) with review count
    - Key amenities icons
    - Price per night
    - "View Details" button
  - Pagination at bottom

- **Map View Toggle**
  - Button to switch between list/map view
  - Map showing hotel locations (can use static image for mock)

#### Hotel Details Page
**Components**:
- **Image Gallery**
  - Large featured image
  - Thumbnail strip below
  - Lightbox functionality

- **Hotel Information Section**
  - Hotel name, star rating
  - Location with map
  - Description
  - Amenities list with icons
  - Check-in/check-out times
  - Cancellation policy

- **Booking Widget** (sticky sidebar on desktop)
  - Check-in/check-out date pickers
  - Guest selector (adults, children, rooms)
  - Room type dropdown
  - Price breakdown
    - Price per night × nights
    - Taxes and fees
    - Total price
  - "Reserve Now" button

- **Room Types Section**
  - Cards for each room type
  - Room image, name, size, capacity
  - Amenities specific to room
  - Price
  - "Select Room" button

- **Reviews Section**
  - Overall rating score with breakdown
    - Cleanliness, Location, Service, Value
  - Filter reviews (Most Recent, Highest Rated, Lowest Rated)
  - Individual review cards
    - User photo and name
    - Rating stars
    - Date stayed
    - Review text
    - Helpful/Not Helpful buttons
  - "Write a Review" button
  - Pagination

#### User Authentication Pages

**Sign In Page**:
- Email input
- Password input
- "Remember me" checkbox
- "Forgot password?" link
- Sign in button
- Social login buttons (Google, Facebook - mock)
- "Don't have an account? Register" link

**Registration Page**:
- First name, last name
- Email
- Phone number
- Password with strength indicator
- Confirm password
- Terms and conditions checkbox
- Register button
- "Already have an account? Sign in" link

**Password Reset Page**:
- Email input
- Submit button
- Confirmation message

#### User Dashboard Pages

**My Profile**:
- Personal information form
  - Name, email, phone
  - Date of birth
  - Address
  - "Save Changes" button
- Change password section
- Profile photo upload

**My Bookings**:
- Tabs: Upcoming, Past, Cancelled
- Booking cards showing:
  - Hotel image and name
  - Booking reference number
  - Check-in/check-out dates
  - Guest count
  - Total price
  - Status badge
  - Action buttons (View Details, Cancel, Write Review)
- Empty state message if no bookings

**My Reviews**:
- List of user's submitted reviews
- Each review shows:
  - Hotel name and image
  - Rating given
  - Review text
  - Date posted
  - Edit/Delete buttons

#### Booking Flow Pages

**Checkout Page**:
- Progress indicator (Details → Payment → Confirmation)
- Booking summary sidebar
  - Hotel details
  - Dates, guests
  - Price breakdown
- Guest details form
  - Primary guest information
  - Special requests textarea
- Payment section
  - Card number, expiry, CVV
  - Billing address
  - "Complete Booking" button
- Security badges (SSL, PCI compliant icons)

**Booking Confirmation Page**:
- Success message with animation
- Booking reference number
- Booking details summary
- "Download Confirmation" button
- "View My Bookings" button
- Email confirmation notice

#### Write Review Page
- Hotel information header
- Rating section
  - Overall rating (star selector)
  - Category ratings (Cleanliness, Location, Service, Value)
- Review form
  - Review title
  - Review text (textarea with character count)
  - Photo upload (optional)
- Submit button

### 1.3 Mock Data Structure

Create JSON files for prototype:

**destinations.json**:
```json
[
  {
    "id": 1,
    "name": "Paris",
    "country": "France",
    "image": "paris.jpg",
    "description": "City of Light",
    "starting_price": 120
  }
]
```

**hotels.json**:
```json
[
  {
    "id": 1,
    "name": "Grand Hotel Paris",
    "location": "Paris, France",
    "star_rating": 4,
    "guest_rating": 8.5,
    "review_count": 342,
    "price_per_night": 150,
    "images": ["hotel1.jpg", "hotel2.jpg"],
    "amenities": ["WiFi", "Pool", "Parking", "Spa"],
    "description": "Luxury hotel in the heart of Paris...",
    "rooms": [...]
  }
]
```

**reviews.json**:
```json
[
  {
    "id": 1,
    "hotel_id": 1,
    "user_name": "John Doe",
    "user_photo": "user1.jpg",
    "rating": 5,
    "date": "2025-10-15",
    "title": "Amazing experience!",
    "content": "The hotel exceeded all expectations...",
    "helpful_count": 12
  }
]
```

**users.json** (for mock login):
```json
[
  {
    "email": "demo@example.com",
    "password": "password123",
    "first_name": "Demo",
    "last_name": "User"
  }
]
```

### 1.4 Interactive Features with JavaScript

**Search Functionality**:
- Date picker for check-in/check-out
- Guest counter (increment/decrement)
- Search validation
- Filter hotels based on selected criteria
- Sort results dynamically

**Booking Flow**:
- Add to cart functionality using localStorage
- Calculate total price based on nights
- Form validation
- Mock payment processing with loading state
- Generate random booking reference

**User Session**:
- Mock login/logout using localStorage
- Store user state
- Show/hide elements based on auth state
- Persist shopping cart

**Reviews**:
- Interactive star rating input
- Character counter for review text
- Filter and sort reviews
- Helpful/Not helpful voting

### 1.5 Responsive Design Requirements

- **Desktop** (1200px+): Full layout with sidebars
- **Tablet** (768px-1199px): Adapted grid, collapsible filters
- **Mobile** (< 768px): Single column, hamburger menu, bottom sticky booking bar

### 1.6 Design Guidelines

**Color Scheme** (example):
- Primary: Blue (#2563EB)
- Secondary: Orange (#F59E0B)
- Success: Green (#10B981)
- Danger: Red (#EF4444)
- Neutral: Grays (#F3F4F6, #6B7280, #1F2937)

**Typography**:
- Headings: Bold, sans-serif
- Body: Regular, sans-serif, 16px base
- High contrast for readability

**Components**:
- Rounded corners (4-8px)
- Subtle shadows for cards
- Smooth transitions and hover effects
- Clear call-to-action buttons

### 1.7 Testing and Feedback

**User Testing Checklist**:
- [ ] Can users easily find and search for hotels?
- [ ] Is the filter system intuitive?
- [ ] Is the booking flow clear and not overwhelming?
- [ ] Are hotel details comprehensive?
- [ ] Is the review system easy to use?
- [ ] Does the design work well on all devices?
- [ ] Are error states clear?
- [ ] Is navigation consistent?

**Feedback Collection**:
- Walk through key user journeys
- Note any confusion points
- Test on different devices/browsers
- Gather feedback from 3-5 potential users
- Document suggested improvements

### 1.8 Deliverables

- Complete HTML/CSS/JS prototype
- Mock data JSON files
- Design documentation
- User testing feedback report
- List of refinements for implementation

---

## Step 2: Backend Implementation

**Objective**: Build the backend functionality using Django and SQLite, integrating it with the validated frontend from Step 1.

### 2.1 Development Environment Setup

**Requirements**:
- Python 3.10+
- Django 5.0+
- Virtual environment (venv)

**Initial Setup**:
```bash
# Create project structure
mkdir travel_portal
cd travel_portal
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install django djangorestframework pillow python-decouple

# Create Django project
django-admin startproject travel_portal_backend .
```

**Project Structure**:
```
travel_portal/
├── venv/
├── travel_portal_backend/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── apps/
│   ├── users/
│   ├── hotels/
│   ├── bookings/
│   └── reviews/
├── static/
├── media/
├── templates/
├── manage.py
└── requirements.txt
```

### 2.2 Django Apps Structure

#### Users App
**Purpose**: Handle user authentication, profiles, and preferences

**Models**:

```python
# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_photo = models.ImageField(upload_to='profiles/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

class UserPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='preferences')
    preferred_currency = models.CharField(max_length=3, default='USD')
    budget_range_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_range_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    newsletter_subscription = models.BooleanField(default=True)

    def __str__(self):
        return f"Preferences for {self.user.email}"

class SavedSearch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_searches')
    destination = models.CharField(max_length=200)
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.destination}"
```

**Views**:
- Registration view with email verification
- Login/Logout views
- Profile view (GET/PUT)
- Password change view
- Password reset views

**URLs**:
- `/api/auth/register/`
- `/api/auth/login/`
- `/api/auth/logout/`
- `/api/auth/profile/`
- `/api/auth/password-change/`
- `/api/auth/password-reset/`

#### Hotels App
**Purpose**: Manage hotel listings, destinations, and search functionality

**Models**:

```python
# apps/hotels/models.py
from django.db import models

class Destination(models.Model):
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
    star_rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
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

class HotelImage(models.Model):
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
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)  # Icon class name
    category = models.CharField(max_length=50)  # e.g., 'general', 'room', 'activity'

    class Meta:
        verbose_name_plural = 'Amenities'

    def __str__(self):
        return self.name

class HotelAmenity(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='hotel_amenities')
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['hotel', 'amenity']

class RoomType(models.Model):
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
        # Check if room is available for given dates
        overlapping_bookings = self.bookings.filter(
            status__in=['confirmed', 'pending'],
            check_in__lt=check_out,
            check_out__gt=check_in
        ).count()
        return overlapping_bookings < self.total_rooms

class RoomAmenity(models.Model):
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE, related_name='room_amenities')
    amenity = models.ForeignKey(Amenity, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['room_type', 'amenity']
```

**Views**:
- Search hotels (with filters)
- List featured destinations
- Hotel detail view
- Room availability check
- Popular hotels list

**URLs**:
- `/api/hotels/search/`
- `/api/hotels/<id>/`
- `/api/hotels/<id>/rooms/`
- `/api/hotels/<id>/availability/`
- `/api/destinations/`
- `/api/destinations/featured/`

**Search Implementation**:
```python
# apps/hotels/views.py
from django.db.models import Q, Avg
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def search_hotels(request):
    destination = request.GET.get('destination')
    check_in = request.GET.get('check_in')
    check_out = request.GET.get('check_out')
    guests = int(request.GET.get('guests', 1))

    # Filters
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    star_rating = request.GET.get('star_rating')
    amenities = request.GET.getlist('amenities')
    hotel_type = request.GET.get('hotel_type')

    # Base query
    hotels = Hotel.objects.filter(is_active=True)

    if destination:
        hotels = hotels.filter(
            Q(destination__city__icontains=destination) |
            Q(destination__country__icontains=destination) |
            Q(name__icontains=destination)
        )

    if star_rating:
        hotels = hotels.filter(star_rating=star_rating)

    if hotel_type:
        hotels = hotels.filter(hotel_type=hotel_type)

    # Filter by amenities
    if amenities:
        for amenity_id in amenities:
            hotels = hotels.filter(hotel_amenities__amenity_id=amenity_id)

    # Filter by room availability and price
    if check_in and check_out:
        hotels = hotels.filter(
            room_types__bookings__check_in__lt=check_out,
            room_types__bookings__check_out__gt=check_in
        ).distinct()

    if min_price:
        hotels = hotels.filter(room_types__price_per_night__gte=min_price)

    if max_price:
        hotels = hotels.filter(room_types__price_per_night__lte=max_price)

    # Sorting
    sort_by = request.GET.get('sort', 'popularity')
    if sort_by == 'price_low':
        hotels = hotels.order_by('room_types__price_per_night')
    elif sort_by == 'price_high':
        hotels = hotels.order_by('-room_types__price_per_night')
    elif sort_by == 'rating':
        hotels = hotels.annotate(avg_rating=Avg('reviews__overall_rating')).order_by('-avg_rating')

    # Serialize and return
    # ... (pagination and serialization logic)
```

#### Bookings App
**Purpose**: Handle booking creation, management, and payment processing

**Models**:

```python
# apps/bookings/models.py
from django.db import models
from apps.users.models import User
from apps.hotels.models import RoomType
import uuid

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    booking_reference = models.CharField(max_length=10, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
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
        return f"{self.booking_reference} - {self.user.email}"

    class Meta:
        ordering = ['-created_at']

class Payment(models.Model):
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
```

**Views**:
- Create booking
- View booking details
- List user bookings
- Cancel booking
- Check room availability

**URLs**:
- `/api/bookings/`
- `/api/bookings/<id>/`
- `/api/bookings/<id>/cancel/`
- `/api/bookings/my-bookings/`

**Booking Creation Flow**:
```python
# apps/bookings/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_booking(request):
    data = request.data

    # Validate data
    room_type_id = data.get('room_type_id')
    check_in = datetime.strptime(data.get('check_in'), '%Y-%m-%d').date()
    check_out = datetime.strptime(data.get('check_out'), '%Y-%m-%d').date()

    # Check availability
    room_type = RoomType.objects.get(id=room_type_id)
    if not room_type.is_available(check_in, check_out):
        return Response({'error': 'Room not available'}, status=status.HTTP_400_BAD_REQUEST)

    # Calculate pricing
    num_nights = (check_out - check_in).days
    subtotal = room_type.price_per_night * num_nights
    taxes = subtotal * 0.15  # 15% tax
    total = subtotal + taxes

    # Create booking within transaction
    with transaction.atomic():
        booking = Booking.objects.create(
            user=request.user,
            room_type=room_type,
            check_in=check_in,
            check_out=check_out,
            num_guests=data.get('num_guests'),
            guest_first_name=data.get('guest_first_name'),
            guest_last_name=data.get('guest_last_name'),
            guest_email=data.get('guest_email'),
            guest_phone=data.get('guest_phone'),
            special_requests=data.get('special_requests', ''),
            price_per_night=room_type.price_per_night,
            num_nights=num_nights,
            subtotal=subtotal,
            taxes=taxes,
            total_price=total,
            status='pending'
        )

        # Process payment (mock for now)
        payment = Payment.objects.create(
            booking=booking,
            amount=total,
            payment_method=data.get('payment_method'),
            transaction_id=f"TXN{uuid.uuid4().hex[:12].upper()}",
            status='completed',
            completed_at=datetime.now()
        )

        # Update booking status
        booking.status = 'confirmed'
        booking.save()

    # Send confirmation email (implement later)
    # send_booking_confirmation_email(booking)

    return Response({
        'booking_reference': booking.booking_reference,
        'status': 'success'
    }, status=status.HTTP_201_CREATED)
```

#### Reviews App
**Purpose**: Manage hotel reviews and ratings

**Models**:

```python
# apps/reviews/models.py
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.users.models import User
from apps.hotels.models import Hotel
from apps.bookings.models import Booking

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='reviews')
    booking = models.OneToOneField(Booking, on_delete=models.SET_NULL, null=True, blank=True)

    # Ratings
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
        return f"{self.user.email} - {self.hotel.name}"

class ReviewPhoto(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='reviews/')
    caption = models.CharField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for review {self.review.id}"

class ReviewVote(models.Model):
    VOTE_CHOICES = [
        ('helpful', 'Helpful'),
        ('not_helpful', 'Not Helpful'),
    ]

    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vote_type = models.CharField(max_length=15, choices=VOTE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['review', 'user']

    def __str__(self):
        return f"{self.user.email} - {self.vote_type}"
```

**Views**:
- Create review
- List hotel reviews
- Get review details
- Update review
- Delete review
- Vote on review

**URLs**:
- `/api/reviews/`
- `/api/reviews/<id>/`
- `/api/reviews/<id>/vote/`
- `/api/hotels/<id>/reviews/`
- `/api/bookings/<id>/review/`

### 2.3 API Endpoints Summary

**Authentication**:
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile
- `POST /api/auth/password-change/` - Change password
- `POST /api/auth/password-reset/` - Request password reset

**Hotels**:
- `GET /api/hotels/search/` - Search hotels with filters
- `GET /api/hotels/<id>/` - Get hotel details
- `GET /api/hotels/<id>/rooms/` - Get hotel room types
- `POST /api/hotels/<id>/availability/` - Check room availability
- `GET /api/destinations/` - List all destinations
- `GET /api/destinations/featured/` - List featured destinations

**Bookings**:
- `POST /api/bookings/` - Create new booking
- `GET /api/bookings/` - List user's bookings
- `GET /api/bookings/<id>/` - Get booking details
- `PUT /api/bookings/<id>/cancel/` - Cancel booking

**Reviews**:
- `GET /api/hotels/<id>/reviews/` - Get hotel reviews
- `POST /api/reviews/` - Create review
- `GET /api/reviews/<id>/` - Get review details
- `PUT /api/reviews/<id>/` - Update review
- `DELETE /api/reviews/<id>/` - Delete review
- `POST /api/reviews/<id>/vote/` - Vote on review

### 2.4 Django Settings Configuration

**Key Settings**:

```python
# travel_portal_backend/settings.py

# Custom user model
AUTH_USER_MODEL = 'users.User'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Static files
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# Email configuration (for development)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

### 2.5 Database Migrations

```bash
# Create migrations
python manage.py makemigrations users hotels bookings reviews

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 2.6 Admin Panel Configuration

Configure Django admin for easy data management:

```python
# apps/hotels/admin.py
from django.contrib import admin
from .models import Hotel, HotelImage, Destination, RoomType, Amenity

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['name', 'destination', 'star_rating', 'is_active']
    list_filter = ['star_rating', 'hotel_type', 'is_active']
    search_fields = ['name', 'destination__city']

@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'country', 'is_featured']
    list_filter = ['is_featured']
    search_fields = ['name', 'country', 'city']

# Similar registrations for other models
```

### 2.7 Testing Strategy

**Unit Tests**:
- Model validation tests
- API endpoint tests
- Business logic tests
- Authentication tests

**Example Test**:
```python
# apps/bookings/tests.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.hotels.models import Hotel, RoomType
from apps.bookings.models import Booking
from datetime import date, timedelta

User = get_user_model()

class BookingTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        # Create hotel and room type...

    def test_booking_creation(self):
        # Test booking creation logic
        pass

    def test_room_availability(self):
        # Test availability checking
        pass
```

### 2.8 Frontend Integration

**Connect Mock UI to Backend**:
- Replace mock data fetching with actual API calls
- Update JavaScript to use Django API endpoints
- Implement proper authentication flow
- Handle API responses and errors
- Add loading states

**Example API Integration**:
```javascript
// static/js/hotels.js
async function searchHotels(searchParams) {
    try {
        const response = await fetch('/api/hotels/search/?' + new URLSearchParams(searchParams));
        const data = await response.json();
        renderHotels(data.results);
    } catch (error) {
        console.error('Search failed:', error);
        showErrorMessage('Failed to search hotels');
    }
}
```

### 2.9 Development Workflow

1. **Create models and migrations**
2. **Register models in admin panel**
3. **Add sample data via admin or fixtures**
4. **Create serializers for API responses**
5. **Implement views and URL routing**
6. **Test API endpoints using Postman or curl**
7. **Update frontend to use real APIs**
8. **Test end-to-end user flows**
9. **Fix bugs and refine**

### 2.10 Sample Data Creation

Create fixtures or management command to populate database:

```python
# apps/hotels/management/commands/populate_data.py
from django.core.management.base import BaseCommand
from apps.hotels.models import Destination, Hotel, RoomType, Amenity

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **kwargs):
        # Create destinations
        paris = Destination.objects.create(
            name='Paris',
            country='France',
            city='Paris',
            description='City of Light',
            is_featured=True
        )

        # Create hotels
        hotel = Hotel.objects.create(
            name='Grand Hotel Paris',
            destination=paris,
            star_rating=4,
            description='Luxury hotel...',
            # ... other fields
        )

        # Create room types
        # Create amenities
        # ...

        self.stdout.write(self.style.SUCCESS('Successfully populated data'))
```

Run with: `python manage.py populate_data`

### 2.11 Deliverables

- Fully functional Django backend
- All database models and migrations
- Complete API endpoints
- Admin panel configured
- Sample data populated
- Frontend integrated with backend
- Basic tests written
- Documentation for API endpoints
- Working MVP ready for user testing

---

## Success Criteria for Phase 1

- [ ] Users can register and login
- [ ] Users can search for hotels with filters
- [ ] Users can view hotel details and room options
- [ ] Users can make bookings
- [ ] Users can view their booking history
- [ ] Users can write and view reviews
- [ ] Application is responsive on all devices
- [ ] Basic error handling is implemented
- [ ] Sample data is available for testing

## Next Steps

After completing Phase 1, proceed to Phase 2 which includes:
- Flight booking integration
- Payment gateway integration (Stripe)
- Email notifications
- Advanced search features
- Performance optimization
