import * as React from 'react';

import Card from '../components/card';
import SearchEngineOptimization from '../components/common/SearchEngineOptimization';

import useDarkMode from '../hooks/useDarkMode';

import { COLORS } from '../utils';

export interface Deck {
  id: number;
  colorId: number;
  color: string;
  flipped: boolean;
}

export default function Home(): JSX.Element {
  const darkMode = useDarkMode(false);

  const [game, setGame] = React.useState<Deck[]>([]);
  const [flippedCount, setFlippedCount] = React.useState(0);
  const [flippedIndexes, setFlippedIndexes] = React.useState<
    (boolean | number)[]
  >([]);
  const [options, setOptions] = React.useState(0);

  const highScore = React.useRef(0);

  React.useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore');
    if (json) highScore.current = JSON.parse(json);
  }, []);

  React.useEffect(() => {
    const newGame = [];
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: COLORS[i],
        flipped: false
      };
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: COLORS[i],
        flipped: false
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
  }, [options]);

  React.useEffect(() => {
    const finished = !game.some((card) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length;
        let multiplier = 5;

        if (options === 12) {
          multiplier = 5;
        } else if (options === 18) {
          multiplier = 2.5;
        } else if (options === 24) {
          multiplier = 1;
        }

        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible);

        let score = 0;
        if (pointsLost < 100) {
          score = 100 - pointsLost;
        } else {
          score = 0;
        }

        if (score > highScore.current) {
          highScore.current = score;
          localStorage.setItem('memorygamehighscore', JSON.stringify(score));
        }

        alert(`You Win! Score: ${score}`);
        setOptions(0);
      }, 500);
    }
  }, [flippedCount, game, options]);

  const goToMenu = React.useCallback(() => setOptions(0), []);

  const startEasyGame = React.useCallback(() => setOptions(12), []);

  const startMediumGame = React.useCallback(() => setOptions(18), []);

  const startHardGame = React.useCallback(() => setOptions(24), []);

  if (flippedIndexes.length === 2) {
    if (
      typeof flippedIndexes[0] !== 'boolean' &&
      typeof flippedIndexes[1] !== 'boolean'
    ) {
      const match =
        game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId;

      if (match) {
        const newGame = [...game];
        newGame[flippedIndexes[0]].flipped = true;
        newGame[flippedIndexes[1]].flipped = true;
        setGame(newGame);

        const newIndexes = [...flippedIndexes];
        newIndexes.push(false);
        setFlippedIndexes(newIndexes);
      } else {
        const newIndexes = [...flippedIndexes];
        newIndexes.push(true);
        setFlippedIndexes(newIndexes);
      }
    }
  }

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1 text-center">
        <p>High Score: {highScore.current}</p>
        {!options ? (
          <>
            <p className="text-center text-xl">Choose a difficulty level...</p>
            <div className="grid grid-cols-3">
              <button
                type="button"
                className="game-mode"
                onClick={startEasyGame}
              >
                Easy
              </button>
              <button
                type="button"
                className="game-mode"
                onClick={startMediumGame}
              >
                Medium
              </button>
              <button
                type="button"
                className="game-mode"
                onClick={startHardGame}
              >
                Hard
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2">
              <button
                type="button"
                className="game-mode"
                onClick={
                  options === 12
                    ? startEasyGame
                    : options === 18
                    ? startMediumGame
                    : options === 24
                    ? startHardGame
                    : undefined
                }
              >
                Start Over
              </button>
              <button type="button" className="game-mode" onClick={goToMenu}>
                Menu
              </button>
            </div>
            <div className="flex w-full flex-wrap text-left md:justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {game.map((card, index) => (
                  <div
                    className="card"
                    key={`${String(card.id)}${String(card.color)}`}
                  >
                    <Card
                      color={card.color}
                      darkMode={darkMode}
                      flippedCount={flippedCount}
                      flippedIndexes={flippedIndexes}
                      game={game}
                      id={index}
                      setFlippedCount={setFlippedCount}
                      setFlippedIndexes={setFlippedIndexes}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
