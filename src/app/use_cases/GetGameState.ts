
import { resources } from "@/src/domain/entities/ControllerService";
import { Game } from "@/src/domain/entities/Game";


export class GetGameState {
  static execute(game: Game): object {
    return resources.gamePresenter.present(game);
  }
}
