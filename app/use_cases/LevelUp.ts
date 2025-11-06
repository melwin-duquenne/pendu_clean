import { Player } from '../../domain/entities/Player';

export class LevelUp {
  static execute(player: Player): Player {
    player.level++;
    player.consecutiveWins = 0;
    return player;
  }
}
