import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getComments,
    createComment,
    getComment,
    deleteComment,
    editComment} from '../controllers/comment.controller.js';
import {validateSchema} from '../middlewares/validatorMiddleware.js';
import {commentSchema} from '../schemas/comment.schemas.js';
 
const router = Router();
router.get('/comments', authRequired,getComments);//
router.post('/comments', authRequired, validateSchema(commentSchema), createComment);//creting normally, registra el usuario sin regresar la cukis
router.get('/comments/:id', authRequired,getComment);
router.delete('/comments/:id', authRequired,deleteComment);
router.put('/comments/:id', authRequired,validateSchema(commentSchema), editComment);
export default router;