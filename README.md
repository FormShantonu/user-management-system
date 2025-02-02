# user-management-system

A RESTful API for User Management using Node.js, Express.js, and MySQL, following best coding practices with ES6 standards and Swagger documentation.
Supports JWT authentication, role-based access control (RBAC), and API documentation with Swagger.

### Features ###

* User authentication (JWT-based)
* Admin-only access control
* User CRUD operations
* MySQL database integration
* Swagger API documentation
* Docker containerization
* Jest-based testing

## Project Setup Instructions (Local Environment)

* Prerequisites
Ensure you have the following installed on your system:

* Node.js (>=18.x)
* MySQL (>=8.x)
* Docker & Docker Compose (optional for containerized setup)
* MySQL Workbench (optional for database management)

1. Step 1: Clone the Repository

```
    git clone https://github.com/FormShantonu/user-management-system.git
    cd user-management-system
```

2. Step 2: Install Dependencies

```
    npm install
```

Step 3: Configure Environment Variables

Create a .env file in the root directory and add the following:

```
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=user_management
DB_PORT=3306

# JWT Secret Key
JWT_SECRET=your_secret_key
```

## MySQL Database Setup & Migrations

1. Create MySQL Database

Log into MySQL and run:

```
    CREATE DATABASE user_management;
    USE user_management;
```

2. Create the Users Table

Run the following SQL query in your MySQL database:

```
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
```
3. Insert an Admin User

Generate a hashed password (using bcrypt) and insert an admin user manually:

```
    INSERT INTO users (name, email, password, role)
    VALUES ('Admin', 'admin@example.com', '$2y$10$zZTrAutX8G6O72uAu8tGOOJSrM1TNaY81kMBViCsldta4A9blpLPa', 'admin');
```


## API Documentation (Swagger) ##

Swagger UI is available at: http://localhost:3000/api-docs

## API Endpoints & Usage

1. Authentication

- Login (Get JWT Token)

```
POST /auth/login

```

Request Body:

```
{
  "email": "admin@example.com",
  "password": "password123"
}

```

Response:

```
{
  "token": "your_jwt_token"
}

```

2. User Management (CRUD)

- Create a User (Admin Only)

```
POST /users
Authorization: Bearer <your_jwt_token>

```

Request Body:

```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "mypassword",
  "role": "user"
}

```

- Get All Users (Authenticated)

```
GET /users
Authorization: Bearer <your_jwt_token>

```

- Get All Users (Authenticated)

```
GET /users
Authorization: Bearer <your_jwt_token>

```

- Get User by ID

```
GET /users/:id
Authorization: Bearer <your_jwt_token>

```

- Update User (Admin Only)

```
PUT /users/:id
Authorization: Bearer <your_jwt_token>
```

Request Body:

```
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "admin"
}

```

- Delete User (Admin Only)

```
DELETE /users/:id
Authorization: Bearer <your_jwt_token>
```

## API Documentation with Swagger

Swagger documentation is available at:

http://localhost:3000/api-docs

Click "Authorize" and enter your JWT token to test secured endpoints.
Test API requests directly from Swagger UI.

## Running Tests ##
Run tests using Jest: npm test

## Connecting Docker MySQL to MySQL Workbench ##

1. Open MySQL Workbench.
2. Create a new connection with:
  * Hostname: localhost
  * Port: 3307 (as mapped in docker-compose.yml)
  * Username: root
  * Password: root
3. Click Test Connection → Should be successful.

## Stopping & Cleaning Up ##

* Stop containers:
  ```
    docker-compose down
  ```
* Stop and remove volumes

  ```
    docker-compose down -v
  ```

## Troubleshooting

- 1. Database Errors
     If you get "Table 'user_management.users' doesn't exist", make sure you:

  - Created the database and table correctly.
  - Updated .env with the correct database credentials.
  - Restarted the server.

- 2. Login Fails
  - Ensure you inserted an admin user with a hashed password.
  - Check the database with:
    ```
        SELECT * FROM users;
    ```
- 3. JWT Token Issues
  - Make sure your .env has JWT_SECRET defined.
  - Tokens expire in 1 day, so generate a new one if expired.

## Technologies Used

- Node.js (Express.js)
- MySQL (Database)
- JWT Authentication
- Swagger UI (API Documentation)
- bcrypt.js (Password Hashing)

## Building & Running with Docker ##


```
docker-compose up --build -d
```
after running the docker it will first run test case and then run the project.