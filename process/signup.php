<?php
session_start();
include("../includes/db.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    
    // Server-side validation
    if (strlen($username) < 8) {
        echo "<script>
                alert('Username must be at least 8 characters long');
                window.location.href = '../pages/signup_form.php';
            </script>";
        exit();
    }
    
    // Password complexity validation
    if (strlen($password) < 8 || 
        !preg_match('/[A-Z]/', $password) || 
        !preg_match('/[a-z]/', $password) || 
        !preg_match('/[0-9]/', $password) || 
        !preg_match('/[^A-Za-z0-9]/', $password)) {
        
        echo "<script>
                alert('Password does not meet complexity requirements');
                window.location.href = '../pages/signup_form.php';
            </script>";
        exit();
    }
    
    //Hashing the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    // Check if username already exists
    $checkQuery = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($checkQuery);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo "<script>
                alert('Username Already Exists');
                window.location.href = '../pages/signup_form.php';
            </script>";
        exit();
    } else {
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $hashed_password);
       
        if ($stmt->execute()) {
            echo "<script>
                alert('Registered Successfully');
                setTimeout(function() {
                    window.location.href = '../pages/login_form.php';
                }, 2000);
            </script>";
            exit();
        } else {
            echo "<script>
                    alert('Error: " . $stmt->error . "');
                    window.location.href = '../pages/signup_form.php';
                </script>";
            exit();
        }
    }
    $stmt->close();
    $conn->close();
}
?>