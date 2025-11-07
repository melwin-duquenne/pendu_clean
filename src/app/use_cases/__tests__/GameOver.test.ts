import { GameOver } from '../GameOver';
import { Game } from '@/src/domain/entities/Game';
import { Player } from '@/src/domain/entities/Player';
import { Word } from '@/src/domain/entities/Word';

describe('GameOver', () => {
  function makeGame(status: 'playing' | 'won' | 'lost') {
    const game = new Game(new Player('bob'), new Word('pendu', 'test'));
    game.status = status;
    return game;
  }

  it('should return true if game is lost', () => {
    expect(GameOver.execute(makeGame('lost'))).toBe(true);
  });

  it('should return false if game is playing', () => {
    expect(GameOver.execute(makeGame('playing'))).toBe(false);
  });

  it('should return false if game is won', () => {
    expect(GameOver.execute(makeGame('won'))).toBe(false);
  });
});
