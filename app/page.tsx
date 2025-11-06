'use client';

import { useState } from 'react';
// Importe les cas d’usage et entités
import { GetInitialPlayer } from '../app/use_cases/GetInitialPlayer';
import { StartGameForLevel } from '../app/use_cases/StartGameForLevel';
import { Game } from '../domain/entities/Game';
import { Player } from '../domain/entities/Player';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [player, setPlayer] = useState<Player | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [error, setError] = useState('');
  const [leaderboard, setLeaderboard] = useState<{ username: string; score: number; level: number }[]>([]);

  const handleStart = async () => {
    setLoading(true);
    const newPlayer = GetInitialPlayer.execute(username);
    setPlayer(newPlayer);
    const newGame = await StartGameForLevel.execute(newPlayer, newPlayer.level);
    // Dévoile la première lettre du mot
    if (newGame.word && newGame.word.name && newGame.word.name.length > 0) {
      const firstLetter = newGame.word.name[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('œ', 'oe');
      newGame.guessedLetters.push(firstLetter);
    }
    setGame(newGame);
    setLoading(false);
  } 

  const handleGuess = async () => {
    setError('');
    if (!guessInput || !game) return;
    try {
      const { CheckLetter } = await import('../app/use_cases/CheckLetter');
      const updatedGame = CheckLetter.execute(game, guessInput);
      setGame({ ...updatedGame });
      setGuessInput('');
      // Gestion du score et du niveau si gagné
      if (updatedGame.status === 'won') {
        const { UpdateScoreIfWin } = await import('../app/use_cases/UpdateScoreIfWin');
        const { ShouldLevelUp } = await import('../app/use_cases/ShouldLevelUp');
        const { LevelUp } = await import('../app/use_cases/LevelUp');
        const { GetWordForLevel } = await import('../app/use_cases/GetWordForLevel');
        const { IncrementConsecutiveWins } = await import('../app/use_cases/IncrementConsecutiveWins');
        let updatedPlayer = UpdateScoreIfWin.execute(player!, updatedGame);
        updatedPlayer = IncrementConsecutiveWins.execute(updatedPlayer);
        if (ShouldLevelUp.execute(updatedPlayer)) {
          updatedPlayer = LevelUp.execute(updatedPlayer);
          updatedPlayer.consecutiveWins = 0;
        }
        const newWord = await GetWordForLevel.execute(updatedPlayer.level);
        const newGame = new Game(updatedPlayer, newWord);
        if (newGame.word && newGame.word.name && newGame.word.name.length > 0) {
          const firstLetter = newGame.word.name[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('œ', 'oe');
          newGame.guessedLetters.push(firstLetter);
        }
        setGame(newGame);
        setPlayer(updatedPlayer);
      }
      // Sauvegarde du score si perdu
      if (updatedGame.status === 'lost') {
        const { ScoreController } = await import('../adapters/infrastructure/ScoreController');
        if (player) {
          ScoreController.save(player);
        }
        const { GetLeaderboardState } = await import('../app/use_cases/GetLeaderboardState');
        const leaderboardData = GetLeaderboardState.execute(10);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData.filter((p: any): p is { username: string; score: number; level: number } => p.username && typeof p.score === 'number' && typeof p.level === 'number') : []);
      }
    } catch {
      setError('Erreur lors de la vérification.');
    }
  }

  return (
    <main style={{ padding: 32 }}>
      {!player ? (
        <div>
          <h1>Bienvenue au Pendu</h1>
          <input
            type="text"
            placeholder="Entrez votre pseudo"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <button onClick={handleStart} disabled={!username || loading}>
            {loading ? 'Chargement...' : 'Commencer'}
          </button>
        </div>
      ) : (
        <div>
          <h2>Joueur : {player.username}</h2>
          {game && (
            <div>
              <p>Niveau : {player?.level}</p>
              <p style={{ color: 'red', fontWeight: 'bold' }}>Mot complet (test) : {game.word && game.word.name ? game.word.name : ''}</p>
              <p>Mot à deviner : {game.word && game.word.name ? game.word.name.split('').map((l: string) => (game.guessedLetters.includes(l) ? l : '_')).join(' ') : ''}</p>
              <p>Tentatives restantes : {game.attemptsLeft}</p>
              <p>Lettres proposées : {game.guessedLetters.join(', ')}</p>
              <p>Status : {game.status}</p>
              {game.status === 'playing' && (
                <div style={{ marginTop: 16 }}>
                  <input
                    type="text"
                    placeholder="Proposez une lettre ou un mot"
                    value={guessInput}
                    onChange={e => setGuessInput(e.target.value)}
                    style={{ marginRight: 8 }}
                  />
                  <button onClick={handleGuess} disabled={!guessInput}>
                    Proposer
                  </button>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
              )}
              {game.status === 'won' && <p style={{ color: 'green' }}>Bravo, vous avez gagné !</p>}
              {game.status === 'lost' && <p style={{ color: 'red' }}>Dommage, partie perdue.</p>}
              {leaderboard.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <h3>Classement des scores</h3>
                  <ol>
                    {leaderboard.map((p, idx) => (
                      <li key={idx}>
                        {p.username} : {p.score} pts (Niveau {p.level})
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}