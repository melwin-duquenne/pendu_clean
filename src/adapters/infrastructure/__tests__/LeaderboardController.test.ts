import { LeaderboardController } from '../LeaderboardController';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  frameworks: {
    scoreStorage: {
      load: jest.fn().mockResolvedValue([{ username: 'bob', score: 42, level: 1, consecutiveWins: 0 }]),
    },
  },
}));

jest.mock('../LeaderboardController', () => {
  const actual = jest.requireActual('../LeaderboardController');
  return {
    ...actual,
    GetLeaderboard: {
      execute: jest.fn((scores, top) => scores.slice(0, top)),
    },
  };
});

describe('LeaderboardController', () => {
  it('should have a getLeaderboard method', () => {
    const controller = new LeaderboardController();
    expect(typeof controller.getLeaderboard).toBe('function');
  });

  it('should return the top players asynchronously', async () => {
    const controller = new LeaderboardController();
    const result = await controller.getLeaderboard(1);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].username).toBe('bob');
    expect(result[0].score).toBe(42);
  });
});