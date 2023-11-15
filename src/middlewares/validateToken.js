import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next)=>{
    //console.log('Validating Token');
    //Show the headers for consol of request(peticion)
    //console.log(req.headers);
    //to get the cookies
    const {token} = req.cookies;
    if(!token)
    return res.status(401).json({message:'No token, autorizacion denegada'})

    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if(err)
        return res.status(403).json({message:'Token no valido'})
    
       // console.log(user);
       req.user = user;
        next();
    })
}