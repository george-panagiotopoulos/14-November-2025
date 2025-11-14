// Search page logic

let allHotels = [];
let filteredHotels = [];

document.addEventListener('DOMContentLoaded', async function() {
    // Load all hotels
    allHotels = await loadData('hotels.json');
    filteredHotels = [...allHotels];

    // Get search params from URL
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('destination');

    // Filter by destination if specified
    if (destination) {
        filteredHotels = allHotels.filter(hotel =>
            hotel.location.toLowerCase().includes(destination.toLowerCase())
        );
    }

    // Initial render
    renderHotels();

    // Setup filter listeners
    setupFilters();
});

function renderHotels() {
    const hotelsList = document.getElementById('hotels-list');
    const resultsCount = document.getElementById('results-count');

    if (!hotelsList) return;

    resultsCount.textContent = `${filteredHotels.length} hotels found`;

    if (filteredHotels.length === 0) {
        hotelsList.innerHTML = '<p style="text-align: center; padding: 3rem; color: var(--gray-600);">No hotels found matching your criteria. Try adjusting your filters.</p>';
        return;
    }

    hotelsList.innerHTML = '';

    filteredHotels.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'card hotel-card';
        card.style.cursor = 'pointer';
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
                <p class="card-description">${hotel.description.substring(0, 150)}...</p>
                <div class="amenities">
                    ${hotel.amenities.slice(0, 5).map(amenity =>
                        `<span class="amenity-tag">${amenity}</span>`
                    ).join('')}
                </div>
                <div class="card-footer">
                    <div>
                        <span class="price">$${hotel.price_per_night}</span>
                        <span class="price-label">/night</span>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: var(--gray-600); font-size: 0.85rem;">${hotel.review_count} reviews</div>
                        <button class="btn btn-primary" style="margin-top: 0.5rem;">View Details</button>
                    </div>
                </div>
            </div>
        `;

        hotelsList.appendChild(card);
    });
}

function setupFilters() {
    // Price range filter
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');

    if (priceRange) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value >= 500 ? '$500+' : '$' + this.value;
            applyFilters();
        });
    }

    // Star rating filters
    document.querySelectorAll('[id^="star-"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Hotel type filters
    document.querySelectorAll('.hotel-type-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Amenity filters
    document.querySelectorAll('.amenity-filter').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Sort by
    const sortBy = document.getElementById('sort-by');
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            sortHotels(this.value);
            renderHotels();
        });
    }

    // Clear filters
    const clearFilters = document.getElementById('clear-filters');
    if (clearFilters) {
        clearFilters.addEventListener('click', function() {
            // Reset all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            // Reset price range
            if (priceRange) {
                priceRange.value = 500;
                priceValue.textContent = '$500+';
            }
            // Reset filters
            filteredHotels = [...allHotels];
            renderHotels();
        });
    }
}

function applyFilters() {
    filteredHotels = [...allHotels];

    // Price filter
    const maxPrice = parseInt(document.getElementById('price-range').value);
    if (maxPrice < 500) {
        filteredHotels = filteredHotels.filter(hotel => hotel.price_per_night <= maxPrice);
    }

    // Star rating filter
    const selectedStars = [];
    document.querySelectorAll('[id^="star-"]:checked').forEach(cb => {
        selectedStars.push(parseInt(cb.value));
    });
    if (selectedStars.length > 0) {
        filteredHotels = filteredHotels.filter(hotel => selectedStars.includes(hotel.star_rating));
    }

    // Hotel type filter
    const selectedTypes = [];
    document.querySelectorAll('.hotel-type-filter:checked').forEach(cb => {
        selectedTypes.push(cb.value);
    });
    if (selectedTypes.length > 0) {
        filteredHotels = filteredHotels.filter(hotel => selectedTypes.includes(hotel.hotel_type));
    }

    // Amenity filter
    const selectedAmenities = [];
    document.querySelectorAll('.amenity-filter:checked').forEach(cb => {
        selectedAmenities.push(cb.value);
    });
    if (selectedAmenities.length > 0) {
        filteredHotels = filteredHotels.filter(hotel => {
            return selectedAmenities.every(amenity => hotel.amenities.includes(amenity));
        });
    }

    renderHotels();
}

function sortHotels(sortType) {
    switch(sortType) {
        case 'price-low':
            filteredHotels.sort((a, b) => a.price_per_night - b.price_per_night);
            break;
        case 'price-high':
            filteredHotels.sort((a, b) => b.price_per_night - a.price_per_night);
            break;
        case 'rating':
            filteredHotels.sort((a, b) => b.guest_rating - a.guest_rating);
            break;
        default:
            filteredHotels.sort((a, b) => b.review_count - a.review_count);
    }
}
