import { z } from 'zod';

export const eventSchema = z.object({
  name: z.string({
    required_error: 'The name is required',
  }),
  description: z.string({
    required_error: 'The description is required',
  }),
  address: z.string({
    required_error: 'The address is required',
  }),
});
