import * as React from 'react';

import Card from '../components/card';
import SearchEngineOptimization from '../components/common/SearchEngineOptimization';

import useDarkMode from '../hooks/useDarkMode';

import { COLORS } from '../utils';

export interface Card {
  id: number;
  colorId: number;
  color: string;
  flipped: boolean;
}

/** Renders the Memory Match game */
export default function Home(): JSX.Element {
  const darkMode = useDarkMode(false);

  const [deck, setDeck] = React.useState<Card[]>([]);
  const [difficulty, setDifficulty] = React.useState(0);
  const [flippedIndexes, setFlippedIndexes] = React.useState<number[]>([]);
  const [waiting, setWaiting] = React.useState(false);
  const [won, setWon] = React.useState(false);

  const shuffle = React.useCallback((times: number) => {
    const newDeck = [];

    for (let i = 0; i < times / 2; i++) {
      newDeck.push(
        { id: 2 * i, colorId: i, color: COLORS[i], flipped: false },
        { id: 2 * i + 1, colorId: i, color: COLORS[i], flipped: false }
      );
    }

    const shuffledDeck = newDeck.sort(() => Math.random() - 0.5);
    setDeck(shuffledDeck);
    setWon(false);
  }, []);

  const goToMenu = React.useCallback(() => setDifficulty(0), []);

  const startEasyGame = React.useCallback(() => {
    shuffle(12);
    setDifficulty(12);
  }, [shuffle]);

  const startMediumGame = React.useCallback(() => {
    shuffle(18);
    setDifficulty(18);
  }, [shuffle]);

  const startHardGame = React.useCallback(() => {
    shuffle(24);
    setDifficulty(24);
  }, [shuffle]);

  const onCardClick = React.useCallback(
    (index: number) => {
      const deckCopy = [...deck];
      deckCopy[index].flipped = true;
      setFlippedIndexes([...flippedIndexes, index]);
      setDeck(deckCopy);
    },
    [deck, flippedIndexes]
  );

  React.useEffect(() => {
    if (flippedIndexes.length === 2) {
      setWaiting(true);

      setTimeout(() => {
        const deckCopy = [...deck];

        if (
          deck[flippedIndexes[0]].colorId !== deck[flippedIndexes[1]].colorId
        ) {
          deckCopy[flippedIndexes[0]].flipped = false;
          deckCopy[flippedIndexes[1]].flipped = false;
        }

        let localWon = true;

        for (const card of deckCopy) {
          if (!card.flipped) {
            localWon = false;
            break;
          }
        }

        if (localWon) {
          setWon(true);
        }

        setDeck(deckCopy);
        setFlippedIndexes([]);
        setWaiting(false);
      }, 500);
    }
  }, [deck, flippedIndexes]);

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1 text-center">
        {!difficulty ? (
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
            {won && <h1>You win!</h1>}
            <div className="grid grid-cols-2">
              <button
                type="button"
                className="game-mode"
                onClick={
                  difficulty === 12
                    ? startEasyGame
                    : difficulty === 18
                    ? startMediumGame
                    : difficulty === 24
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
                {deck.map((card, index) => (
                  <div
                    className="card"
                    key={`${String(card.id)}${String(card.color)}`}
                  >
                    <Card
                      color={card.color}
                      darkMode={darkMode}
                      flipped={deck[index].flipped}
                      index={index}
                      waiting={waiting}
                      onClick={onCardClick}
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
