import { Game } from '../../domain/entities/Game';

export class WinGame {
  static execute(game: Game): boolean {
    return game.status === 'won';
  }
}
