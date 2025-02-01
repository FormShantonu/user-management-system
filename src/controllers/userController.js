import * as UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { BadRequestError, NotFoundError } from "../utils/customErrors.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      throw new BadRequestError("All fields are required");
    }
    // Check if user already exists
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }
    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user in database with hashed password
    const id = await UserModel.createUser(name, email, hashedPassword, role);
    res.status(201).json({ message: "User created successfully", id });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    console.log("Fetching users...");
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await UserModel.getUserById(req.params.id);
    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    await UserModel.updateUser(req.params.id, name, email, role);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await UserModel.getUserById(req.params.id);

    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    await UserModel.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
