import { Player } from "@/src/domain/entities/Player";

export class ScoreStorage {
  async save(scores: Player[]): Promise<void> {
    await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scores),
    });
  }

  async load(): Promise<Player[]> {
    const res = await fetch('/api/scores');
    if (!res.ok) return [];
    return await res.json();
  }
}
