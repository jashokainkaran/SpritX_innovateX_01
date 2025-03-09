<?php
session_start();
include("includes\db.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
   
    // Initialize errors array for tracking all validation errors
    $errors = [];
   
    // Server-side validation
    if (strlen($username) < 8) {
        $errors[] = 'Username must be at least 8 characters long';
    }
   
    // Password complexity validation
    if (strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters long';
    }
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = 'Password must contain at least one uppercase letter';
    }
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = 'Password must contain at least one lowercase letter';
    }
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = 'Password must contain at least one number';
    }
    if (!preg_match('/[^A-Za-z0-9]/', $password)) {
        $errors[] = 'Password must contain at least one special character';
    }
   
    // Check if username already exists
    $checkQuery = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
   
    if ($result->num_rows > 0) {
        $errors[] = 'Username already exists';
    }
    
    // If there are errors, redirect back with error messages
    if (!empty($errors)) {
        $_SESSION['signup_errors'] = $errors;
        header('Location: pages\signup_form.php');
        exit();
    }
    
    //Hashing the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
   
    // Insert the new user
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $hashed_password);
       
    if ($stmt->execute()) {
        // Store success message in session
        $_SESSION['toast_message'] = "Registration successful! Redirecting to login...";
        $_SESSION['toast_type'] = "success";
        
        // Redirect to a success page 
        header('Location: pages\success_page.php');
        exit();
    } else {
        $_SESSION['signup_errors'] = ['Registration failed: ' . $stmt->error];
        header('Location: pages\signup_form.php');
        exit();
    }
    
    $stmt->close();
    $conn->close();
}
?>