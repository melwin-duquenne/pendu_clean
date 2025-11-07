import { ShouldLevelUp } from '../ShouldLevelUp';
import { Player } from '@/src/domain/entities/Player';

describe('ShouldLevelUp', () => {
  it('should return true if consecutiveWins >= 5', () => {
    const player = new Player('bob');
    player.consecutiveWins = 5;
    expect(ShouldLevelUp.execute(player)).toBe(true);
  });
  it('should return false if consecutiveWins < 5', () => {
    const player = new Player('bob');
    player.consecutiveWins = 3;
    expect(ShouldLevelUp.execute(player)).toBe(false);
  });
});
