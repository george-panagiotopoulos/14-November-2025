// Home page specific logic

document.addEventListener('DOMContentLoaded', async function() {
    // Load destinations
    const destinations = await loadData('destinations.json');
    const destinationsGrid = document.getElementById('destinations-grid');

    if (destinationsGrid && destinations.length > 0) {
        destinations.slice(0, 6).forEach(dest => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${dest.city}</h3>
                    <p class="card-subtitle">${dest.country}</p>
                    <p class="card-description">${dest.description}</p>
                    <div class="card-footer">
                        <div>
                            <span class="price">$${dest.starting_price}</span>
                            <span class="price-label">/night</span>
                        </div>
                        <a href="search.html?destination=${encodeURIComponent(dest.city)}" class="btn btn-primary">Explore</a>
                    </div>
                </div>
            `;
            destinationsGrid.appendChild(card);
        });
    }

    // Load featured hotels
    const hotels = await loadData('hotels.json');
    const hotelsGrid = document.getElementById('hotels-grid');

    if (hotelsGrid && hotels.length > 0) {
        hotels.slice(0, 6).forEach(hotel => {
            const card = document.createElement('div');
            card.className = 'card hotel-card';
            card.onclick = () => window.location.href = `hotel.html?id=${hotel.id}`;
            card.innerHTML = `
                <img src="${hotel.images[0]}" alt="${hotel.name}" class="card-image">
                <div class="card-content">
                    <div class="hotel-rating">
                        <span class="stars">${getStarRating(hotel.star_rating)}</span>
                        <span class="guest-rating">${hotel.guest_rating}</span>
                    </div>
                    <h3 class="card-title">${hotel.name}</h3>
                    <p class="card-subtitle">${hotel.location}</p>
                    <div class="amenities">
                        ${hotel.amenities.slice(0, 3).map(amenity =>
                            `<span class="amenity-tag">${amenity}</span>`
                        ).join('')}
                    </div>
                    <div class="card-footer">
                        <div>
                            <span class="price">$${hotel.price_per_night}</span>
                            <span class="price-label">/night</span>
                        </div>
                        <span style="color: var(--gray-600); font-size: 0.85rem;">${hotel.review_count} reviews</span>
                    </div>
                </div>
            `;
            hotelsGrid.appendChild(card);
        });
    }

    // Load reviews
    const reviews = await loadData('reviews.json');
    const reviewsContainer = document.getElementById('reviews-container');

    if (reviewsContainer && reviews.length > 0) {
        reviews.slice(0, 3).forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';
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
            reviewsContainer.appendChild(reviewCard);
        });
    }

    // Handle search form submission
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const destination = document.getElementById('destination').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const guests = document.getElementById('guests').value;

            // Store search params in sessionStorage
            const searchParams = {
                destination,
                checkIn,
                checkOut,
                guests
            };
            sessionStorage.setItem('searchParams', JSON.stringify(searchParams));

            // Redirect to search page
            window.location.href = `search.html?destination=${encodeURIComponent(destination)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
        });
    }
});
