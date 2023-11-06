import { z } from 'zod';
import { prisma } from '../client';
import { GameModel } from '../models';

export async function createGame(data: Omit<z.infer<typeof GameModel>, 'id'>) {
  return await prisma.game.create({
    data
  });
}

export async function getGames() {
  return await prisma.game.findMany();
}

export async function deleteGame(id: string) {
  return await prisma.game.delete({
    where: { id }
  });
}
