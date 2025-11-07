import { GamePresenter } from "@/src/adapters/infrastructure/GamePresenter";
import { Game } from "@/src/domain/entities/Game";


export class GetGameState {
  static execute(game: Game): object {
    return GamePresenter.present(game);
  }
}
