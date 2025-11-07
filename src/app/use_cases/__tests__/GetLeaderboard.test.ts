import { GetLeaderboard } from '../GetLeaderboard';
import { Player } from '@/src/domain/entities/Player';

describe('GetLeaderboard', () => {
  it('should return the top N players', () => {
    const scores = [
      new Player('bob', 10),
      new Player('alice', 20),
      new Player('eve', 15),
    ];
    const top2 = GetLeaderboard.execute(scores, 2);
    expect(top2.length).toBe(2);
    expect(top2[0].username).toBe('bob');
    expect(top2[1].username).toBe('alice');
  });

  it('should return all if less than top', () => {
    const scores = [new Player('bob', 10)];
    const top5 = GetLeaderboard.execute(scores, 5);
    expect(top5.length).toBe(1);
    expect(top5[0].username).toBe('bob');
  });
});
