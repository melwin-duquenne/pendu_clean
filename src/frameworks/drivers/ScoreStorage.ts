import { Player } from "@/src/domain/entities/Player";

export class ScoreStorage {
  private static key = 'pendu_scores';

  static save(scores: Player[]): void {
    localStorage.setItem(this.key, JSON.stringify(scores));
  }

  static load(): Player[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }
}
