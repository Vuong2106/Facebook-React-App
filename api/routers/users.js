import express from 'express';
const router = express.Router();
import { profile } from '../app/controllers/UserController.js';
// const UserController = require('../app/controllers/UserController');

router.get('/profile/:user_id', profile);


export default router;