import { GetWordForLevel } from '../GetWordForLevel';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  resources: {
    wordGateway: {
      fetchWordBySize: jest.fn().mockResolvedValue({ name: 'pendu', category: 'jeu' }),
    },
  },
}));

describe('GetWordForLevel', () => {
  it('should fetch a word of the correct size for the level', async () => {
    const word = await GetWordForLevel.execute(2);
    expect(word).toEqual({ name: 'pendu', category: 'jeu' });
  });
});
