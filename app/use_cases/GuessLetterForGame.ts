import { Game } from '../../domain/entities/Game';
import { GameController } from '../../adapters/infrastructure/GameController';
import { GetGameState } from './GetGameState';

export class GuessLetterForGame {
  static execute(game: Game, letter: string): Game {
    return GameController.guessLetter(game, letter);
  }
}
