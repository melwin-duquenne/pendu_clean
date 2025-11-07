import { Player } from "@/src/domain/entities/Player";

export class PlayerController {
  static createPlayer(username: string): Player {
    return new Player(username);
  }
}
