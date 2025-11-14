// Checkout page logic

let bookingData = null;

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!isLoggedIn()) {
        alert('Please sign in to continue with booking');
        window.location.href = 'signin.html';
        return;
    }

    // Get booking data from sessionStorage
    const bookingDataStr = sessionStorage.getItem('pendingBooking');
    if (!bookingDataStr) {
        alert('No booking data found');
        window.location.href = 'search.html';
        return;
    }

    bookingData = JSON.parse(bookingDataStr);
    const user = getCurrentUser();

    // Pre-fill guest details with user data
    document.getElementById('guest-first-name').value = user.first_name;
    document.getElementById('guest-last-name').value = user.last_name;
    document.getElementById('guest-email').value = user.email;
    document.getElementById('guest-phone').value = user.phone || '';

    // Render booking summary
    renderBookingSummary();

    // Setup form submission
    document.getElementById('complete-booking-btn').addEventListener('click', completeBooking);

    // Format card number input
    document.getElementById('card-number').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
});

function renderBookingSummary() {
    document.getElementById('summary-image').src = bookingData.hotel_image;
    document.getElementById('summary-hotel-name').textContent = bookingData.hotel_name;
    document.getElementById('summary-location').textContent = bookingData.hotel_location;
    document.getElementById('summary-checkin').textContent = formatDate(bookingData.check_in);
    document.getElementById('summary-checkout').textContent = formatDate(bookingData.check_out);
    document.getElementById('summary-guests').textContent = bookingData.guests + ' guest' + (bookingData.guests > 1 ? 's' : '');
    document.getElementById('summary-room').textContent = bookingData.room_type_name;
    document.getElementById('summary-calculation').textContent = `$${Math.round(bookingData.price_per_night)} × ${bookingData.nights} night${bookingData.nights > 1 ? 's' : ''}`;
    document.getElementById('summary-subtotal').textContent = `$${Math.round(bookingData.subtotal)}`;
    document.getElementById('summary-taxes').textContent = `$${Math.round(bookingData.taxes)}`;
    document.getElementById('summary-total').textContent = `$${Math.round(bookingData.total)}`;
}

function completeBooking() {
    // Validate form
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Validate payment fields
    const cardNumber = document.getElementById('card-number').value;
    const cardMonth = document.getElementById('card-month').value;
    const cardYear = document.getElementById('card-year').value;
    const cardCvv = document.getElementById('card-cvv').value;

    if (!cardNumber || !cardMonth || !cardYear || !cardCvv) {
        alert('Please fill in all payment information');
        return;
    }

    // Show loading state
    const btn = document.getElementById('complete-booking-btn');
    btn.disabled = true;
    btn.textContent = 'Processing...';

    // Simulate payment processing
    setTimeout(() => {
        // Create booking object
        const booking = {
            booking_reference: generateBookingReference(),
            ...bookingData,
            guest_first_name: document.getElementById('guest-first-name').value,
            guest_last_name: document.getElementById('guest-last-name').value,
            guest_email: document.getElementById('guest-email').value,
            guest_phone: document.getElementById('guest-phone').value,
            special_requests: document.getElementById('special-requests').value,
            status: 'confirmed',
            booked_at: new Date().toISOString(),
            card_last4: cardNumber.replace(/\s/g, '').slice(-4)
        };

        // Save booking to localStorage
        let bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('userBookings', JSON.stringify(bookings));

        // Store current booking for confirmation page
        sessionStorage.setItem('completedBooking', JSON.stringify(booking));
        sessionStorage.removeItem('pendingBooking');

        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    }, 2000);
}

function generateBookingReference() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let reference = '';
    for (let i = 0; i < 8; i++) {
        reference += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return reference;
}
