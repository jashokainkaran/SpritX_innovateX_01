<?php
// Include database connection
require_once('../includes/db.php');

// Initialize response array
$response = array('unique' => true);

if(isset($_POST['username'])) {
    $username = $_POST['username'];
    
    // Prepare SQL statement to avoid SQL injection
    $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    // If count > 0, username already exists
    if($row['count'] > 0) {
        $response['unique'] = false;
    }
    
    $stmt->close();
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>