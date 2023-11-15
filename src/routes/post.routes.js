import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getPosts,
    createPost,
    getPost,
    deletePost,
    editPost} from '../controllers/post.controllers.js';
import {validateSchema} from '../middlewares/validatorMiddleware.js';
import {postSchemas} from '../schemas/post.schemas.js';
 
const router = Router();
router.get('/posts', authRequired,getPosts);
router.post('/posts', authRequired, validateSchema(postSchemas),  createPost);//creting normally, registra el usuario sin regresar la cukis
router.get('/posts/:id', authRequired,getPost);
router.delete('/posts/:id', authRequired,deletePost);
router.put('/posts/:id', authRequired,validateSchema(postSchemas), editPost);
export default router;
