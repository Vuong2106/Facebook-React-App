import express from 'express';
const router = express.Router();
import { getLikes, addLikes, deleteLikes } from '../app/controllers/LikeController.js'

router.get('/', getLikes);
router.post('/', addLikes);
router.delete('/', deleteLikes);

export default router;