import { ScoreStorage } from '../ScoreStorage';
import { Player } from '@/src/domain/entities/Player';

describe('ScoreStorage', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
      if (options && options.method === 'POST') {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({}) });
      }
      return Promise.resolve({ ok: true, status: 200, json: async () => [{ username: 'bob', score: 42, level: 1, consecutiveWins: 0 }] });
    }) as any;
  });

  it('should save scores via POST', async () => {
    const storage = new ScoreStorage();
    const scores = [new Player('bob', 42)];
    await expect(storage.save(scores)).resolves.toBeUndefined();
    expect(global.fetch).toHaveBeenCalledWith('/api/scores', expect.objectContaining({ method: 'POST' }));
  });

  it('should load scores via GET', async () => {
    const storage = new ScoreStorage();
    const result = await storage.load();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].username).toBe('bob');
    expect(result[0].score).toBe(42);
  });
});
