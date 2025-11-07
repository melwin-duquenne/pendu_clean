import { PlayerPresenter } from "@/src/adapters/infrastructure/PlayerPresenter";
import { Player } from "@/src/domain/entities/Player";


export class GetPlayerState {
  static execute(player: Player): object {
    return PlayerPresenter.present(player);
  }
}
