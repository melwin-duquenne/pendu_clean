import { Player } from "@/src/domain/entities/Player";


export class ResetConsecutiveWins {
  static execute(player: Player): Player {
    player.consecutiveWins = 0;
    return player;
  }
}
