import { resources } from '@/src/domain/entities/ControllerService';

describe('ScoreController', () => {
  beforeAll(() => {
    global.fetch = jest.fn((url, options) => {
      if (options && options.method === 'POST') {
        return Promise.resolve({ ok: true, status: 200, json: async () => ({}) });
      }
      return Promise.resolve({ ok: true, status: 200, json: async () => [] });
    }) as any;
  });

  it('should call save and load asynchronously (integration)', async () => {
    const controller = resources.scoreRepository;
    const player = { username: 'test', score: 0, level: 1, consecutiveWins: 0 };
    await expect(controller.save(player)).resolves.toBeUndefined();
    await expect(controller.load()).resolves.toEqual([]);
  });
});