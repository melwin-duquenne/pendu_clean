import { Game } from "@/src/domain/entities/Game";

export class GameOver {
  static execute(game: Game): boolean {
    return game.status === 'lost';
  }
}
