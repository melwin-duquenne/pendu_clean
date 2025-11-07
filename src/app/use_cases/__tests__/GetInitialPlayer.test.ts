import { GetInitialPlayer } from '../GetInitialPlayer';
import { Player } from '@/src/domain/entities/Player';

describe('GetInitialPlayer', () => {
  it('should create a new Player with the given username', () => {
    const player = GetInitialPlayer.execute('bob');
    expect(player).toBeInstanceOf(Player);
    expect(player.username).toBe('bob');
    expect(player.score).toBe(0);
    expect(player.level).toBe(1);
    expect(player.consecutiveWins).toBe(0);
  });
});
