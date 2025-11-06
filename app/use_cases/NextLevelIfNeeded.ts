import { Player } from '../../domain/entities/Player';
import { ShouldLevelUp } from './ShouldLevelUp';
import { LevelUp } from './LevelUp';
import { ResetConsecutiveWins } from './ResetConsecutiveWins';

export class NextLevelIfNeeded {
  static execute(player: Player): Player {
    if (ShouldLevelUp.execute(player)) {
      LevelUp.execute(player);
      ResetConsecutiveWins.execute(player);
    }
    return player;
  }
}
