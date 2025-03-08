const signupForm = document.getElementById('signup-form');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPassword = document.getElementById('confirm_password');
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const matchError = document.getElementById("matchError");
const strengthBar = document.getElementById("strength-bar");
const submitButton = document.getElementById("submit");

const errorContainer = document.getElementById("error-container");

//Get password requirement elements
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
        // Display consolidated errors in the error container
        displayConsolidatedErrors();
    }
});

// Function to display all validation errors in the error container
function displayConsolidatedErrors() {
    let errorMessages = [];
    
    // Collect all current error messages
    if (nameError.innerHTML) {
        errorMessages.push(nameError.innerHTML);
    }
    if (passwordError.textContent) {
        errorMessages.push(passwordError.textContent);
    }
    if (matchError.innerHTML) {
        errorMessages.push(matchError.innerHTML);
    }
    
    // Display consolidated errors above the button
    if (errorMessages.length > 0) {
        errorContainer.innerHTML = errorMessages.map(msg => `<div class="text-red-500">${msg}</div>`).join('');
        errorContainer.classList.remove('hidden');
    } else {
        errorContainer.innerHTML = '';
        errorContainer.classList.add('hidden');
    }
}

function validateForm() {
    // Run all validations before submission
    const usernameIsValid = validateUsername();
    const passwordIsValid = validatePassword();
    const confirmPasswordIsValid = validateConfirmPassword();

    // Return true only if all validations pass
    return usernameIsValid && passwordIsValid && confirmPasswordIsValid;
}

function checkAllFields() {
    console.log("Click function called");

    //Check validations
    const usernameValid = usernameInput.value.trim().length >= 8 && nameError.innerHTML === "";
    const passwordValid = passwordError.textContent === "";
    const confirmPasswordValid = matchError.innerHTML === "";

    // Enable submit button only if all validations pass
    if (usernameValid && passwordValid && confirmPasswordValid) {
        submitButton.disabled = false;
        errorContainer.innerHTML = '';
        errorContainer.classList.add('hidden');
    } else {
        submitButton.disabled = true;
        // Update consolidated errors
        displayConsolidatedErrors();
    }
}

//Validates usernames
function validateUsername() {
    let username = usernameInput.value.trim();
    if (username.length < 8) {
        nameError.innerHTML = "Username should be at least 8 characters long";
        submitButton.disabled = true; // Explicitly disable
        displayConsolidatedErrors(); // Update error container
        return false;
    } else {
        nameError.innerHTML = "";
        checkUsernameUniqueness(); // This will update button state after AJAX
        return true;
    }
}

//Validates and checks for username uniqueness
function checkUsernameUniqueness() {
    
    const username = usernameInput.value.trim();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../process/check_username.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (!response.unique) {
                nameError.innerHTML = "Username already exists";
                submitButton.disabled = true; // Disable submit button
                displayConsolidatedErrors(); // Update error container
            } else {
                nameError.innerHTML = "";
                checkAllFields(); 
            }
        }
    };
    xhr.send('username=' + encodeURIComponent(username));
}

//Validates and checks passwords
function validatePassword() {
    let password = passwordInput.value;
    let strength = 0;

    // Check password criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 8;

    // Update requirements
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

    if (strength < 3) {
        passwordError.textContent = "Password is too weak.";
        submitButton.disabled = true; 
        displayConsolidatedErrors(); // Update error container
        return false;
    } else if (strength < 5) {
        passwordError.textContent = "Fulfill all the requirements";
        submitButton.disabled = true; 
        displayConsolidatedErrors(); // Update error container
        return false;
    } else {
        passwordError.textContent = "";
        checkAllFields(); // Check all fields at the end
        return true;
    }
}

//Checks if both passwords match
function validateConfirmPassword() {
    if (confirmPassword.value !== passwordInput.value) {
        matchError.innerHTML = "Passwords do not match.";
        submitButton.disabled = true;
        displayConsolidatedErrors(); // Update error container
        return false;
    } else {
        matchError.innerHTML = "";
        checkAllFields();
        return true;
    }
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