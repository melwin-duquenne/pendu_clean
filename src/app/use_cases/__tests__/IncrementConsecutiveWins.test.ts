import { IncrementConsecutiveWins } from '../IncrementConsecutiveWins';
import { Player } from '@/src/domain/entities/Player';

describe('IncrementConsecutiveWins', () => {
  it('should increment consecutiveWins on the player', () => {
    const player = new Player('bob');
    player.consecutiveWins = 2;
    IncrementConsecutiveWins.execute(player);
    expect(player.consecutiveWins).toBe(3);
  });
});
