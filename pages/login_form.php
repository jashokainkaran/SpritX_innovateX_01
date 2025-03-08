<?php
include("../includes/header.php") 
?>
<body class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl text-emerald-600 font-bold text-center mb-4" id="form-title">Login</h2>
        
        <form id="login-form" action="../process/login.php" method="POST">
            <input type="hidden" name="form_type" id="form_type" value="login">
            
            <div class="mb-4">
                <label class="block text-gray-700">Username</label>
                <input type="textbox" name="username" id="username" required class="w-full px-3 py-2 border rounded-lg">
                <p id="nameError" class="text-red-500 text-sm mt-1 font-semibold"></p>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700">Password</label>
                <input type="password" name="password" id="password" required class="w-full px-3 py-2 border rounded-lg">
                <p id="passwordError" class="text-red-500 text-sm mt-1 font-semibold"></p>
            </div>

            <button type="submit" id="submit" class="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg mt-2 hover:bg-emerald-500 transition duration-200">
                Login
            </button>
        </form>

        <p class="text-center mt-4 text-gray-600">
            <span id="toggle-text">Havent't got an account?</span>
            <a href="../pages/signup_form.php" id="toggle-form" class="text-emerald-600">Sign up here</a>
        </p>
    </div>

    <script src="../assets/js/login.js"></script>
</body>
</html>
