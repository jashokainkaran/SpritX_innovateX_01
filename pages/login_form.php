<?php
$pageTitle = 'Login Page'; 
include("../src/includes/header.php") 
?>
<body class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl text-primary font-bold text-center mb-4" id="form-title">Login</h2>
        
        <form id="auth-form" action="../process/login.php" method="POST">
            <input type="hidden" name="form_type" id="form_type" value="login">
            
            <div class="mb-4">
                <label class="block text-gray-700">Email</label>
                <input type="email" name="email" required class="w-full px-3 py-2 border rounded-lg">
            </div>

            <div class="mb-4">
                <label class="block text-gray-700">Password</label>
                <input type="password" name="password" required class="w-full px-3 py-2 border rounded-lg">
            </div>

            <button type="submit" class="w-full bg-primary text-white py-2 rounded-lg">
                Login
            </button>
        </form>

        <p class="text-center mt-4 text-gray-600">
            <span id="toggle-text">New customer?</span>
            <a href="../public/signup_form.php" id="toggle-form" class="text-primary">Sign up here</a>
        </p>
    </div>

    <script src="../assets/js/main.js"></script>
</body>
</html>
