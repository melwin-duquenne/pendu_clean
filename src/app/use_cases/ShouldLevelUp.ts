import { Player } from "@/src/domain/entities/Player";

export class ShouldLevelUp {
  static execute(player: Player): boolean {
    return player.consecutiveWins >= 5;
  }
}
