import { LeaderboardController } from "@/src/adapters/infrastructure/LeaderboardController";

export class GetLeaderboardState {
  static execute(top: number = 10): object[] {
    return LeaderboardController.getLeaderboard(top);
  }
}
