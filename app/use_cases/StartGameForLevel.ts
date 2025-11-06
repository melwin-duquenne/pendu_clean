import { Player } from '../../domain/entities/Player';
import { Game } from '../../domain/entities/Game';
import { GetWordForLevel } from './GetWordForLevel';
import { StartGame } from './StartGame';

export class StartGameForLevel {
  static async execute(player: Player, level: number): Promise<Game> {
    const word = await GetWordForLevel.execute(level);
    return StartGame.execute(player, word);
  }
}
