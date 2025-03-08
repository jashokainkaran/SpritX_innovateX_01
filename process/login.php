<?php 
session_start();
include ("../includes/db.php");

//Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s",$username);
    $stmt->execute();
    $result = $stmt->get_result();

    //Checking whether the query was successful i.e the user exists
    if($result->num_rows > 0) {
        //Fetching the user's data
        $user = $result->fetch_assoc();

        //Verify the password
        if (password_verify($password, $user['password'])) {
            //If the password is correct, then we can start the session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            header("Location: ../index.php");
            exit();
        }
        else {
            echo "<script>
                    alert('Incorrect Password');
                    window.location.href = '../pages/login_form.php';
                </script>";
            exit();
        } 

    } else{
        echo "<script>
                    alert('User Not Found');
                    window.location.href = '../pages/login_form.php';
            </script>";
        exit();
    }
    $stmt->close();
    } else{
        echo "<script>
                alert('SQL Error'.$conn->error)
                window.location.href = '../public/login_form.php';
            </script>";
        exit();
        $stmt->close();
        $conn->close();
}


?>