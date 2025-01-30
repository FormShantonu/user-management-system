import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
