import { z } from 'zod';

export const interestSchema = z.object({
  name: z
    .string({
      required_error: 'The name is required.',
    })
    .max(50, {
      message: 'The name must be at most 50 characters',
    }),
  description: z.string({
    required_error: 'The description is required',
  }),
  interest_category: z.string({
    required_error: 'The interest_category is required',
  }),
  importance: z.string({
    required_error: 'The importance is required',
  }),
});
