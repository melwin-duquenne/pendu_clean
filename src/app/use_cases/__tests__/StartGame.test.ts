import { StartGame } from '../StartGame';
import { Game } from '@/src/domain/entities/Game';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';

describe('StartGame', () => {
  it('should create a new Game with the given player and word', () => {
    const player = new Player('bob');
    const word = new Word('pendu', 'test');
    const game = StartGame.execute(player, word);
    expect(game).toBeInstanceOf(Game);
    expect(game.player).toBe(player);
    expect(game.word).toBe(word);
    expect(game.status).toBe('playing');
    expect(game.attemptsLeft).toBeGreaterThan(0);
  });
});
