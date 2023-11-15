import {z} from 'zod';

export const registerSchemas = z.object({
    username: z.string({
        required_error:'The username is required.'
    }),
    email: z.string({
        required_error:'Email is required'
    })
    .email({
        required_error:'Invalid email'
    }),
    password: z.string({
        required_error:'Password is required'
    })
    .min(6,{
       message:'The password must be at least 6 characters' 
    }),
});


export const loginSchema =z.object({
    email:z.string({
        required_error:'Email is required'
    })
    .email({
        required_error:'Invalid email'
    }),
    password: z.string({
        required_error:'Password is required'
    })
    .min(6,{
       message:'The password must be at least 6 characters' 
    }),
});


export const updateSchema =z.object({
    username: z.string({
        required_error:'The username is required.'
    }),
    password: z.string({
        required_error:'Password is required'
    })
    .min(6,{
       message:'The password must be at least 6 characters' 
    }),
});



