import { Game } from "@/src/domain/entities/Game";

export class CheckLetter {
  static execute(game: Game, input: string): Game {
    if (game.status !== 'playing') return game;
    const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('œ', 'oe');
    const normalizedInput = normalize(input.trim().toLowerCase());
    const normalizedWord = normalize(game.word.name.trim().toLowerCase());
    if (input.length === 1) {
      // Lettre
      if (game.guessedLetters.includes(normalizedInput)) return game;
      game.guessedLetters.push(normalizedInput);
      if (!normalizedWord.includes(normalizedInput)) {
        game.attemptsLeft--;
        if (game.attemptsLeft <= 0) {
          game.status = 'lost';
        }
      } else {
        // Check if all letters are guessed
        const allGuessed = normalizedWord
          .split('')
          .every(l => l === ' ' || game.guessedLetters.includes(l));
        if (allGuessed) {
          game.status = 'won';
        }
      }
    } else if (input.length > 1) {
      // Mot
      if (normalizedInput === normalizedWord) {
        game.guessedLetters = normalizedWord.split('');
        game.status = 'won';
      } else {
        game.attemptsLeft--;
        if (game.attemptsLeft <= 0) {
          game.status = 'lost';
        }
      }
    }
    return game;
  }
}
