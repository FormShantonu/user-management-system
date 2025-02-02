import pool from "../config/db.js";

export const createUser = async (name, email, password, role) => {
  const connection = await pool.getConnection(); // Get a transaction connection

  try {
    await connection.beginTransaction(); // Start transaction

    // Check if the email already exists
    const [existingUser] = await connection.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      throw new BadRequestError("User with this email already exists");
    }
    // Insert new user
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password,role) VALUES (?, ?, ?,?)",
      [name, email, password, role]
    );

    // Commit the transaction
    await connection.commit();
    connection.release(); // Release connection

    return result.insertId;
  } catch (error) {
    await connection.rollback(); // Rollback if anything fails
    connection.release();
    throw error instanceof BadRequestError
      ? error
      : new InternalServerError("Failed to create user");
  } finally {
    connection.release();
  }
};

export const getUserByEmail = async (email) => {
  const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return user[0];
};

export const getAllUsers = async () => {
  const [users] = await pool.query("SELECT * FROM users");
  console.log("users", users);
  return users;
};

export const getUserById = async (id) => {
  const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return user[0];
};

export const updateUser = async (id, name, email, role) => {
  await pool.query(
    "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id]
  );
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};
