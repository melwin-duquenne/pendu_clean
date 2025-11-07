import { GetLeaderboard } from "@/src/app/use_cases/GetLeaderboard";
import { Player } from "@/src/domain/entities/Player";
import { ScoreStorage } from "@/src/frameworks/drivers/ScoreStorage";


export class LeaderboardController {
  static getLeaderboard(top: number = 10): Player[] {
    const scores = ScoreStorage.load();
    return GetLeaderboard.execute(scores, top);
  }
}
