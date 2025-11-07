
import { Game } from '@/src/domain/entities/Game';
import { GameController } from '@/src/adapters/infrastructure/GameController';

export class GuessLetterForGame {
  static execute(game: Game, letter: string): Game {
    return GameController.guessLetter(game, letter);
  }
}
