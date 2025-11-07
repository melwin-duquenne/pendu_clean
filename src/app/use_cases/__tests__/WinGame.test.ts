import { WinGame } from '../WinGame';
import { Game } from '@/src/domain/entities/Game';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';

describe('WinGame', () => {
  function makeGame(status: 'playing' | 'won' | 'lost') {
    const game = new Game(new Player('bob'), new Word('pendu', 'test'));
    game.status = status;
    return game;
  }

  it('should return true if game is won', () => {
    expect(WinGame.execute(makeGame('won'))).toBe(true);
  });

  it('should return false if game is not won', () => {
    expect(WinGame.execute(makeGame('playing'))).toBe(false);
    expect(WinGame.execute(makeGame('lost'))).toBe(false);
  });
});
