import {Router} from 'express';
import { login, register, logout, profile, verfifyToken} from '../controllers/auth.controllers.js';//import functions
import { authRequired } from '../middlewares/validateToken.js';
import {
    getUsers,
    getUser,
    deleteUser,
    editUser,
    createUser} from '../controllers/auth.controllers.js';

import {validateSchema} from '../middlewares/validatorMiddleware.js';
import {registerSchemas, loginSchema, updateSchema} from '../schemas/auth.schemas.js';

const router = Router();

router.get('/verify', verfifyToken);

router.post('/register',validateSchema(registerSchemas), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile',authRequired, profile);

router.get('/users',authRequired,getUsers);
router.get('/users/:id',authRequired,getUser);
router.delete('/users/:id',authRequired,deleteUser);
router.put('/users/:id',validateSchema(updateSchema),authRequired,editUser);
router.post('/users',validateSchema(registerSchemas), createUser);

export default router;