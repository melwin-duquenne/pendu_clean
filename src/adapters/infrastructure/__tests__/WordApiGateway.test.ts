import { WordApiGateway } from '../WordApiGateway';
import { Word } from '@/src/domain/entities/Word';

describe('WordApiGateway', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ name: 'pendu', categorie: 'jeu' }]),
      })
    ) as any;
  });

  it('should be instantiable', () => {
    const gateway = new WordApiGateway();
    expect(gateway).toBeInstanceOf(WordApiGateway);
  });

  it('should fetch a word by size and return a Word instance', async () => {
    const gateway = new WordApiGateway();
    const word = await gateway.fetchWordBySize(5);
    expect(word).toBeInstanceOf(Word);
    expect(word.name).toBe('pendu');
    expect(word.category).toBe('jeu');
  });
});