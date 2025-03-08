<?php
// Include database connection
require_once('../includes/db.php');

// Initialize response
$response = array('unique' => true);

// Check if username is received
if (!isset($_POST['username']) || empty(trim($_POST['username']))) {
    // Added: More explicit error message
    echo json_encode(["error" => "Username not received", "unique" => false]);
    exit;
}

$username = trim($_POST['username']);

// Added: Minimum length check
if (strlen($username) < 8) {
    echo json_encode(["error" => "Username too short", "unique" => false]);
    exit;
}

// Debug: Log received username
error_log("Checking username: " . $username);

// Prepare SQL statement
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM users WHERE username = ?");
$stmt->bind_param("s", $username);

// Added: Error handling for database operations
if (!$stmt->execute()) {
    echo json_encode(["error" => "Database error", "unique" => false]);
    exit;
}

$result = $stmt->get_result();
$row = $result->fetch_assoc();

// If count > 0, username already exists
if ($row['count'] > 0) {
    $response['unique'] = false;
}

$stmt->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>