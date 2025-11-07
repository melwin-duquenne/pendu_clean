import { GuessLetterForGame } from '../GuessLetterForGame';
import { Game } from '@/src/domain/entities/Game';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  resources: {
    gameController: { guessLetter: jest.fn((game, letter) => ({ ...game, guessedLetters: [...game.guessedLetters, letter] })) },
  },
}));

describe('GuessLetterForGame', () => {
  it('should call gameController.guessLetter and return updated game', () => {
    const game = new Game(new Player('bob'), new Word('pendu', 'test'));
    const updated = GuessLetterForGame.execute(game, 'a');
    expect(updated.guessedLetters).toContain('a');
  });
});
