import { GetGameState } from '../GetGameState';
import { Game } from '@/src/domain/entities/Game';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  resources: {
    gamePresenter: { present: jest.fn().mockReturnValue({ foo: 'bar' }) },
  },
}));

describe('GetGameState', () => {
  it('should return the presented game state', () => {
    const game = new Game(new Player('bob'), new Word('pendu', 'test'));
    const state = GetGameState.execute(game);
    expect(state).toEqual({ foo: 'bar' });
  });
});
