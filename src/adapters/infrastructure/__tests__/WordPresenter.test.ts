import { WordPresenter } from '../WordPresenter';
import { Word } from '@/src/domain/entities/Word';

describe('WordPresenter', () => {
  it('should present a word state', () => {
    const word = new Word('test', 'test');
    const presenter = new WordPresenter();
    const result = presenter.present(word);
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('category');
  });
});