<?php
// Include database connection
require_once('../includes/db.php');

// Initialize response
$response = array('exists' => false);

// Check if username is received
if (!isset($_POST['username']) || empty(trim($_POST['username']))) {
    echo json_encode(["error" => "Username not received", "exists" => false]);
    exit;
}

$username = trim($_POST['username']);

// Minimum length check
if (strlen($username) < 8) {
    echo json_encode(["error" => "Username too short", "exists" => false]);
    exit;
}

// Prepare SQL statement
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM users WHERE username = ?");
$stmt->bind_param("s", $username);

// Error handling for database operations
if (!$stmt->execute()) {
    echo json_encode(["error" => "Database error", "exists" => false]);
    exit;
}

$result = $stmt->get_result();
$row = $result->fetch_assoc();

// If count > 0, username exists
if ($row['count'] > 0) {
    $response['exists'] = true;
}

$stmt->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>