# user-management-system

A RESTful API for User Management using Node.js, Express.js, and MySQL, following best coding practices with ES6 standards and Swagger documentation.
Supports JWT authentication, role-based access control (RBAC), and API documentation with Swagger.

## Project Setup Instructions (Local Environment)

1. Clone the Repository

```
    git clone https://github.com/your-repo/user-management-api.git
    cd user-management-api
```

2. Install Dependencies

```
    npm install
```

## MySQL Database Setup & Migrations

1. Create MySQL Database

Log into MySQL and run:

```
    CREATE DATABASE user_management;
    USE user_management;
```

2. Create the Users Table and  admin data insert automaticaly -> email : admin@example.com, password: admin123
3. Environment Variables Configuration (.env File)

```
    PORT=3000

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=user_management

    JWT_SECRET=your_secret_key
    JWT_EXPIRES_IN=1d

```

4. Running the API Locally

start the server

```
npm run dev
```

The API will run at: http://localhost:3000

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
