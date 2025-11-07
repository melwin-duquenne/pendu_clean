import { GamePresenter } from '../GamePresenter';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';
import { Game } from '@/src/domain/entities/Game';

describe('GamePresenter', () => {
  it('should present a game state', () => {
    const player = new Player('test');
    const word = new Word('test', 'test');
    const game = new Game(player, word);
    game.guessedLetters.push('t');
    const presenter = new GamePresenter();
    const result = presenter.present(game);
    expect(result).toHaveProperty('word');
    expect(result).toHaveProperty('attemptsLeft');
    expect(result).toHaveProperty('guessedLetters');
    expect(result).toHaveProperty('status');
  });
});