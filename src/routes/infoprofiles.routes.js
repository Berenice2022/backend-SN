import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getinfoProfiles,
    createinfoProfile,
    getinfoProfile,
    deleteinfoProfile,
    editinfoProfile} from '../controllers/infoprofiles.controller.js';
import {validateSchema} from '../middlewares/validatorMiddleware.js';
import {infoProfileSchema} from '../schemas/infoprofile.schemas.js';
 
const router = Router();
router.get('/infoprofiles', authRequired,getinfoProfiles);//(req,res)=>res.send("products");
router.post('/infoprofiles', authRequired, validateSchema(infoProfileSchema), createinfoProfile);//creting normally, registra el usuario sin regresar la cukis
router.get('/infoprofiles/:id', authRequired,getinfoProfile);
router.delete('/infoprofiles/:id', authRequired,deleteinfoProfile);
router.put('/infoprofiles/:id', authRequired,validateSchema(infoProfileSchema), editinfoProfile);
export default router;