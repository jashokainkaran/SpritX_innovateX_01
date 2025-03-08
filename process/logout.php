<?php
session_start();

// Set a flag to show the toast message
$show_toast = true;

// Handle session destruction after displaying toast
if (isset($_GET['complete_logout']) && $_GET['complete_logout'] == 1) {
    // This is the second visit after showing the toast
    session_unset();
    session_destroy();
    header('Location: ../pages/login_form.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log out Success</title>
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
        
        body {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f3f4f6;
        }
    </style>
</head>
<body>
    <!-- Toast container -->
    <div class="toast-container">
        <div class="bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4" role="alert">
            <p class="font-bold">Logging Out</p>
            <p>Redirecting to Login Page</p>
        </div>
    </div>
   
    <script>
        // Set timeout to fade out the toast and redirect
        setTimeout(function() {
            document.querySelector('.toast-container > div').classList.add('fade-out');
           
            // Redirect after fade animation
            setTimeout(function() {
                window.location.href = "logout.php?complete_logout=1";
            }, 500);
           
        }, 2000); // 2 seconds display time
    </script>
</body>
</html>