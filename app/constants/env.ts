import { z } from 'zod';

const envSchema = z.object({
  COOKIE_SECRET: z.string(),
  PASSWORD: z.string()
});

export const env = envSchema.parse(process.env);
