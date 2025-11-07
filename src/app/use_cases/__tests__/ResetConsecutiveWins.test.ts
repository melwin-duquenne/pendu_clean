import { ResetConsecutiveWins } from '../ResetConsecutiveWins';
import { Player } from '@/src/domain/entities/Player';

describe('ResetConsecutiveWins', () => {
  it('should reset consecutiveWins to 0', () => {
    const player = new Player('bob');
    player.consecutiveWins = 5;
    ResetConsecutiveWins.execute(player);
    expect(player.consecutiveWins).toBe(0);
  });
});
