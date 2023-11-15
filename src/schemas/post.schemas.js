import { z } from 'zod';

export const postSchemas = z.object({
  description: z
    .string({
      required_error: 'The description is required.',
    })
    .max(250, {
      message: 'The description must be at most 250 characters',
    }),
});
