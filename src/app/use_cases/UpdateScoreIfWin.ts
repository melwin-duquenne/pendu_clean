import { Game } from "@/src/domain/entities/Game";
import { Player } from "@/src/domain/entities/Player";
import { WinGame } from "./WinGame";
import { UpdateScore } from "./UpdateScore";
import { IncrementConsecutiveWins } from "./IncrementConsecutiveWins";


export class UpdateScoreIfWin {
  static execute(player: Player, game: Game, points: number = 10): Player {
    if (WinGame.execute(game)) {
      UpdateScore.execute(player, points);
      IncrementConsecutiveWins.execute(player);
    }
    return player;
  }
}
