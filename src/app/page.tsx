'use client';

import { useState } from 'react';
// Importe les cas d’usage et entités

import Image from 'next/image';
import { Player } from '../domain/entities/Player';
import { Game } from '../domain/entities/Game';
import { GetInitialPlayer } from './use_cases/GetInitialPlayer';
import { StartGameForLevel } from './use_cases/StartGameForLevel';

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
      const { CheckLetter } = await import('./use_cases/CheckLetter');
      const updatedGame = CheckLetter.execute(game, guessInput);
      setGame({ ...updatedGame });
      setGuessInput('');
      // Gestion du score et du niveau si gagné
      if (updatedGame.status === 'won') {
        const { UpdateScoreIfWin } = await import('./use_cases/UpdateScoreIfWin');
        const { ShouldLevelUp } = await import('./use_cases/ShouldLevelUp');
        const { LevelUp } = await import('./use_cases/LevelUp');
        const { GetWordForLevel } = await import('./use_cases/GetWordForLevel');
        const { IncrementConsecutiveWins } = await import('./use_cases/IncrementConsecutiveWins');
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
        const { resources } = await import('../domain/entities/ControllerService');
        if (player) {
          await resources.scoreRepository.save(player);
        }
        const scores = await resources.scoreRepository.load();
        setLeaderboard(Array.isArray(scores) ? scores.filter((p: any): p is { username: string; score: number; level: number } => p.username && typeof p.score === 'number' && typeof p.level === 'number') : []);
      }
    } catch {
      setError('Erreur lors de la vérification.');
    }
  }

  return (
  <main style={{ padding: 32 }} className='flex w-full flex-col items-center h-screen justify-center arcade-bg'>
      {!player ? (
        <div className='flex flex-col items-center arcade-block'>
          <h1 className='arcade-title'>Bienvenue au Pendu</h1>
          <input
            type="text"
            placeholder="Entrez votre pseudo"
            className='arcade-input'
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <button onClick={handleStart} disabled={!username || loading} className='arcade-btn'>
            {loading ? 'Chargement...' : 'Commencer'}
          </button>
        </div>
      ) : (
        <div className='flex flex-col arcade-block w-2/3'>
          <div className='flex w-full justify-between p-2 text-2xl'>
            <h2 className='arcade-section-title p-2'>Joueur : {player.username}</h2>
            <p className='arcade-label'>Niveau : {player?.level}</p>
          </div>
          {game && (
            <div className='flex flex-col items-center'>
              {game.status === 'lost' ? (
                <>
                  <p className="game-over-glitch">GAME OVER</p>
                  {leaderboard.length > 0 && (
                    <div className="scoreboard-arcade">
                      <h3>Classement des scores</h3>
                      <ol>
                        {leaderboard.map((p, idx) => (
                          <li key={idx} className="scoreboard-row">
                            <span className="scoreboard-rank">{idx + 1}.</span>
                            <span className="scoreboard-name">{p.username}</span>
                            <span className="scoreboard-score">{p.score} pts</span>
                            <span className="scoreboard-level">(Niveau {p.level})</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className='arcade-label' style={{ color: '#ff2222', fontWeight: 'bold' }}>Mot complet (test) : {game.word && game.word.name ? game.word.name : ''}</p>
                  <p className='flex flex-col arcade-label'>Mot à deviner :<span className='text-3xl'>{game.word && game.word.name ? game.word.name.split('').map((l: string) => (game.guessedLetters.includes(l) ? l : '_')).join(' ') : ''}</span></p>
                  <Image src={`/pendu/${game.attemptsLeft}.png`} alt="Image description" width={300} height={300} style={{ margin: '1.5rem 0' }} />
                  <p className='arcade-label'>status: {game.status}</p>
                  <p className='arcade-label'>Lettres proposées : {game.guessedLetters.join(', ')}</p>
                  {game.status === 'playing' && (
                    <div style={{ marginTop: 16 }}>
                      <input
                        type="text"
                        placeholder="Proposez une lettre ou un mot"
                        className='arcade-input min-w-[250px]'
                        value={guessInput}
                        onChange={e => setGuessInput(e.target.value)}
                        style={{ marginRight: 8 }}
                      />
                      <button className='arcade-btn mb-5' onClick={handleGuess} disabled={!guessInput}>
                        Proposer
                      </button>
                      {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                  )}
                  {game.status === 'won' && <p style={{ color: '#00ff00', fontWeight: 'bold', textShadow: '0 0 8px #00ff00' }}>Bravo, vous avez gagné !</p>}
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
                </>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}