import express from 'express';
import { create, getAll, getById, deleteById, updateById } from '../controllers/userController.js';

const router = express.Router();

// POST /api/user
router.post('/user', create);

// GET /api/users
router.get('/users', getAll);

// GET /api/user/:id
router.get('/user/:id', getById);

// DELETE /api/delete/user/:id
router.delete('/delete/user/:id', deleteById);

// PUT /api/user/:id
router.put('/user/:id', updateById);

export default router;