import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getInterests,
  createInterest,
  getInterest,
  deleteInterest,
  editInterest,
} from '../controllers/interest.controllers.js';
import { validateSchema } from '../middlewares/validatorMiddleware.js';
import { interestSchema } from '../schemas/interest.schemas.js';

const router = Router();
router.get('/interests', authRequired, getInterests);
router.post(
  '/interests',
  authRequired,
  validateSchema(interestSchema),
  createInterest
); //creting normally, registra el usuario sin regresar la cukis
router.get('/interests/:id', authRequired, getInterest);
router.delete('/interests/:id', authRequired, deleteInterest);
router.put(
  '/interests/:id',
  authRequired,
  validateSchema(interestSchema),
  editInterest
);
export default router;
