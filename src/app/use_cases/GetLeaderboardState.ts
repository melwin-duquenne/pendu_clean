import { resources } from "@/src/domain/entities/ControllerService";

export class GetLeaderboardState {
  static execute(top: number = 10): Promise<object[]> {
    return resources.leaderboardRepository.getLeaderboard(top);
  }
}
