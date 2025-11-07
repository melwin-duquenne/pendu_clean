import { Player } from "@/src/domain/entities/Player";
import { GetWordForLevel } from "./GetWordForLevel";
import { Game } from "@/src/domain/entities/Game";
import { StartGame } from "./StartGame";


export class StartGameForLevel {
  static async execute(player: Player, level: number): Promise<Game> {
    const word = await GetWordForLevel.execute(level);
    return StartGame.execute(player, word);
  }
}
