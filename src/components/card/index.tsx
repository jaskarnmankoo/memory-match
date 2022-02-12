import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import { Deck } from '../../pages/index';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/dark-mode/logo.svg';

interface Props {
  color: string;
  darkMode: boolean;
  flippedCount: number;
  flippedIndexes: (number | boolean)[];
  game: Deck[];
  id: number;
  setFlippedCount: React.Dispatch<React.SetStateAction<number>>;
  setFlippedIndexes: React.Dispatch<React.SetStateAction<(number | boolean)[]>>;
}

/** Renders a Card in Memory Match */
export default function Card({
  color,
  darkMode,
  flippedCount,
  flippedIndexes,
  game,
  id,
  setFlippedCount,
  setFlippedIndexes
}: Props) {
  const [flipped, set] = React.useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  React.useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set((state) => !state);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
      }, 1000);
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([]);
    }
  }, [flippedCount, flippedIndexes, id, setFlippedCount, setFlippedIndexes]);

  const onCardClick = React.useCallback(() => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      set((state) => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      set((state) => !state);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
    }
  }, [
    flippedCount,
    flippedIndexes,
    game,
    id,
    setFlippedCount,
    setFlippedIndexes
  ]);

  return (
    <button onClick={onCardClick} aria-label="card" type="button">
      <animated.div
        className="c back"
        style={{
          backgroundImage: `url(${darkMode ? String(logoDark) : String(logo)})`,
          opacity: opacity.to((o) => 1 - o),
          transform
        }}
      />
      <animated.div
        className="c"
        style={{
          opacity,
          transform: transform.to((t) => `${String(t)} rotateX(180deg)`),
          background: color
        }}
      />
    </button>
  );
}
