const signupForm = document.getElementById('signup-form');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const matchError = document.getElementById("matchError");
const strengthBar = document.getElementById("strength-bar");

usernameInput.addEventListener("keyup", validateUsername);
passwordInput.addEventListener("keyup", validatePassword);

signupForm.addEventListener("submit", function (event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

function validateUsername() {
    if (usernameInput.value.length < 8) {
        nameError.innerHTML = "Username should be at least 8 characters long"
        return false;
    } else {
        nameError.innerHTML = "";
        checkUsernameUniqueness();
        return true;
    }
}

function checkUsernameUniqueness() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../../process/check_username.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (!response.unique) {
                nameError.innerHTML = "Username already exists";
            } else {
                nameError.innerHTML = "";
            }
        }
    };
    xhr.send('username=' + encodeURIComponent(usernameInput.value));
}

function validatePassword() {
    let password = passwordInput.value;
    let strength = 0;

    if (password.length >= 8) strength++; // Check length
    if (/[A-Z]/.test(password)) strength++; // Check uppercase
    if (/[a-z]/.test(password)) strength++; // Check lowercase
    if (/[0-9]/.test(password)) strength++; // Check number
    if (/[^A-Za-z0-9]/.test(password)) strength++; // Check special character

    // Update password strength bar
    const strengthLevels = ["w-1/5 bg-red-500", "w-2/5 bg-orange-500", "w-3/5 bg-yellow-500", "w-4/5 bg-blue-500", "w-full bg-green-500"];
    strengthBar.className = `h-2 rounded-md ${strengthLevels[strength - 1] || "w-0 bg-gray-300"}`;

    // Show error message if password is weak
    if (strength < 3) {
        passwordError.textContent = "Password is too weak. Add uppercase, numbers, and symbols.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

function validateForm() {
    let isUsernameValid = validateUsername();
    let isPasswordValid = validatePassword();
    let isConfirmPasswordValid = validateConfirmPassword();

    return isUsernameValid && isPasswordValid && isConfirmPasswordValid;
}