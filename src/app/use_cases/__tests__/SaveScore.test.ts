import { SaveScore } from '../SaveScore';
import { Player } from '@/src/domain/entities/Player';

describe('SaveScore', () => {
  it('should add the player to the scores and sort by score descending', () => {
    const scores = [new Player('alice', 20), new Player('bob', 10)];
    const player = new Player('eve', 30);
    const updated = SaveScore.execute(player, scores);
    expect(updated[0].username).toBe('eve');
    expect(updated[1].username).toBe('alice');
    expect(updated[2].username).toBe('bob');
  });
});
