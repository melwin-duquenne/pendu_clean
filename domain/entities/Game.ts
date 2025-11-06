import { Player } from './Player';
import { Word } from './Word';

export class Game {
  public attemptsLeft: number;
  public guessedLetters: string[] = [];
  public status: 'playing' | 'won' | 'lost' = 'playing';

  constructor(
    public player: Player,
    public word: Word,
    public maxAttempts: number = 11
  ) {
    this.attemptsLeft = maxAttempts;
  }
}
