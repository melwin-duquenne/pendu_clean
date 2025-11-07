import { GetWordState } from '../GetWordState';
import { Word } from '@/src/domain/entities/Word';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  resources: {
    wordPresenter: { present: jest.fn().mockReturnValue({ name: 'pendu', category: 'jeu' }) },
  },
}));

describe('GetWordState', () => {
  it('should return the presented word state', () => {
    const word = new Word('pendu', 'jeu');
    const state = GetWordState.execute(word);
    expect(state).toEqual({ name: 'pendu', category: 'jeu' });
  });
});
