Setting Up the MySQL Database
1Create a New Database
Open phpMyAdmin.
Create a new database (e.g., ProjectDB).

Import the Database Schema
Locate the users.sql file in the project folder.
In phpMyAdmin, select the newly created database.
Click on the Import tab.
Choose the users.sql file and click Go

Update Database Configuration
Update the configuration in the db.php file.

Go to the includes folder in the project directory.

Open db.php

$dbname = 'your_database_name';

Replace 'your_database_name' with the name of the newly created database (e.g., ProjectDB).

If necessary, update the database username and password to match your MySQL credentials.

Save the file.

Running the Project
Ensure a local PHP server (e.g., XAMPP, MAMP, or similar) is running.
Move the project files into the appropriate directory (e.g., htdocs for XAMPP).
Open the main PHP file in a web browser.


Additional Features
Passwords are hashed and stored for extra security. So it is recommended to first create a new user and then try logging in.
