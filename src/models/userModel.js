import pool from '../config/db.js';

export const createUser = async (name, email, role) => {
    const [result] = await pool.query('INSERT INTO users (name, email, role) VALUES (?, ?, ?)', [name, email, role]);
    return result.insertId;
};

export const getAllUsers = async () => {
    const [users] = await pool.query('SELECT * FROM users');
    return users;
};

export const getUserById = async (id) => {
    const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return user[0];
};

export const updateUser = async (id, name, email, role) => {
    await pool.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id]);
};

export const deleteUser = async (id) => {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
};
