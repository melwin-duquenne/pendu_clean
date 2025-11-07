import { resources } from "@/src/domain/entities/ControllerService";

export class GetWordForLevel {
  static async execute(level: number): Promise<ReturnType<typeof resources.wordGateway.fetchWordBySize>> {
    // Level 1: 4 lettres, Level 2: 5 lettres, etc.
    const size = 3 + level;
    return await resources.wordGateway.fetchWordBySize(size);
  }
}
