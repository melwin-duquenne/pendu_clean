import { GameController } from '../GameController';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';
import { Game } from '@/src/domain/entities/Game';

describe('GameController', () => {
  it('should start a game and guess a letter', () => {
    const player = new Player('test');
    const word = new Word('test', 'test');
    const controller = new GameController();
    const game = controller.start(player, word);
    expect(game).toBeInstanceOf(Game);
    const updated = controller.guessLetter(game, 'e');
    expect(updated.guessedLetters).toContain('e');
  });
});