import { WordApiGateway } from './adapters/infrastructure/WordApiGateway';
import { StartGame } from './app/use_cases/StartGame';
import { CheckLetter } from './app/use_cases/CheckLetter';
import { LevelUp } from './app/use_cases/LevelUp';
import { SaveScore } from './app/use_cases/SaveScore';
import { GetLeaderboard } from './app/use_cases/GetLeaderboard';
import { ScoreStorage } from './frameworks/drivers/ScoreStorage';
import { Player } from './domain/entities/Player';

// Exemple d'assemblage des dépendances et d'utilisation
async function main() {
  // Chargement des scores
  let scores = ScoreStorage.load();

  // Création du joueur
  const player = new Player('pseudo');

  // Récupération du mot
  const word = await WordApiGateway.fetchWordBySize(5);

  // Démarrage de la partie
  let game = StartGame.execute(player, word);

  // Exemple de vérification d'une lettre
  game = CheckLetter.execute(game, 'e');

  // Si partie perdue, sauvegarde du score
  if (game.status === 'lost') {
    scores = SaveScore.execute(player, scores);
    ScoreStorage.save(scores);
  }

  // Affichage du classement
  const leaderboard = GetLeaderboard.execute(scores);
  console.log(leaderboard);
}

main();
