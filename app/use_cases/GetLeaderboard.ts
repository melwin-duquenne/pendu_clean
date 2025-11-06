import { Player } from '../../domain/entities/Player';

export class GetLeaderboard {
  static execute(scores: Player[], top: number = 10): Player[] {
    return scores.slice(0, top);
  }
}
