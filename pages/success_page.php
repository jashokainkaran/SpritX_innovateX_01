<?php
session_start();

// If there's no toast message, redirect to signup
if (!isset($_SESSION['toast_message'])) {
    header('Location: ../pages/signup_form.php');
    exit();
}

$message = $_SESSION['toast_message'];
$type = $_SESSION['toast_type'] ?? 'success';

// Clear the toast message from session
unset($_SESSION['toast_message']);
unset($_SESSION['toast_type']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Success</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .toast-container {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
        }
        
        .fade-out {
            animation: fadeOut 0.5s forwards;
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>
</head>
<body>
    <!-- Toast container -->
    <div class="toast-container">
    <div class="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4" role="alert">
  <p class="font-bold">Registered Successfully</p>
  <p>Redirecting to Login Page</p>
</div>
    </div>
    
    <script>
        // Set timeout to fade out the toast and redirect
        setTimeout(function() {
            document.querySelector('.toast-container > div').classList.add('fade-out');
            
            // Redirect after fade animation
            setTimeout(function() {
                window.location.href = '../pages/login_form.php';
            }, 500);
            
        }, 2000); // 2 seconds display time
    </script>
</body>
</html>