import { ResponsiveLine, Serie } from '@nivo/line';
import clsx from 'clsx';
import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

export interface InfoCardProps {
  label: string;
  color?: string;
  info: string | number;
  polyfillInfo?: string | number;
  isLoading?: boolean;
  chart?: boolean;
  data?: Serie[];
  compact?: boolean;
}

const PolyfillAnimation = keyframes`
from {
  transform: translateX(-100%);
}
to {
  transform: translateX(100%);
}
`;

const PolyfillDiv = styled.div`
  animation: ${PolyfillAnimation} 1s infinite;
  inset: -50%;
`;

export const InfoCard: FC<InfoCardProps> = (props) => {
  const {
    label,
    info,
    polyfillInfo,
    isLoading,
    color = 'primary',
    chart = false,
    data = [],
    compact = false,
  } = props;

  return (
    <div
      className={clsx(
        `relative w-full rounded-md h-auto overflow-hidden bg-${color}`,
        isLoading && 'bg-opacity-75'
      )}
    >
      <div className={clsx(compact ? 'px-4 py-3 pb-12' : 'px-6 py-4 pb-10')}>
        <p
          className={clsx(
            'text-white font-primary',
            isLoading && 'opacity-75',
            compact ? 'text-base' : 'text-lg'
          )}
        >
          {label}
        </p>
        <div
          className={clsx(
            'flex items-center tracking-wide text-white',
            isLoading && 'opacity-50',
            compact ? 'text-lg h-6' : 'text-2xl h-10'
          )}
        >
          {isLoading ? polyfillInfo ?? null : info}
        </div>
      </div>

      {isLoading && (
        <PolyfillDiv className="absolute z-50 pointer-events-none opacity-10 bg-gradient-to-r from-transparent via-white to-transparent"></PolyfillDiv>
      )}

      {chart && (
        <div className="w-full h-full">
          <ResponsiveLine
            data={data}
            margin={{ top: 80, right: 0, bottom: 20, left: 0 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: 'orange_red' }}
            enablePoints={false}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
          />
        </div>
      )}
    </div>
  );
};
