import { GetPlayerState } from '../GetPlayerState';
import { Player } from '@/src/domain/entities/Player';

jest.mock('@/src/domain/entities/ControllerService', () => ({
  resources: {
    playerPresenter: { present: jest.fn().mockReturnValue({ username: 'bob', score: 42 }) },
  },
}));

describe('GetPlayerState', () => {
  it('should return the presented player state', () => {
    const player = new Player('bob', 42);
    const state = GetPlayerState.execute(player);
    expect(state).toEqual({ username: 'bob', score: 42 });
  });
});
