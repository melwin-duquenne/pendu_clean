import { Game } from '../Game';
import { Player } from '../Player';
import { Word } from '../Word';

describe('Game entity', () => {
  it('should initialize with correct properties', () => {
    const player = new Player('bob');
    const word = new Word('pendu', 'jeu');
    const game = new Game(player, word, 7);
    expect(game.player).toBe(player);
    expect(game.word).toBe(word);
    expect(game.maxAttempts).toBe(7);
    expect(game.attemptsLeft).toBe(7);
    expect(game.status).toBe('playing');
    expect(game.guessedLetters).toEqual([]);
  });

  it('should default maxAttempts to 11', () => {
    const game = new Game(new Player('alice'), new Word('mot', 'cat'));
    expect(game.maxAttempts).toBe(11);
    expect(game.attemptsLeft).toBe(11);
  });
});
