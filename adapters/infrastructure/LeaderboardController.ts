import { GetLeaderboard } from '../../app/use_cases/GetLeaderboard';
import { Player } from '../../domain/entities/Player';
import { ScoreStorage } from '../../frameworks/drivers/ScoreStorage';

export class LeaderboardController {
  static getLeaderboard(top: number = 10): Player[] {
    const scores = ScoreStorage.load();
    return GetLeaderboard.execute(scores, top);
  }
}
