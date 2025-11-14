// Authentication logic

document.addEventListener('DOMContentLoaded', async function() {
    const signinForm = document.getElementById('signin-form');
    const registerForm = document.getElementById('register-form');

    // Handle sign in
    if (signinForm) {
        signinForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Load users from JSON
            const users = await loadData('users.json');

            // Find user
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store user in localStorage (excluding password)
                const { password: _, ...userWithoutPassword } = user;
                localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));

                // Redirect to home or previous page
                window.location.href = 'index.html';
            } else {
                // Show error
                const errorDiv = document.getElementById('error-message');
                errorDiv.textContent = 'Invalid email or password';
                errorDiv.classList.remove('hidden');
            }
        });
    }

    // Handle registration
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Validate password match
            if (password !== confirmPassword) {
                const errorDiv = document.getElementById('error-message');
                errorDiv.textContent = 'Passwords do not match';
                errorDiv.classList.remove('hidden');
                return;
            }

            // Create new user object
            const newUser = {
                id: Date.now(),
                email,
                first_name: firstName,
                last_name: lastName,
                phone,
                profile_photo: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)
            };

            // Store user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            // Redirect to home
            window.location.href = 'index.html';
        });
    }
});
