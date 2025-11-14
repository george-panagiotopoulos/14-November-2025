// Hotel details page logic

let currentHotel = null;
let hotelReviews = [];

document.addEventListener('DOMContentLoaded', async function() {
    // Get hotel ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = parseInt(urlParams.get('id'));

    if (!hotelId) {
        window.location.href = 'search.html';
        return;
    }

    // Load hotel data
    const hotels = await loadData('hotels.json');
    currentHotel = hotels.find(h => h.id === hotelId);

    if (!currentHotel) {
        alert('Hotel not found');
        window.location.href = 'search.html';
        return;
    }

    // Load reviews for this hotel
    const allReviews = await loadData('reviews.json');
    hotelReviews = allReviews.filter(r => r.hotel_id === hotelId);

    // Render hotel details
    renderHotelDetails();
    setupImageGallery();
    renderRoomTypes();
    renderReviews();
    setupBookingWidget();
});

function renderHotelDetails() {
    // Basic info
    document.getElementById('hotel-name').textContent = currentHotel.name;
    document.getElementById('hotel-location').textContent = currentHotel.location;
    document.getElementById('hotel-description').textContent = currentHotel.description;
    document.getElementById('hotel-stars').textContent = getStarRating(currentHotel.star_rating);
    document.getElementById('hotel-rating').textContent = currentHotel.guest_rating;

    // Important info
    document.getElementById('check-in-time').textContent = currentHotel.check_in_time;
    document.getElementById('check-out-time').textContent = currentHotel.check_out_time;
    document.getElementById('cancellation-policy').textContent = currentHotel.cancellation_policy;

    // Amenities
    const amenitiesContainer = document.getElementById('hotel-amenities');
    amenitiesContainer.innerHTML = currentHotel.amenities.map(amenity =>
        `<span class="amenity-tag" style="padding: 0.5rem 1rem; font-size: 0.95rem;">✓ ${amenity}</span>`
    ).join('');

    // Price in widget
    document.getElementById('widget-price').textContent = `$${currentHotel.price_per_night}`;
}

function setupImageGallery() {
    const mainImage = document.getElementById('main-image');
    const thumbnailStrip = document.getElementById('thumbnail-strip');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');

    // Set main image
    mainImage.src = currentHotel.images[0];
    lightboxImage.src = currentHotel.images[0];

    // Create thumbnails
    currentHotel.images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumbnail.onclick = () => {
            mainImage.src = img;
            lightboxImage.src = img;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        };
        thumbnailStrip.appendChild(thumbnail);
    });

    // Lightbox functionality
    mainImage.onclick = () => {
        lightbox.classList.add('active');
    };

    lightboxClose.onclick = () => {
        lightbox.classList.remove('active');
    };

    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    };
}

function renderRoomTypes() {
    const roomTypesContainer = document.getElementById('room-types');
    const roomTypeSelect = document.getElementById('booking-room-type');

    // Mock room types for this hotel
    const roomTypes = [
        {
            id: 1,
            name: 'Standard Room',
            description: 'Comfortable room with all essential amenities',
            size: 25,
            max_occupancy: 2,
            bed_type: 'Queen Bed',
            price: currentHotel.price_per_night,
            image: currentHotel.images[1] || currentHotel.images[0]
        },
        {
            id: 2,
            name: 'Deluxe Room',
            description: 'Spacious room with premium furnishings and city view',
            size: 35,
            max_occupancy: 3,
            bed_type: 'King Bed',
            price: currentHotel.price_per_night * 1.3,
            image: currentHotel.images[2] || currentHotel.images[0]
        },
        {
            id: 3,
            name: 'Suite',
            description: 'Luxurious suite with separate living area and panoramic views',
            size: 50,
            max_occupancy: 4,
            bed_type: 'King Bed + Sofa Bed',
            price: currentHotel.price_per_night * 1.8,
            image: currentHotel.images[0]
        }
    ];

    roomTypes.forEach(room => {
        // Add to select dropdown
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = `${room.name} - $${Math.round(room.price)}/night`;
        option.dataset.price = room.price;
        roomTypeSelect.appendChild(option);

        // Create room card
        const card = document.createElement('div');
        card.className = 'room-card';
        card.innerHTML = `
            <img src="${room.image}" alt="${room.name}" class="room-image">
            <div>
                <h3 style="margin-bottom: 0.5rem;">${room.name}</h3>
                <p style="color: var(--gray-600); margin-bottom: 0.75rem;">${room.description}</p>
                <div style="display: flex; gap: 1.5rem; font-size: 0.9rem; color: var(--gray-700);">
                    <span>📐 ${room.size} m²</span>
                    <span>👥 Up to ${room.max_occupancy} guests</span>
                    <span>🛏️ ${room.bed_type}</span>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-size: 1.75rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">
                    $${Math.round(room.price)}
                </div>
                <div style="font-size: 0.85rem; color: var(--gray-600); margin-bottom: 1rem;">per night</div>
                <button class="btn btn-primary" onclick="selectRoom(${room.id})">Select Room</button>
            </div>
        `;
        roomTypesContainer.appendChild(card);
    });
}

function selectRoom(roomId) {
    document.getElementById('booking-room-type').value = roomId;
    updatePriceCalculation();

    // Scroll to booking widget
    document.querySelector('.booking-widget').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function renderReviews() {
    const reviewsList = document.getElementById('reviews-list');

    if (hotelReviews.length === 0) {
        reviewsList.innerHTML = '<p style="text-align: center; color: var(--gray-600); padding: 2rem;">No reviews yet. Be the first to review!</p>';
        return;
    }

    // Calculate average ratings
    const avgCleanliness = hotelReviews.reduce((sum, r) => sum + r.cleanliness_rating, 0) / hotelReviews.length;
    const avgLocation = hotelReviews.reduce((sum, r) => sum + r.location_rating, 0) / hotelReviews.length;
    const avgService = hotelReviews.reduce((sum, r) => sum + r.service_rating, 0) / hotelReviews.length;
    const avgValue = hotelReviews.reduce((sum, r) => sum + r.value_rating, 0) / hotelReviews.length;

    // Update rating bars
    document.getElementById('cleanliness-bar').style.width = (avgCleanliness / 5 * 100) + '%';
    document.getElementById('cleanliness-score').textContent = avgCleanliness.toFixed(1);
    document.getElementById('location-bar').style.width = (avgLocation / 5 * 100) + '%';
    document.getElementById('location-score').textContent = avgLocation.toFixed(1);
    document.getElementById('service-bar').style.width = (avgService / 5 * 100) + '%';
    document.getElementById('service-score').textContent = avgService.toFixed(1);
    document.getElementById('value-bar').style.width = (avgValue / 5 * 100) + '%';
    document.getElementById('value-score').textContent = avgValue.toFixed(1);

    // Render reviews
    hotelReviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.style.marginBottom = '1.5rem';
        reviewCard.innerHTML = `
            <div class="review-header">
                <img src="${review.user_photo}" alt="${review.user_name}" class="review-avatar">
                <div class="review-meta">
                    <h4>${review.user_name}</h4>
                    <div class="stars" style="color: var(--secondary-color);">${getStarRating(review.overall_rating)}</div>
                    <div class="review-date">${formatDate(review.date)}</div>
                </div>
            </div>
            <h3 class="review-title">${review.title}</h3>
            <p class="review-content">${review.content}</p>
            <div class="review-footer">
                <button class="helpful-btn">👍 Helpful (${review.helpful_count})</button>
                ${review.verified ? '<span style="color: var(--success-color); font-size: 0.85rem;">✓ Verified Stay</span>' : ''}
            </div>
        `;
        reviewsList.appendChild(reviewCard);
    });
}

function setupBookingWidget() {
    const form = document.getElementById('booking-form');
    const checkInInput = document.getElementById('booking-check-in');
    const checkOutInput = document.getElementById('booking-check-out');
    const roomTypeSelect = document.getElementById('booking-room-type');

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    checkInInput.min = today;
    checkInInput.value = today;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOutInput.min = tomorrow.toISOString().split('T')[0];
    checkOutInput.value = tomorrow.toISOString().split('T')[0];

    // Update price when dates or room changes
    checkInInput.addEventListener('change', function() {
        const nextDay = new Date(this.value);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        if (checkOutInput.value <= this.value) {
            checkOutInput.value = nextDay.toISOString().split('T')[0];
        }
        updatePriceCalculation();
    });

    checkOutInput.addEventListener('change', updatePriceCalculation);
    roomTypeSelect.addEventListener('change', updatePriceCalculation);

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!isLoggedIn()) {
            if (confirm('Please sign in to make a booking. Go to sign in page?')) {
                sessionStorage.setItem('redirectAfterLogin', window.location.href);
                window.location.href = 'signin.html';
            }
            return;
        }

        // Store booking data
        const bookingData = {
            hotel_id: currentHotel.id,
            hotel_name: currentHotel.name,
            hotel_image: currentHotel.images[0],
            hotel_location: currentHotel.location,
            check_in: checkInInput.value,
            check_out: checkOutInput.value,
            guests: document.getElementById('booking-guests').value,
            room_type_id: roomTypeSelect.value,
            room_type_name: roomTypeSelect.options[roomTypeSelect.selectedIndex].text.split(' - ')[0],
            price_per_night: parseFloat(roomTypeSelect.options[roomTypeSelect.selectedIndex].dataset.price),
            nights: calculateNights(checkInInput.value, checkOutInput.value),
            subtotal: parseFloat(document.getElementById('subtotal').textContent.replace('$', '')),
            taxes: parseFloat(document.getElementById('taxes').textContent.replace('$', '')),
            total: parseFloat(document.getElementById('total-price').textContent.replace('$', ''))
        };

        sessionStorage.setItem('pendingBooking', JSON.stringify(bookingData));
        window.location.href = 'checkout.html';
    });
}

function updatePriceCalculation() {
    const checkIn = document.getElementById('booking-check-in').value;
    const checkOut = document.getElementById('booking-check-out').value;
    const roomTypeSelect = document.getElementById('booking-room-type');

    if (!checkIn || !checkOut || !roomTypeSelect.value) {
        return;
    }

    const nights = calculateNights(checkIn, checkOut);
    const pricePerNight = parseFloat(roomTypeSelect.options[roomTypeSelect.selectedIndex].dataset.price);
    const subtotal = pricePerNight * nights;
    const taxes = subtotal * 0.15; // 15% tax
    const total = subtotal + taxes;

    document.getElementById('price-calculation').textContent = `$${Math.round(pricePerNight)} × ${nights} night${nights > 1 ? 's' : ''}`;
    document.getElementById('subtotal').textContent = `$${Math.round(subtotal)}`;
    document.getElementById('taxes').textContent = `$${Math.round(taxes)}`;
    document.getElementById('total-price').textContent = `$${Math.round(total)}`;
}

// Make selectRoom available globally
window.selectRoom = selectRoom;
