import { Word } from '../Word';

describe('Word entity', () => {
  it('should initialize with name and category', () => {
    const word = new Word('pendu', 'jeu');
    expect(word.name).toBe('pendu');
    expect(word.category).toBe('jeu');
  });
});
