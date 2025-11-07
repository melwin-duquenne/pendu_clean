import { Player } from '../Player';

describe('Player entity', () => {
  it('should initialize with default values', () => {
    const player = new Player('bob');
    expect(player.username).toBe('bob');
    expect(player.score).toBe(0);
    expect(player.level).toBe(1);
    expect(player.consecutiveWins).toBe(0);
  });

  it('should allow custom values', () => {
    const player = new Player('alice', 42, 3, 2);
    expect(player.username).toBe('alice');
    expect(player.score).toBe(42);
    expect(player.level).toBe(3);
    expect(player.consecutiveWins).toBe(2);
  });
});
