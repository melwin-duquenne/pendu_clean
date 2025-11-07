import { CheckLetter } from './src/app/use_cases/CheckLetter';
import { GetLeaderboard } from './src/app/use_cases/GetLeaderboard';
import { SaveScore } from './src/app/use_cases/SaveScore';
import { StartGame } from './src/app/use_cases/StartGame';
import { resources, frameworks } from './src/domain/entities/ControllerService';
import { Player } from './src/domain/entities/Player';

// Exemple d'assemblage des dépendances et d'utilisation
async function main() {
  // Chargement des scores
  let scores = await frameworks.scoreStorage.load();

  // Création du joueur
  const player = new Player('pseudo');

  // Récupération du mot
  const word = await resources.wordGateway.fetchWordBySize(5);

  // Démarrage de la partie
  let game = StartGame.execute(player, word);

  // Exemple de vérification d'une lettre
  game = CheckLetter.execute(game, 'e');

  // Si partie perdue, sauvegarde du score
  if (game.status === 'lost') {
    scores = SaveScore.execute(player, scores);
    await frameworks.scoreStorage.save(scores);
  }

  // Affichage du classement
  const leaderboard = GetLeaderboard.execute(scores);
  console.log(leaderboard);
}

main();
