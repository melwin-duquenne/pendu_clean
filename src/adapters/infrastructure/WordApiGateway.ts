import { Word } from "@/src/domain/entities/Word";


export class WordApiGateway {
  static async fetchWordBySize(size: number): Promise<Word> {
    const response = await fetch(`https://trouve-mot.fr/api/size/${size}`);
    const data = await response.json();
    const wordData = data[0];
    return new Word(wordData.name, wordData.categorie);
  }
}
