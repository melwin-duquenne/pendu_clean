import { Game } from "@/src/domain/entities/Game";
import { Player } from "@/src/domain/entities/Player";
import { Word } from "@/src/domain/entities/Word";


export class StartGame {
  static execute(player: Player, word: Word): Game {
    return new Game(player, word);
  }
}
