import { resources } from "@/src/domain/entities/ControllerService";
import { Player } from "@/src/domain/entities/Player";


export class GetPlayerState {
  static execute(player: Player): object {
  return resources.playerPresenter.present(player);
  }
}
