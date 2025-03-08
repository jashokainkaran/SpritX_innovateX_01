const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById("nameError");
const passwordError = document.getElementById("passwordError");
const submitButton = document.getElementById("submit");

// Set initial state
submitButton.disabled = false; // Start enabled, will disable on errors

// Add event listeners
usernameInput.addEventListener("keyup", validateUsername);
passwordInput.addEventListener("keyup", validatePassword);

// Form submission handler
loginForm.addEventListener("submit", function (event) {
    if (!validateForm()) {
        event.preventDefault(); // Prevent form submission if validation fails
    }
});

// Function to validate the entire form before submission
function validateForm() {
    const usernameIsValid = validateUsername();
    const passwordIsValid = validatePassword();

    return usernameIsValid && passwordIsValid;
}

// Check all fields and update submit button state
function checkAllFields() {
    const usernameValid = usernameInput.value.trim().length >= 8 && nameError.innerHTML === "";
    const passwordValid = passwordInput.value.length > 0 && passwordError.innerHTML === "";

    if (usernameValid && passwordValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// Username validation function
function validateUsername() {
    let username = usernameInput.value.trim();

    if (username.length < 8) {
        nameError.innerHTML = "Username should be at least 8 characters long";
        submitButton.disabled = true;
        return false;
    } else {
        // Clear error initially, will be updated by checkUsernameExists
        nameError.innerHTML = "";
        checkUsernameExists();
        return true;
    }
}

// Check if username exists in the database
function checkUsernameExists() {
    const username = usernameInput.value.trim();

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '../process/check_username_exists.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (!response.exists) {
                nameError.innerHTML = "Username does not exist";
                submitButton.disabled = true;
            } else {
                nameError.innerHTML = "";
                checkAllFields();
            }
        }
    };
    xhr.send('username=' + encodeURIComponent(username));
}

// Password validation function - basic check for login
function validatePassword() {
    let password = passwordInput.value;

    if (password.length === 0) {
        passwordError.innerHTML = "Password is required";
        submitButton.disabled = true;
        return false;
    } else {
        passwordError.innerHTML = "";
        checkAllFields();
        return true;
    }
}