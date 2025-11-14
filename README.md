# TravelHub - Travel Portal Application

A comprehensive web-based travel booking platform that allows users to search, compare, and book hotels worldwide.

## Project Overview

TravelHub is being developed in phases following a structured approach:

### Phase 1: MVP Implementation
- **Step 1 (Current)**: Mock User Interface with frontend prototype
- **Step 2 (Upcoming)**: Backend implementation with Django and SQLite

## Current Features (Mock UI - Phase 1, Step 1)

### User Features
- ✅ User registration and authentication
- ✅ User profile management
- ✅ Search hotels by destination
- ✅ Advanced filtering (price, rating, amenities, hotel type)
- ✅ Sort results (price, rating, popularity)
- ✅ View detailed hotel information
- ✅ Image gallery with lightbox
- ✅ Room type selection
- ✅ Complete booking flow
- ✅ Booking management (view, cancel)
- ✅ Review system (write, view, rate)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ **Multilingual support (English & Mandarin Chinese)**
- ✅ **Language switcher with flag icons**

### Technical Stack (Current)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: Browser localStorage (mock data)
- **Mock Data**: JSON files for destinations, hotels, reviews, users

## Getting Started

### Prerequisites
- Python 3.x (for running local web server)
- Modern web browser
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/george-panagiotopoulos/14-November-2025.git
cd 14-November-2025/travel_portal_ui
```

2. Start the application using the startup script:
```bash
./start.sh
```

Or manually:
```bash
python3 -m http.server 8787
```

3. Open your browser and navigate to:
```
http://localhost:8787
```

### Demo Account
Use these credentials to test the application:
- Email: `demo@example.com`
- Password: `password123`

## Project Structure

```
travel_portal_ui/
├── index.html              # Home page
├── search.html             # Hotel search results
├── hotel.html              # Hotel details
├── signin.html             # Sign in page
├── register.html           # Registration page
├── checkout.html           # Booking checkout
├── confirmation.html       # Booking confirmation
├── bookings.html           # User bookings
├── profile.html            # User profile
├── write-review.html       # Write review
├── my-reviews.html         # User reviews
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── i18n.js            # Internationalization library
│   ├── main.js            # Core utilities
│   ├── home.js            # Home page logic
│   ├── search.js          # Search functionality
│   ├── hotel.js           # Hotel details
│   ├── auth.js            # Authentication
│   └── checkout.js        # Checkout flow
├── data/
│   ├── translations/      # Translation files
│   │   ├── en.json       # English translations
│   │   └── zh.json       # Mandarin Chinese translations
│   ├── destinations.json  # Mock destinations
│   ├── hotels.json        # Mock hotels
│   ├── reviews.json       # Mock reviews
│   └── users.json         # Mock users
├── images/                # Image assets
├── .env                   # Environment configuration (not in git)
├── .env.example          # Example environment config
├── .gitignore            # Git ignore rules
├── claude.md             # Code preferences & standards
└── start.sh              # Application startup script
```

## User Flow

1. **Browse**: Visit home page, view featured destinations and hotels
2. **Search**: Use search widget or navigate to search page
3. **Filter**: Apply filters to narrow down results
4. **View Details**: Click on hotel to see full information
5. **Book**: Select room type, dates, and complete booking
6. **Manage**: View bookings, cancel if needed
7. **Review**: Write reviews for past stays

## Design Documentation

See the following files for detailed design specifications:
- `system_design.md` - High-level system architecture
- `phase_1.md` - Detailed Phase 1 implementation plan

## Upcoming Features (Phase 1, Step 2)

- Django backend with REST API
- SQLite database
- Real authentication and authorization
- Server-side search and filtering
- Email notifications
- Payment gateway integration
- Admin panel for hotel management

## Development

### Branches
- `main` - Stable production-ready code
- `development` - Active development branch

### Contributing
This is currently a learning/demonstration project.

## Technologies

### Current (Phase 1, Step 1)
- HTML5
- CSS3 (Custom styling with CSS Variables)
- Vanilla JavaScript (ES6+)
- LocalStorage API

### Planned (Phase 1, Step 2)
- Python 3.10+
- Django 5.0+
- Django REST Framework
- SQLite3
- Pillow (image handling)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational purposes.

## Contact

George Panagiotopoulos
- GitHub: [@george-panagiotopoulos](https://github.com/george-panagiotopoulos)

## Acknowledgments

- Design inspiration from modern travel booking platforms
- Unsplash for placeholder images
- Pravatar for user avatars
