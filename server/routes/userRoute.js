import express from 'express';
import { create, getAll, getById, deleteById, updateAddressField } from '../controllers/userController.js';

const router = express.Router();

// POST /api/user
router.post('/user', create);

// GET /api/users
router.get('/users', getAll);

// GET /api/user/:id
router.get('/user/:id', getById);

// DELETE /api/delete/user/:id
router.delete('/delete/user/:id', deleteById);

// POST /api/update-address - Update existing records to add address field
router.post('/update-address', updateAddressField);

export default router;