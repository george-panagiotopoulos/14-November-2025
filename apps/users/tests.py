from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import UserPreference, SavedSearch
from datetime import date, timedelta

User = get_user_model()


class UserModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            phone='+1-555-0123'
        )

    def test_user_creation(self):
        """Test user is created with correct attributes"""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.phone, '+1-555-0123')
        self.assertTrue(self.user.check_password('testpass123'))

    def test_user_str_method(self):
        """Test user string representation"""
        self.assertEqual(str(self.user), 'test@example.com')


class UserPreferenceModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.preference = UserPreference.objects.create(
            user=self.user,
            preferred_currency='EUR',
            budget_range_min=100,
            budget_range_max=500
        )

    def test_preference_creation(self):
        """Test user preference is created correctly"""
        self.assertEqual(self.preference.user, self.user)
        self.assertEqual(self.preference.preferred_currency, 'EUR')
        self.assertEqual(self.preference.budget_range_min, 100)
        self.assertEqual(self.preference.budget_range_max, 500)

    def test_preference_str_method(self):
        """Test preference string representation"""
        self.assertEqual(str(self.preference), f"Preferences for {self.user.username}")


class SavedSearchModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.search = SavedSearch.objects.create(
            user=self.user,
            destination='Paris',
            check_in=date.today() + timedelta(days=30),
            check_out=date.today() + timedelta(days=35),
            guests=2
        )

    def test_saved_search_creation(self):
        """Test saved search is created correctly"""
        self.assertEqual(self.search.user, self.user)
        self.assertEqual(self.search.destination, 'Paris')
        self.assertEqual(self.search.guests, 2)

    def test_saved_search_ordering(self):
        """Test saved searches are ordered by creation date descending"""
        search2 = SavedSearch.objects.create(
            user=self.user,
            destination='London',
            check_in=date.today() + timedelta(days=60),
            check_out=date.today() + timedelta(days=65),
            guests=1
        )
        searches = SavedSearch.objects.all()
        self.assertEqual(searches[0], search2)  # Most recent first
