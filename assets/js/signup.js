const signupForm = document.getElementById('signup-form');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const matchError = document.getElementById("matchError");
const strengthBar = document.getElementById("strength-bar");
const submitButton = document.getElementById("submit");

// ADDED: Get password requirement elements
const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCharCheck = document.getElementById("specialCharCheck");

usernameInput.addEventListener("keyup", validateUsername);
passwordInput.addEventListener("keyup", validatePassword);
confirmPassword.addEventListener("keyup", validateConfirmPassword);

submitButton.disabled = true;

signupForm.addEventListener("submit", function (event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

// ADDED: Missing validateForm function that was referenced in the submit event listener
function validateForm() {
    // Run all validations before submission
    const usernameIsValid = validateUsername();
    const passwordIsValid = validatePassword();
    const confirmPasswordIsValid = validateConfirmPassword();

    // Return true only if all validations pass
    return usernameIsValid && passwordIsValid && confirmPasswordIsValid;
}

// MODIFIED: Improved checkAllFields to avoid circular references
function checkAllFields() {
    // FIXED: Typo in comment
    console.log("Click function called");

    // MODIFIED: Check current validation states without calling validation functions
    const usernameValid = usernameInput.value.trim().length >= 8 && nameError.innerHTML === "";
    const passwordValid = passwordError.textContent === "";
    const confirmPasswordValid = matchError.innerHTML === "";

    // Enable submit button only if all validations pass
    if (usernameValid && passwordValid && confirmPasswordValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// MODIFIED: Improved validateUsername to work with checkAllFields
function validateUsername() {
    let username = usernameInput.value.trim();
    if (username.length < 8) {
        nameError.innerHTML = "Username should be at least 8 characters long";
        submitButton.disabled = true; // Explicitly disable
        return false;
    } else {
        nameError.innerHTML = "";
        checkUsernameUniqueness(); // This will update button state after AJAX
        return true;
    }
}

// MODIFIED: Fixed missing username variable and added checkAllFields call
function checkUsernameUniqueness() {
    // ADDED: Define username variable from input
    const username = usernameInput.value.trim();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../process/check_username.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (!response.unique) {
                nameError.innerHTML = "Username already exists";
                submitButton.disabled = true; // Explicitly disable
            } else {
                nameError.innerHTML = "";
                checkAllFields(); // ADDED: Update button state after response
            }
        }
    };
    xhr.send('username=' + encodeURIComponent(username));
}

// MODIFIED: Added explicit button disabling and proper checkAllFields call
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

    // MODIFIED: Added explicit button disabling
    if (strength < 3) {
        passwordError.textContent = "Password is too weak.";
        submitButton.disabled = true; // Explicitly disable
        return false;
    } else if (strength < 5) {
        passwordError.textContent = "Fulfill all the requirements";
        submitButton.disabled = true; // Explicitly disable
        return false;
    } else {
        passwordError.textContent = "";
        checkAllFields(); // Check all fields at the end
        return true;
    }
}

// MODIFIED: Added explicit button disabling
function validateConfirmPassword() {
    if (confirmPassword.value !== passwordInput.value) {
        matchError.innerHTML = "Passwords do not match.";
        submitButton.disabled = true; // Explicitly disable
        return false;
    } else {
        matchError.innerHTML = "";
        checkAllFields(); // Check all fields at the end
        return true;
    }
}

// Unchanged: Updates the requirements in real time
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