import { Word } from '../../domain/entities/Word';

export class GetWordCategory {
  static execute(word: Word): string {
    return word.category;
  }
}
