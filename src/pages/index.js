import * as React from 'react';

import MemoryGame from '../components/MemoryGame';
import SearchEngineOptimization from '../components/SearchEngineOptimization';

export default function Home() {
  const [options, setOptions] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);

  React.useEffect(() => {
    const json = localStorage.getItem('memorygamehighscore');
    const savedScore = JSON.parse(json);
    if (savedScore) {
      setHighScore(savedScore);
    }
  }, []);

  return (
    <>
      <SearchEngineOptimization title="Home" />
      <main className="grid grid-cols-1 text-center">
        <p>High Score: {highScore}</p>
        {!options ? (
          <>
            <p className="text-xl text-center">Choose a difficulty level...</p>
            <div className="grid grid-cols-3">
              <button className="game-mode" onClick={() => setOptions(12)}>
                Easy
              </button>
              <button className="game-mode" onClick={() => setOptions(18)}>
                Medium
              </button>
              <button className="game-mode" onClick={() => setOptions(24)}>
                Hard
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2">
              <button
                className="game-mode"
                onClick={() => {
                  const prevOptions = options;
                  setOptions(0);
                  setTimeout(() => {
                    setOptions(prevOptions);
                  }, 5);
                }}
              >
                Start Over
              </button>
              <button className="game-mode" onClick={() => setOptions(0)}>
                Menu
              </button>
            </div>
            <MemoryGame
              options={options}
              setOptions={setOptions}
              highScore={highScore}
              setHighScore={setHighScore}
            />
          </>
        )}
      </main>
    </>
  );
}
