import { PlayerPresenter } from '../PlayerPresenter';
import { Player } from '@/src/domain/entities/Player';

describe('PlayerPresenter', () => {
  it('should present a player state', () => {
    const player = new Player('test');
    const presenter = new PlayerPresenter();
    const result = presenter.present(player);
    expect(result).toHaveProperty('username');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('level');
    expect(result).toHaveProperty('consecutiveWins');
  });
});