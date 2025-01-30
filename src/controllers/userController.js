import * as UserModel from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const id = await UserModel.createUser(name, email, role);
        res.status(201).json({ message: 'User created', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.getUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        await UserModel.updateUser(req.params.id, name, email, role);
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await UserModel.deleteUser(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
