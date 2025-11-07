import { GameController } from '../../adapters/infrastructure/GameController';
import { ScoreController } from '../../adapters/infrastructure/ScoreController';
import { LeaderboardController } from '../../adapters/infrastructure/LeaderboardController';
import { WordApiGateway } from '../../adapters/infrastructure/WordApiGateway';
import { GamePresenter } from '../../adapters/infrastructure/GamePresenter';
import { PlayerPresenter } from '../../adapters/infrastructure/PlayerPresenter';
import { WordPresenter } from '../../adapters/infrastructure/WordPresenter';
import { ScoreStorage } from '../../frameworks/drivers/ScoreStorage';

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
