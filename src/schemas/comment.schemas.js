import {z} from 'zod';

//fullname,birthdate,gender,civil_status,phone_number,job,description_personal
export const commentSchema = z.object({
    comment: z.string({
        required_error: 'The comment is required'
    })
});