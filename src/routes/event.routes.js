import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getEvents,
  createEvent,
  getEvent,
  deleteEvent,
  editEvent,
} from '../controllers/event.controllers.js';
import { validateSchema } from '../middlewares/validatorMiddleware.js';
import { eventSchema } from '../schemas/event.schemas.js';

const router = Router();
router.get('/events', authRequired, getEvents); //(req,res)=>res.send("products");
router.post('/events', authRequired, validateSchema(eventSchema), createEvent); //creting normally, registra el usuario sin regresar la cukis
router.get('/events/:id', authRequired, getEvent);
router.delete('/events/:id', authRequired, deleteEvent);
router.put('/events/:id', authRequired, validateSchema(eventSchema), editEvent);
export default router;
