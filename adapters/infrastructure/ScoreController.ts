import { SaveScore } from '../../app/use_cases/SaveScore';
import { Player } from '../../domain/entities/Player';
import { ScoreStorage } from '../../frameworks/drivers/ScoreStorage';

export class ScoreController {
  static save(player: Player): void {
    let scores = ScoreStorage.load();
    scores = SaveScore.execute(player, scores);
    ScoreStorage.save(scores);
  }
}
