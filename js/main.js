// Main application logic and utilities

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Update navigation based on auth state
function updateNavigation() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const myBookingsLink = document.getElementById('my-bookings-link');

    if (isLoggedIn()) {
        const user = getCurrentUser();
        if (authButtons) authButtons.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            const avatar = document.getElementById('user-avatar');
            if (avatar && user.profile_photo) {
                avatar.src = user.profile_photo;
            }
        }
        if (myBookingsLink) {
            myBookingsLink.classList.remove('hidden');
            myBookingsLink.href = 'bookings.html';
        }
    } else {
        if (authButtons) authButtons.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
        if (myBookingsLink) myBookingsLink.classList.add('hidden');
    }
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Add click handler to user avatar for dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();

    const userAvatar = document.getElementById('user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            const existingMenu = document.querySelector('.user-dropdown');
            if (existingMenu) {
                existingMenu.remove();
                return;
            }

            const dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            dropdown.style.cssText = `
                position: absolute;
                top: 50px;
                right: 0;
                background: white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-radius: 8px;
                min-width: 200px;
                z-index: 1001;
            `;

            const user = getCurrentUser();
            const myProfileText = window.i18n ? i18n.t('nav.myProfile', 'My Profile') : 'My Profile';
            const myBookingsText = window.i18n ? i18n.t('nav.myBookings', 'My Bookings') : 'My Bookings';
            const myReviewsText = window.i18n ? i18n.t('nav.myReviews', 'My Reviews') : 'My Reviews';
            const logoutText = window.i18n ? i18n.t('nav.logout', 'Logout') : 'Logout';

            dropdown.innerHTML = `
                <div style="padding: 1rem; border-bottom: 1px solid var(--gray-200);">
                    <div style="font-weight: 600;">${user.first_name} ${user.last_name}</div>
                    <div style="font-size: 0.85rem; color: var(--gray-600);">${user.email}</div>
                </div>
                <div style="padding: 0.5rem 0;">
                    <a href="profile.html" style="display: block; padding: 0.75rem 1rem; color: var(--gray-700); text-decoration: none;">${myProfileText}</a>
                    <a href="bookings.html" style="display: block; padding: 0.75rem 1rem; color: var(--gray-700); text-decoration: none;">${myBookingsText}</a>
                    <a href="my-reviews.html" style="display: block; padding: 0.75rem 1rem; color: var(--gray-700); text-decoration: none;">${myReviewsText}</a>
                    <a href="#" id="logout-btn" style="display: block; padding: 0.75rem 1rem; color: var(--danger-color); text-decoration: none; border-top: 1px solid var(--gray-200);">${logoutText}</a>
                </div>
            `;

            userMenu.appendChild(dropdown);

            document.getElementById('logout-btn').addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });

            // Close dropdown when clicking outside
            setTimeout(() => {
                document.addEventListener('click', function closeDropdown() {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdown);
                });
            }, 0);
        });
    }
});

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to generate star rating HTML
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    return stars;
}

// Utility function to calculate nights between dates
function calculateNights(checkIn, checkOut) {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Load data from JSON files
async function loadData(filename) {
    try {
        const response = await fetch(`data/${filename}`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return [];
    }
}

// Set minimum date for date inputs to today
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    if (checkInInput) {
        checkInInput.min = today;
        checkInInput.value = today;

        checkInInput.addEventListener('change', function() {
            if (checkOutInput) {
                const nextDay = new Date(this.value);
                nextDay.setDate(nextDay.getDate() + 1);
                checkOutInput.min = nextDay.toISOString().split('T')[0];
                if (checkOutInput.value && checkOutInput.value <= this.value) {
                    checkOutInput.value = nextDay.toISOString().split('T')[0];
                }
            }
        });
    }

    if (checkOutInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
        checkOutInput.value = tomorrow.toISOString().split('T')[0];
    }
}

// Initialize date inputs
document.addEventListener('DOMContentLoaded', setMinDates);
