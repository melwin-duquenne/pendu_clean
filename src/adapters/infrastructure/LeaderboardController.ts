
import { Player } from "@/src/domain/entities/Player";
import { frameworks } from '@/src/domain/entities/ControllerService';
import { GetLeaderboard } from "@/src/app/use_cases/GetLeaderboard";


export class LeaderboardController {
  async getLeaderboard(top: number = 10): Promise<Player[]> {
    const scores = await frameworks.scoreStorage.load();
    return GetLeaderboard.execute(scores, top);
  }
}
