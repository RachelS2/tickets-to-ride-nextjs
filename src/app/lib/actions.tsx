import { z } from 'zod'; // type validation library


export const NewGameInputModel = z.object({
  name: z.string({
    error: 'Please insert a name.',
  }),

});

