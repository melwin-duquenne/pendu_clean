import { UpdateScore } from '../UpdateScore';
import { Player } from '@/src/domain/entities/Player';

describe('UpdateScore', () => {
  it('should add points to the player score', () => {
    const player = new Player('bob', 10);
    UpdateScore.execute(player, 5);
    expect(player.score).toBe(15);
  });
});
