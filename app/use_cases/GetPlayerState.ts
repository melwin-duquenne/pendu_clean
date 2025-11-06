import { Player } from '../../domain/entities/Player';
import { PlayerPresenter } from '../../adapters/infrastructure/PlayerPresenter';

export class GetPlayerState {
  static execute(player: Player): object {
    return PlayerPresenter.present(player);
  }
}
