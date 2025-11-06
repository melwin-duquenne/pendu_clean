import { Player } from '../../domain/entities/Player';

export class IncrementConsecutiveWins {
  static execute(player: Player): Player {
    player.consecutiveWins++;
    return player;
  }
}
