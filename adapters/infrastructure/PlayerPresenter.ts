import { Player } from '../../domain/entities/Player';

export class PlayerPresenter {
  static present(player: Player): object {
    return {
      username: player.username,
      score: player.score,
      level: player.level,
      consecutiveWins: player.consecutiveWins,
    };
  }
}
