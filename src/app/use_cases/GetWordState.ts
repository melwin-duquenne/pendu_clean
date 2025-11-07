import { WordPresenter } from "@/src/adapters/infrastructure/WordPresenter";
import { Word } from "@/src/domain/entities/Word";


export class GetWordState {
  static execute(word: Word): object {
    return WordPresenter.present(word);
  }
}
