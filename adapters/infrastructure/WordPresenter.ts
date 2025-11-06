import { Word } from '../../domain/entities/Word';

export class WordPresenter {
  static present(word: Word): object {
    return {
      name: word.name,
      category: word.category,
    };
  }
}
