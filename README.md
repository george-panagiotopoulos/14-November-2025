# TravelHub - Complete Travel Portal Application

A full-stack web-based travel booking platform with Django backend and vanilla JavaScript frontend.

## Project Status

**Phase 1 - Step 1**: ✅ Mock UI Complete
**Phase 1 - Step 2**: 🔄 Backend Foundation Complete

## Project Structure

```
travel_portal/
├── travel_portal_ui/          # Frontend (Mock UI - Phase 1.1)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── data/                  # Mock JSON data
│
├── travel_portal_backend/     # Django Backend (Phase 1.2)
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── apps/                      # Django Applications
│   ├── users/                 # User management & auth
│   ├── hotels/                # Hotels & destinations
│   ├── bookings/              # Booking system
│   └── reviews/               # Review system
│
├── tests/                     # Integration tests
├── requirements.txt
└── manage.py
```

## Features

### Frontend (Mock UI)
- ✅ User authentication (sign in/register)
- ✅ Hotel search with advanced filters
- ✅ Hotel details with booking widget
- ✅ Complete booking flow
- ✅ User dashboard (profile, bookings, reviews)
- ✅ Review system
- ✅ Responsive design

### Backend (Django + SQLite)
- ✅ Custom User model with profiles
- ✅ Hotel & destination management
- ✅ Room types with availability checking
- ✅ Booking system with auto-generated references
- ✅ Payment tracking
- ✅ Review system with auto-verification
- ✅ Django admin panel configured
- ✅ Comprehensive test suite (9 tests passing)

## Technology Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- LocalStorage for mock data persistence

**Backend:**
- Python 3.12
- Django 5.2.8
- Django REST Framework 3.16.1
- SQLite3
- Pillow (image handling)

## Getting Started

### Prerequisites
- Python 3.10+
- Modern web browser

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/george-panagiotopoulos/14-November-2025.git
cd 14-November-2025
```

2. **Set up Python environment:**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Run database migrations:**
```bash
python manage.py migrate
```

4. **Create superuser (optional):**
```bash
python manage.py createsuperuser
# Username: admin
# Password: admin123 (or your choice)
```

5. **Start the Django development server:**
```bash
python manage.py runserver 8000
```

6. **In a separate terminal, start the frontend server:**
```bash
cd travel_portal_ui
python3 -m http.server 8787
```

7. **Access the application:**
- Frontend: http://localhost:8787
- Django Admin: http://localhost:8000/admin
- API (future): http://localhost:8000/api

## Testing

Run the test suite:
```bash
python manage.py test
```

Current test coverage:
- ✅ User model tests
- ✅ Hotel and destination relationships
- ✅ Booking creation and validation
- ✅ Room availability checking
- ✅ Review auto-verification
- ✅ Payment linking
- ✅ Rating calculations

All 9 tests passing!

## Demo Credentials

**Frontend Mock Account:**
- Email: demo@example.com
- Password: password123

**Django Admin:**
- Username: admin
- Password: admin123

## Database Schema

### Users App
- **User**: Custom user model with phone, profile photo
- **UserPreference**: User settings and preferences
- **SavedSearch**: Saved search history

### Hotels App
- **Destination**: Cities and countries
- **Hotel**: Hotel listings with star ratings
- **HotelImage**: Multiple images per hotel
- **Amenity**: Reusable amenities
- **RoomType**: Different room categories with pricing

### Bookings App
- **Booking**: Booking records with auto-generated references
- **Payment**: Payment transactions linked to bookings

### Reviews App
- **Review**: Hotel reviews with 5-category ratings
- **ReviewPhoto**: Optional review images
- **ReviewVote**: Helpful/not helpful votes

## API Endpoints (Coming Soon)

Phase 1 - Step 3 will implement REST API endpoints for:
- User authentication and registration
- Hotel search and filtering
- Booking creation and management
- Review submission and retrieval

## Development Roadmap

### Completed
- [x] Phase 1.1: Frontend mock UI with all pages
- [x] Phase 1.2a: Django project setup
- [x] Phase 1.2b: Database models
- [x] Phase 1.2c: Migrations and database creation
- [x] Phase 1.2d: Admin panel configuration
- [x] Phase 1.2e: Automated tests

### Next Steps
- [ ] Phase 1.2f: REST API serializers
- [ ] Phase 1.2g: API views and endpoints
- [ ] Phase 1.2h: Sample data population
- [ ] Phase 1.2i: Frontend-backend integration
- [ ] Phase 2: Flight booking integration
- [ ] Phase 3: Payment gateway (Stripe)
- [ ] Phase 4: Email notifications

## Contributing

This is a learning/demonstration project.

## License

Educational purposes.

## Author

George Panagiotopoulos
- GitHub: [@george-panagiotopoulos](https://github.com/george-panagiotopoulos)

## Acknowledgments

- Django documentation
- Django REST Framework
- Unsplash for images
- Claude Code for development assistance
