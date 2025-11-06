import { Game } from '../../domain/entities/Game';
import { GamePresenter } from '../../adapters/infrastructure/GamePresenter';

export class GetGameState {
  static execute(game: Game): object {
    return GamePresenter.present(game);
  }
}
