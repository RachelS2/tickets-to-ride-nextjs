import { z } from 'zod'; // type validation library
import { customAlphabet } from "nanoid";

// cria IDs numéricos com 5 dígitos
const nanoid = customAlphabet('1234567890', 5);

export function generateUserId() {
  const i = nanoid()
  console.log(i)
  return i;
}

export const NewGameInputModel = z.object({
  name: z.string({
    error: 'Please insert a name.',
  }),

});

