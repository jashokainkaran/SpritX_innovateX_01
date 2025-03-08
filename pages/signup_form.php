<?php
include("../includes/header.php") 
?>
<body class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl text-emerald-600 font-bold text-center mb-4 mt-3" id="form-title">Sign Up</h2>
        
        <form id="signup-form" action="../process/signup.php" method="POST">
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
                <div class="h-2 mt-2 w-full bg-gray-300 rounded-md">
                <div id="strength-bar" class="h-2 bg-red-500 w-0 rounded-md"></div>
            </div>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700">Confirm Password</label>
                <input type="password" name="confirm-password" id="confirm-password" required class="w-full px-3 py-2 border rounded-lg">
                <p id="matchError" class="text-red-500 text-sm mt-1 font-semibold"></p>
            </div>

            <button type="submit" class="w-full bg-emerald-600 text-white font-semibold py-2 rounded-lg mt-2 hover:bg-emerald-500 transition duration-200">
                Sign Up
            </button>
        </form>

        <p class="text-center mt-4 text-gray-600">
            <span id="toggle-text">Already have an account?</span>
            <a href="../pages/login_form.php" id="toggle-form" class="text-emerald-600">Log in</a>
        </p>
    </div>

    <script src="../assets/js/signup.js"></script>
</body>
</html>
