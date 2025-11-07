import { StartGameForLevel } from '../StartGameForLevel';
import { Player } from '@/src/domain/entities/Player';

jest.mock('../GetWordForLevel', () => ({
  GetWordForLevel: { execute: jest.fn().mockResolvedValue({ name: 'pendu', category: 'jeu' }) },
}));
jest.mock('../StartGame', () => ({
  StartGame: { execute: jest.fn((player, word) => ({ player, word, status: 'playing' })) },
}));

describe('StartGameForLevel', () => {
  it('should start a game for the given level', async () => {
    const player = new Player('bob');
    const game = await StartGameForLevel.execute(player, 2);
    expect(game.player).toBe(player);
    expect(game.word.name).toBe('pendu');
    expect(game.status).toBe('playing');
  });
});
