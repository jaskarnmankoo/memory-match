import * as React from 'react';

import { useSpring, animated } from 'react-spring';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/dark-mode/logo.svg';

interface Props {
  color: string;
  darkMode: boolean;
  flipped: boolean;
  index: number;
  waiting: boolean;
  onClick: (index: number) => void;
}

/** Renders a Card in Memory Match */
export default function Card({
  color,
  darkMode,
  flipped,
  index,
  waiting,
  onClick
}: Props): JSX.Element {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  const onCardClick = React.useCallback(() => onClick(index), [index, onClick]);

  return (
    <button
      onClick={onCardClick}
      disabled={flipped || waiting}
      aria-label="card"
      type="button"
    >
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
