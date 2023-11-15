import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getLikes, createLike, deleteLike, getLike} from '../controllers/like.controller.js';
 
const router = Router();
router.get('/likes', authRequired,getLikes);
router.post('/likes', authRequired,createLike);
router.delete('/likes/:id', authRequired,deleteLike);
router.get('/likes/:id', authRequired,getLike);
export default router;