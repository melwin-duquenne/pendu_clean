import { Word } from '../../domain/entities/Word';
import { WordPresenter } from '../../adapters/infrastructure/WordPresenter';

export class GetWordState {
  static execute(word: Word): object {
    return WordPresenter.present(word);
  }
}
