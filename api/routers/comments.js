import express from 'express';
const router = express.Router();
import { getComments, createComment } from '../app/controllers/CommentController.js';

router.get('/', getComments)
router.post('/create-comments', createComment)
export default router;