import { Player } from "@/src/domain/entities/Player";

export class UpdateScore {
  static execute(player: Player, points: number): Player {
    player.score += points;
    return player;
  }
}
