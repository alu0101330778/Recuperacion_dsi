import express from 'express';
import { createUser, getUserById, getUsers, deleteUser, updateUser } from '../controllers/user.controller.js';

const router = express.Router();

// Rutas para usuarios
router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/user', getUserById);
router.post('/user', createUser);
router.patch('/user', updateUser);
router.delete('/user', deleteUser);

export default router;