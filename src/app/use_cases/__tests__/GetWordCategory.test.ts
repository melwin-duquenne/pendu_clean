import { GetWordCategory } from '../GetWordCategory';
import { Word } from '@/src/domain/entities/Word';

describe('GetWordCategory', () => {
  it('should return the category of the word', () => {
    const word = new Word('pendu', 'jeu');
    expect(GetWordCategory.execute(word)).toBe('jeu');
  });
});
