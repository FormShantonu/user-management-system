SET SQL_MODE='';

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@example.com', '$2y$10$eLLcnhF7/ruENw2/j4UNiOn2k5Ttn77fQqp1erU3W3gQYxTnld0Je', 'admin')
ON DUPLICATE KEY UPDATE name=VALUES(name);
