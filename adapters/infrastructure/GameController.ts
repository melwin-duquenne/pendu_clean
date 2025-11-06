import { Player } from '../../domain/entities/Player';
import { Word } from '../../domain/entities/Word';
import { Game } from '../../domain/entities/Game';
import { StartGame } from '../../app/use_cases/StartGame';
import { CheckLetter } from '../../app/use_cases/CheckLetter';

export class GameController {
  static start(player: Player, word: Word): Game {
    return StartGame.execute(player, word);
  }

  static guessLetter(game: Game, letter: string): Game {
    return CheckLetter.execute(game, letter);
  }
}
