
import { CheckLetter } from "@/src/app/use_cases/CheckLetter";
import { StartGame } from "@/src/app/use_cases/StartGame";
import { Game } from "@/src/domain/entities/Game";
import { Player } from "@/src/domain/entities/Player";
import { Word } from "@/src/domain/entities/Word";


export class GameController {
  static start(player: Player, word: Word): Game {
    return StartGame.execute(player, word);
  }

  static guessLetter(game: Game, letter: string): Game {
    return CheckLetter.execute(game, letter);
  }
}
