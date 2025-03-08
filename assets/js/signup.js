const signupForm = document.getElementById('signup-form');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const matchError = document.getElementById("matchError");
const strengthBar = document.getElementById("strength-bar");
const submitButton = document.getElementById("submit");

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

//Validates password
function validatePassword() {
    let password = passwordInput.value;
    let strength = 0;

    // Check password criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    // Update requirement indicators
    updateRequirement(lengthCheck, isLongEnough);
    updateRequirement(uppercaseCheck, hasUppercase);
    updateRequirement(lowercaseCheck, hasLowercase);
    updateRequirement(numberCheck, hasNumber);
    updateRequirement(specialCharCheck, hasSpecialChar);

    // Calculate password strength
    if (isLongEnough) strength++;
    if (hasUppercase) strength++;
    if (hasLowercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecialChar) strength++;

    // Update password strength bar
    const strengthLevels = ["w-1/5 bg-red-500", "w-2/5 bg-orange-500", "w-3/5 bg-yellow-500", "w-4/5 bg-blue-500", "w-full bg-green-500"];
    strengthBar.className = `h-2 rounded-md ${strengthLevels[strength - 1] || "w-0 bg-gray-300"}`;

    // Show error message if password is weak
    if (strength < 3) {
        passwordError.textContent = "Password is too weak.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

function validateConfirmPassword() {
    if (confirmPassword.value !== passwordInput.value) {
        matchError.innerHTML = "Passwords do not match.";
        return false;
    } else {
        matchError.innerHTML = "";
        return true;
    }
}

//Validates and only submits if the fields arent empty
function validateForm() {
    let isUsernameValid = validateUsername();
    let isPasswordValid = validatePassword();
    let isConfirmPasswordValid = validateConfirmPassword();

    return isUsernameValid && isPasswordValid && isConfirmPasswordValid;
}

//Updates the requirements in real time
function updateRequirement(element, isMet) {
    if (isMet) {
        element.classList.remove("text-red-500");
        element.classList.add("text-green-500");
        element.innerHTML = "✅ " + element.dataset.text;
    } else {
        element.classList.remove("text-green-500");
        element.classList.add("text-red-500");
        element.innerHTML = "❌ " + element.dataset.text;
    }
}