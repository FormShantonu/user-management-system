import express from "express";
import * as userController from "../controllers/userController.js";
import { validateUser } from '../middlewares/validationMiddleware.js';
import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized access
 */

router.get("/users",authenticateUser, userController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (Admin Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: User created successfully
 *       403:
 *         description: Forbidden, only admin can create users
*/

router.post("/users",authenticateUser,authorizeAdmin,validateUser, userController.createUser);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
*/
router.get("/users/:id",authenticateUser, userController.getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user (Admin Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe Updated"
 *               email:
 *                 type: string
 *                 example: "john.doe.updated@example.com"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Forbidden, only admin can update users
 *       404:
 *         description: User not found
*/
router.put("/users/:id",authenticateUser, authorizeAdmin,validateUser, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Admin Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden, only admin can delete users
 *       404:
 *         description: User not found
*/
router.delete("/users/:id", authenticateUser, authorizeAdmin, userController.deleteUser);

export default router;
