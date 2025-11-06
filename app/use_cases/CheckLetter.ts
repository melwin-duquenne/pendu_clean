import { Game } from '../../domain/entities/Game';

export class CheckLetter {
  static execute(game: Game, letter: string): Game {
    if (game.status !== 'playing') return game;
    // Normalisation de la lettre proposée
  const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('œ', 'oe');
    const normalizedLetter = normalize(letter);
    // On stocke la lettre proposée normalisée
    if (game.guessedLetters.includes(normalizedLetter)) return game;
    game.guessedLetters.push(normalizedLetter);
    // Mot normalisé pour la comparaison
    const normalizedWord = normalize(game.word.name);
    if (!normalizedWord.includes(normalizedLetter)) {
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
    return game;
  }
}
