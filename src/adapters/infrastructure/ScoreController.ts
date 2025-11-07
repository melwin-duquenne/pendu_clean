import { SaveScore } from "@/src/app/use_cases/SaveScore";
import { Player } from "@/src/domain/entities/Player";
import { ScoreStorage } from "@/src/frameworks/drivers/ScoreStorage";


export class ScoreController {
  static save(player: Player): void {
    let scores = ScoreStorage.load();
    scores = SaveScore.execute(player, scores);
    ScoreStorage.save(scores);
  }
}
