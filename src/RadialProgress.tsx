import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { FC } from 'react';

export interface RadialProgressProps {
  pc: number;
  theme?: 'primary' | 'secondary' | 'danger' | 'success';
}

/**
 *
 * @param pc A number between 0 and 100.
 */
export const RadialProgress: FC<RadialProgressProps> = (props) => {
  const { pc, theme = 'secondary' } = props;

  return (
    <svg viewBox="0 0 36 36" className="block m-auto duration-500">
      <RadialBack
        d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <RadialFront
        className={clsx(`text-${theme}`, 'stroke-current')}
        strokeDasharray={`${pc}, 100`}
        d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
      />

      <RadialLabel x="18" y="20.35">
        {pc}%
      </RadialLabel>
    </svg>
  );
};

const RadialBack = styled.path`
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
`;

const RadialFront = styled.path`
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  /* animation: progress 1s ease-out forwards; */

  transition: stroke-dasharray: 2s;

  @keyframes progress {
    0% {
      stroke-dasharray: 0 100;
    }
  }
`;

const RadialLabel = styled.text`
  fill: #666;
  font-size: 0.5em;
  text-anchor: middle;
  animation: display 2s forwards;

  @keyframes display {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
