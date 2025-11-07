
import { Game } from '@/src/domain/entities/Game';
import { resources } from '@/src/domain/entities/ControllerService';

export class GuessLetterForGame {
  static execute(game: Game, letter: string): Game {
  return resources.gameController.guessLetter(game, letter);
  }
}
