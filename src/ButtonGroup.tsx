import clsx from 'clsx';
import React, { ReactElement, useMemo } from 'react';
import { ButtonProps } from './Button';

export interface ButtonGroupProps {
  children: Array<ReactElement<ButtonProps> | ReactElement<ButtonProps>[]>;
  shadow?: boolean;
}

export function ButtonGroup(props: ButtonGroupProps) {
  const { children, shadow } = props;

  const buttons = useMemo(() => {
    return React.Children.map(children.flat(), (child, i) => {
      const isFirst = i === 0;
      const isLast = i === children.flat().length - 1;

      const flatEdge = isFirst ? 'right' : isLast ? 'left' : 'both';
      return React.cloneElement(child, { flatEdge });
    });
  }, [children]);

  return (
    <div className={clsx('flex flex-nowrap', shadow && 'shadow-sm')}>
      {buttons}
    </div>
  );
}
