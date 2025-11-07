import { Player } from "@/src/domain/entities/Player";
import { frameworks } from '@/src/domain/entities/ControllerService';
import { SaveScore } from "@/src/app/use_cases/SaveScore";

export class ScoreController {
  async save(player: Player): Promise<void> {
    let scores = await frameworks.scoreStorage.load();
    scores = SaveScore.execute(player, scores);
    await frameworks.scoreStorage.save(scores);
  }

  async load(): Promise<Player[]> {
    return await frameworks.scoreStorage.load();
  }
}
