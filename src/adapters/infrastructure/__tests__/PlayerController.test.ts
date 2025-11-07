import { PlayerController } from '../PlayerController';
import { Player } from '@/src/domain/entities/Player';

describe('PlayerController', () => {
  it('should be instantiable', () => {
    const controller = new PlayerController();
    expect(controller).toBeInstanceOf(PlayerController);
  });

  it('should create a Player with the correct username', () => {
    const player = PlayerController.createPlayer('bob');
    expect(player).toBeInstanceOf(Player);
    expect(player.username).toBe('bob');
    expect(player.score).toBe(0);
    expect(player.level).toBe(1);
    expect(player.consecutiveWins).toBe(0);
  });
});