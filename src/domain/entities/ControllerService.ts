
import { GameController } from '@/src/adapters/infrastructure/GameController';
import { GamePresenter } from '@/src/adapters/infrastructure/GamePresenter';
import { LeaderboardController } from '@/src/adapters/infrastructure/LeaderboardController';
import { PlayerPresenter } from '@/src/adapters/infrastructure/PlayerPresenter';
import { ScoreController } from '@/src/adapters/infrastructure/ScoreController';
import { WordApiGateway } from '@/src/adapters/infrastructure/WordApiGateway';
import { WordPresenter } from '@/src/adapters/infrastructure/WordPresenter';
import { ScoreStorage } from '@/src/frameworks/drivers/ScoreStorage';

export const resources = {
  scoreRepository: new ScoreController(),
  leaderboardRepository: new LeaderboardController(),
  wordGateway: new WordApiGateway(),
  gamePresenter: new GamePresenter(),
  playerPresenter: new PlayerPresenter(),
  wordPresenter: new WordPresenter(),
  gameController: new GameController(),
};
export const frameworks = {
	scoreStorage: new ScoreStorage(),
};
