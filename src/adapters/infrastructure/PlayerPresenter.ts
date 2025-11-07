import { Player } from "@/src/domain/entities/Player";

export class PlayerPresenter {
  present(player: Player): object {
    return {
      username: player.username,
      score: player.score,
      level: player.level,
      consecutiveWins: player.consecutiveWins,
    };
  }
}
