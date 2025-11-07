import { GetLeaderboardState } from '../GetLeaderboardState';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  resources: {
    leaderboardRepository: { getLeaderboard: jest.fn().mockResolvedValue([{ username: 'bob', score: 42 }]) },
  },
}));

describe('GetLeaderboardState', () => {
  it('should return the leaderboard as an array of objects', async () => {
    const result = await GetLeaderboardState.execute(1);
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].username).toBe('bob');
    expect(result[0].score).toBe(42);
  });
});
