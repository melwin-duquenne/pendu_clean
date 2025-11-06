import { Player } from '../../domain/entities/Player';

export class SaveScore {
  static execute(player: Player, scores: Player[]): Player[] {
    scores.push({ ...player });
    scores.sort((a, b) => b.score - a.score);
    return scores;
  }
}
