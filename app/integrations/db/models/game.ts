import * as z from 'zod';

export const GameModel = z.object({
  id: z.string(),
  homeTeam: z.string(),
  awayTeam: z.string()
});
