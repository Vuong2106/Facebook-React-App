import express from 'express';
const router = express.Router();
import { getPosts, addPost } from '../app/controllers/PostController.js';


router.get('/', getPosts)
router.post('/addPost', addPost)


export default router;