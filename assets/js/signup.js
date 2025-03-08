const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

usernameInput.addEventListener("keyup", validateUsername);
usernameInput.addEventListener("keyup", validatePassword);
