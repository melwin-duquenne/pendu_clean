import { resources } from "@/src/domain/entities/ControllerService";
import { Word } from "@/src/domain/entities/Word";


export class GetWordState {
  static execute(word: Word): object {
  return resources.wordPresenter.present(word);
  }
}
