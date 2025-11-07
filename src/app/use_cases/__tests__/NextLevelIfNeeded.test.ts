import { NextLevelIfNeeded } from '../NextLevelIfNeeded';
import { Player } from '@/src/domain/entities/Player';

jest.mock('../ShouldLevelUp', () => ({
  ShouldLevelUp: { execute: jest.fn(() => true) },
}));
jest.mock('../LevelUp', () => ({
  LevelUp: { execute: jest.fn(player => { player.level++; return player; }) },
}));
jest.mock('../ResetConsecutiveWins', () => ({
  ResetConsecutiveWins: { execute: jest.fn(player => { player.consecutiveWins = 0; return player; }) },
}));

describe('NextLevelIfNeeded', () => {
  it('should level up and reset consecutiveWins if needed', () => {
    const player = new Player('bob');
    player.level = 1;
    player.consecutiveWins = 3;
    NextLevelIfNeeded.execute(player);
    expect(player.level).toBe(2);
    expect(player.consecutiveWins).toBe(0);
  });
});
