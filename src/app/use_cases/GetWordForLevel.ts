import { WordApiGateway } from "@/src/adapters/infrastructure/WordApiGateway";

export class GetWordForLevel {
  static async execute(level: number): Promise<ReturnType<typeof WordApiGateway.fetchWordBySize>> {
    // Level 1: 4 lettres, Level 2: 5 lettres, etc.
    const size = 3 + level;
    return await WordApiGateway.fetchWordBySize(size);
  }
}
