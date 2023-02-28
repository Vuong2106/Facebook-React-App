import express from 'express';
const router = express.Router()
import { login, register, logout, getUser } from '../app/controllers/AuthController.js'


router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.get('/test', getUser);

export default router;