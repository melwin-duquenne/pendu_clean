import { Player } from '../../domain/entities/Player';

export class GetInitialPlayer {
  static execute(username: string): Player {
    return new Player(username);
  }
}
