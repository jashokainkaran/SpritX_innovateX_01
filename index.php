<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Connect</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="flex items-center justify-center min-h-screen">
    <div class="text-center transition-all duration-1000 opacity-100 transform translate-y-0">
        <h1 class="text-5xl font-bold mb-4">Welcome to <span class="text-emerald-600">Secure Connect</span></h1>
        <p class="text-lg mb-6">Protecting Your Identity, Simplifying Access</p>
        <?php if ($isLoggedIn): ?>
            <p class="text-xl mb-6">Hello, <span class="font-bold text-emerald-600"><?php echo htmlspecialchars($_SESSION['username']); ?></span>! We're glad to see you again.</p>
            <form action="../spritx/process/logout.php" method="POST">
                <button class="px-6 py-3 bg-emerald-500 text-emerald-800 font-bold rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110 hover:text-white">
                    Logout
                </button>
            </form>
        <?php else: ?>
                <a href="../spritx/pages/login_form.php"><button class="px-6 py-3 bg-emerald-500 text-emerald-800 font-bold rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out hover:scale-110 hover:text-white">
                    Log In
                </button></a>
        <?php endif; ?>
    </div>
</body>
</html>