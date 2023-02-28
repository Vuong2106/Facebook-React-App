import express from 'express';
const router = express.Router();
import { index } from '../app/controllers/UserController.js';
// const UserController = require('../app/controllers/UserController');

router.get('/', index);


export default router;