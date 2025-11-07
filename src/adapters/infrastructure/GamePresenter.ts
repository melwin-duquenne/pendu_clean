import { Game } from "@/src/domain/entities/Game";

export class GamePresenter {
  static present(game: Game): object {
    return {
      word: game.word.name.split('').map(l => (game.guessedLetters.includes(l) ? l : '_')).join(' '),
      attemptsLeft: game.attemptsLeft,
      guessedLetters: game.guessedLetters,
      status: game.status,
    };
  }
}
