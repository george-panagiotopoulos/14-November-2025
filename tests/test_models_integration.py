"""
Integration tests for all models in the travel portal
"""
from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.hotels.models import Destination, Hotel, Amenity, RoomType, HotelAmenity
from apps.bookings.models import Booking, Payment
from apps.reviews.models import Review
from datetime import date, timedelta
from decimal import Decimal

User = get_user_model()


class ModelsIntegrationTests(TestCase):
    """Test models work together correctly"""

    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )

        # Create destination
        self.destination = Destination.objects.create(
            name='Paris',
            city='Paris',
            country='France',
            description='City of Light',
            is_featured=True
        )

        # Create hotel
        self.hotel = Hotel.objects.create(
            name='Test Hotel Paris',
            destination=self.destination,
            address='123 Test Street',
            star_rating=4,
            hotel_type='hotel',
            description='A test hotel',
            cancellation_policy='Free cancellation up to 24 hours'
        )

        # Create amenities
        self.wifi = Amenity.objects.create(name='WiFi', category='general')
        self.pool = Amenity.objects.create(name='Pool', category='general')

        # Link amenities to hotel
        HotelAmenity.objects.create(hotel=self.hotel, amenity=self.wifi)
        HotelAmenity.objects.create(hotel=self.hotel, amenity=self.pool)

        # Create room type
        self.room_type = RoomType.objects.create(
            hotel=self.hotel,
            name='Standard Room',
            description='Comfortable standard room',
            max_occupancy=2,
            bed_type='Queen Bed',
            price_per_night=Decimal('150.00'),
            total_rooms=10
        )

    def test_destination_has_hotels(self):
        """Test destination relationship with hotels"""
        self.assertEqual(self.destination.hotels.count(), 1)
        self.assertEqual(self.destination.hotels.first(), self.hotel)

    def test_hotel_has_amenities(self):
        """Test hotel can have multiple amenities"""
        self.assertEqual(self.hotel.hotel_amenities.count(), 2)
        amenities = [ha.amenity.name for ha in self.hotel.hotel_amenities.all()]
        self.assertIn('WiFi', amenities)
        self.assertIn('Pool', amenities)

    def test_hotel_has_room_types(self):
        """Test hotel has room types"""
        self.assertEqual(self.hotel.room_types.count(), 1)
        self.assertEqual(self.hotel.room_types.first(), self.room_type)

    def test_hotel_starting_price(self):
        """Test hotel starting price calculation"""
        self.assertEqual(self.hotel.starting_price, Decimal('150.00'))

    def test_booking_creation_with_auto_reference(self):
        """Test booking is created with auto-generated reference"""
        booking = Booking.objects.create(
            user=self.user,
            room_type=self.room_type,
            check_in=date.today() + timedelta(days=30),
            check_out=date.today() + timedelta(days=35),
            num_guests=2,
            guest_first_name='John',
            guest_last_name='Doe',
            guest_email='john@example.com',
            guest_phone='+1-555-0123',
            price_per_night=Decimal('150.00'),
            num_nights=5,
            subtotal=Decimal('750.00'),
            taxes=Decimal('112.50'),
            total_price=Decimal('862.50'),
            status='confirmed'
        )
        self.assertIsNotNone(booking.booking_reference)
        self.assertEqual(len(booking.booking_reference), 8)

    def test_room_availability_check(self):
        """Test room availability checking logic"""
        check_in = date.today() + timedelta(days=30)
        check_out = date.today() + timedelta(days=35)

        # Room should be available initially
        self.assertTrue(self.room_type.is_available(check_in, check_out))

        # Create bookings to fill all rooms
        for i in range(10):
            Booking.objects.create(
                user=self.user,
                room_type=self.room_type,
                check_in=check_in,
                check_out=check_out,
                num_guests=2,
                guest_first_name='Test',
                guest_last_name=f'Guest{i}',
                guest_email=f'guest{i}@example.com',
                guest_phone='+1-555-0123',
                price_per_night=Decimal('150.00'),
                num_nights=5,
                subtotal=Decimal('750.00'),
                taxes=Decimal('112.50'),
                total_price=Decimal('862.50'),
                status='confirmed'
            )

        # Now room should not be available
        self.assertFalse(self.room_type.is_available(check_in, check_out))

    def test_review_auto_verification(self):
        """Test review is automatically verified when linked to booking"""
        booking = Booking.objects.create(
            user=self.user,
            room_type=self.room_type,
            check_in=date.today() - timedelta(days=10),
            check_out=date.today() - timedelta(days=5),
            num_guests=2,
            guest_first_name='John',
            guest_last_name='Doe',
            guest_email='john@example.com',
            guest_phone='+1-555-0123',
            price_per_night=Decimal('150.00'),
            num_nights=5,
            subtotal=Decimal('750.00'),
            taxes=Decimal('112.50'),
            total_price=Decimal('862.50'),
            status='completed'
        )

        review = Review.objects.create(
            user=self.user,
            hotel=self.hotel,
            booking=booking,
            overall_rating=5,
            cleanliness_rating=5,
            location_rating=4,
            service_rating=5,
            value_rating=4,
            title='Great stay!',
            content='Had a wonderful time at this hotel.'
        )

        self.assertTrue(review.is_verified)

    def test_hotel_average_rating_calculation(self):
        """Test hotel average rating is calculated correctly"""
        # Create past booking
        booking = Booking.objects.create(
            user=self.user,
            room_type=self.room_type,
            check_in=date.today() - timedelta(days=10),
            check_out=date.today() - timedelta(days=5),
            num_guests=2,
            guest_first_name='John',
            guest_last_name='Doe',
            guest_email='john@example.com',
            guest_phone='+1-555-0123',
            price_per_night=Decimal('150.00'),
            num_nights=5,
            subtotal=Decimal('750.00'),
            taxes=Decimal('112.50'),
            total_price=Decimal('862.50'),
            status='completed'
        )

        # Create reviews
        Review.objects.create(
            user=self.user,
            hotel=self.hotel,
            booking=booking,
            overall_rating=5,
            cleanliness_rating=5,
            location_rating=5,
            service_rating=5,
            value_rating=5,
            title='Excellent!',
            content='Perfect hotel.'
        )

        user2 = User.objects.create_user(username='user2', email='user2@example.com', password='pass123')
        Review.objects.create(
            user=user2,
            hotel=self.hotel,
            overall_rating=3,
            cleanliness_rating=3,
            location_rating=3,
            service_rating=3,
            value_rating=3,
            title='Average',
            content='It was okay.'
        )

        # Average should be (5 + 3) / 2 = 4.0
        self.assertEqual(self.hotel.average_rating, 4.0)
        self.assertEqual(self.hotel.review_count, 2)

    def test_payment_linked_to_booking(self):
        """Test payment can be linked to a booking"""
        booking = Booking.objects.create(
            user=self.user,
            room_type=self.room_type,
            check_in=date.today() + timedelta(days=30),
            check_out=date.today() + timedelta(days=35),
            num_guests=2,
            guest_first_name='John',
            guest_last_name='Doe',
            guest_email='john@example.com',
            guest_phone='+1-555-0123',
            price_per_night=Decimal('150.00'),
            num_nights=5,
            subtotal=Decimal('750.00'),
            taxes=Decimal('112.50'),
            total_price=Decimal('862.50'),
            status='confirmed'
        )

        payment = Payment.objects.create(
            booking=booking,
            amount=Decimal('862.50'),
            payment_method='credit_card',
            transaction_id='TXN12345',
            status='completed',
            card_last4='1234',
            card_brand='Visa'
        )

        self.assertEqual(booking.payment, payment)
        self.assertEqual(payment.booking, booking)
