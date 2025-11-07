import { LevelUp } from '../LevelUp';
import { Player } from '@/src/domain/entities/Player';

describe('LevelUp', () => {
  it('should increment level and reset consecutiveWins', () => {
    const player = new Player('bob');
    player.level = 2;
    player.consecutiveWins = 5;
    LevelUp.execute(player);
    expect(player.level).toBe(3);
    expect(player.consecutiveWins).toBe(0);
  });
});
