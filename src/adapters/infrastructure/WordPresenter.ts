import { Word } from "@/src/domain/entities/Word";

export class WordPresenter {
  present(word: Word): object {
    return {
      name: word.name,
      category: word.category,
    };
  }
}
