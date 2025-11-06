import { Player } from '../../domain/entities/Player';
import { Word } from '../../domain/entities/Word';
import { Game } from '../../domain/entities/Game';

export class StartGame {
  static execute(player: Player, word: Word): Game {
    return new Game(player, word);
  }
}
