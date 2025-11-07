import { UpdateScoreIfWin } from '../UpdateScoreIfWin';
import { Player } from '@/src/domain/entities/Player';
import { Game } from '@/src/domain/entities/Game';

jest.mock('../WinGame', () => ({
  WinGame: { execute: jest.fn(() => true) },
}));
jest.mock('../UpdateScore', () => ({
  UpdateScore: { execute: jest.fn((player, points) => { player.score += points; return player; }) },
}));
jest.mock('../IncrementConsecutiveWins', () => ({
  IncrementConsecutiveWins: { execute: jest.fn(player => { player.consecutiveWins++; return player; }) },
}));

describe('UpdateScoreIfWin', () => {
  it('should update score and increment consecutiveWins if game is won', () => {
    const player = new Player('bob', 10);
    const game = { status: 'won' } as Game;
    UpdateScoreIfWin.execute(player, game, 5);
    expect(player.score).toBe(15);
    expect(player.consecutiveWins).toBe(1);
  });
});
