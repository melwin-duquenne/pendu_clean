import { CheckLetter } from '../CheckLetter';
import { Game } from '@/src/domain/entities/Game';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';

describe('CheckLetter', () => {
  function makeGame(word = 'pendu', attempts = 6) {
    return new Game(new Player('bob'), new Word(word, 'test'), attempts);
  }

  it('should mark letter as guessed and not lose if correct', () => {
    const game = makeGame('abc');
    const updated = CheckLetter.execute(game, 'a');
    expect(updated.guessedLetters).toContain('a');
    expect(updated.status).toBe('playing');
    expect(updated.attemptsLeft).toBe(6);
  });

  it('should decrement attempts if wrong letter', () => {
    const game = makeGame('abc');
    const updated = CheckLetter.execute(game, 'z');
    expect(updated.guessedLetters).toContain('z');
    expect(updated.status).toBe('playing');
    expect(updated.attemptsLeft).toBe(5);
  });

  it('should win if all letters guessed', () => {
    const game = makeGame('ab');
    game.guessedLetters = ['a'];
    const updated = CheckLetter.execute(game, 'b');
    expect(updated.status).toBe('won');
  });

  it('should lose if attempts reach zero', () => {
    const game = makeGame('ab', 1);
    const updated = CheckLetter.execute(game, 'z');
    expect(updated.status).toBe('lost');
  });

  it('should win if correct word is guessed', () => {
    const game = makeGame('pendu');
    const updated = CheckLetter.execute(game, 'pendu');
    expect(updated.status).toBe('won');
  });

  it('should lose if wrong word is guessed and attempts reach zero', () => {
    const game = makeGame('pendu', 1);
    const updated = CheckLetter.execute(game, 'wrong');
    expect(updated.status).toBe('lost');
  });
});
