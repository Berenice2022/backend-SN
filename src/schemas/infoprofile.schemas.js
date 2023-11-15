import {z} from 'zod';

//fullname,birthdate,gender,civil_status,phone_number,job,description_personal
export const infoProfileSchema = z.object({
    fullname: z.string({
        required_error: 'The Full Name is required'
    }),
    birthdate: z.string({
        required_error: 'The Birthdate is required'
    }),
    gender: z.string({
        required_error: 'The Gender is required'
    }),
    civil_status: z.string({
        required_error: 'The Civil Status is required'
    }),
    phone_number: z.string({
        required_error: 'The Phone Number is required'
    })
    .min(10,{
        message:'The phone number must be at least 10 characters' 
     }),
    job: z.string({
        required_error: 'The Job is required'
    }),
    description_personal: z.string({
        required_error: 'The Description Personal is required'
    })
});