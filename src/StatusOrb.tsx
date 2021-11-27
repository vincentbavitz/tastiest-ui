import clsx from 'clsx';
import React, { FC } from 'react';

export interface StatusOrbProps {
  size?: 1 | 2 | 3 | 4;
  status: 'online' | 'warning' | 'offline';

  // By default, only online pings.
  ping?: boolean;
}

/** Used to indicate the status of a system as online or offline. */
export const StatusOrb: FC<StatusOrbProps> = props => {
  const { size = 2, ping = props.status === 'online', status } = props;

  return (
    <div
      className={clsx(
        'relative inline-block',
        size === 1 && 'h-1 w-1',
        size === 2 && 'h-2 w-2',
        size === 3 && 'h-3 w-3',
        size === 4 && 'h-4 w-4',
      )}
    >
      {ping ? (
        <div className="absolute flex justify-center items-center w-full h-full">
          <div
            className={clsx(
              'h-full w-full z-0 rounded-full animate-ping',
              status === 'online' && 'bg-green-300',
              status === 'warning' && 'bg-yellow-500',
              status === 'offline' && 'bg-red-400',
            )}
          ></div>
        </div>
      ) : null}

      <div
        className={clsx(
          'absolute inset-0 rounded-full',
          status === 'online' && 'bg-green-400',
          status === 'warning' && 'bg-yellow-500',
          status === 'offline' && 'bg-red-500',
        )}
      ></div>
    </div>
  );
};
