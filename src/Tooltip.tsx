import clsx from 'clsx';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useHoverDirty } from 'react-use';
import styled from 'styled-components';

export type TooltipPlacement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right';

type TooltipTrigger = 'hover' | 'manual';
type TooltipTheme = 'light' | 'error' | 'normal' | 'success' | 'alt';

export interface TooltipProps {
  trigger?: TooltipTrigger;
  size?: 'small' | 'medium' | 'large';
  placement?: TooltipPlacement;
  theme?: TooltipTheme;
  content: ReactNode;
  children: string | JSX.Element | JSX.Element[];

  // The following are only applicable to 'manual' trigger.
  isOpen?: boolean;
  hideAfter?: number; // close after X milliseconds
  unhideDependencies?: Array<unknown>; // dependencies like useEffect which trigger to unhide.
}

const pointerWidth = 0.725;

interface PointerProps {
  placement: TooltipPlacement;
}

interface ContentProps {
  placement: TooltipPlacement;
  theme: TooltipTheme;
  display: boolean;
}

const Pointer = styled.div<PointerProps>`
  position: absolute;
  height: 0.5em;
  width: ${pointerWidth}em;
  clip-path: ${(props) =>
    props.placement.includes('top')
      ? 'polygon(50% 100%, 0% 0%, 100% 0%)'
      : 'polygon(50% 0, 0 100%, 100% 100%)'};
  margin-left: calc(50% - ${pointerWidth / 2}em);
  top: ${(props) => (props.placement.includes('bottom') ? '-0.4em' : 'unset')};
  bottom: ${(props) => (props.placement.includes('top') ? '-0.4em' : 'unset')};
`;

const Content = styled.div<ContentProps>`
  position: absolute;
  z-index: 100;
  width: max-content;
  filter: ${(props) =>
    props.theme === 'light' || props.theme === 'success'
      ? 'drop-shadow(1px 1px 3px rgba(0,0,0,0.25));'
      : 'drop-shadow(2px 2px 8px rgba(0,0,0,0.1))'};
  top: ${(props) => (props.placement.includes('top') ? '-1rem' : 'unset')};
  bottom: ${(props) =>
    props.placement.includes('bottom') ? '-1rem' : 'unset'};
  transform: translateY(
    ${(props) =>
      props.placement.includes('bottom')
        ? '100%'
        : props.placement.includes('top')
        ? '-100%'
        : '0%'}
  );
  transition: opacity 500ms ease-in-out;
  opacity: ${(props) => (props.display ? 1 : 0)};
`;

export const Tooltip: FC<TooltipProps> = (props) => {
  const {
    trigger = 'hover',
    content,
    children,
    size = 'medium',
    placement = 'top',
    theme = 'normal',
    hideAfter,
    unhideDependencies,
  } = props;

  // Manage isOpen status internally
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [hidden, setHidden] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  // Use hooks
  const tooltipRef = useRef(null);
  const isHovering = useHoverDirty(tooltipRef);

  // Sync isOpen with props
  useEffect(() => {
    if (trigger === 'manual') {
      setIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  // Sync isOpen with hover
  useEffect(() => {
    if (trigger === 'hover') {
      setIsOpen(isHovering);
    }
  }, [isHovering]);

  // Remove hidden status when content changes
  useEffect(() => {
    if (trigger === 'manual') {
      setHidden(false);
    }
  }, [content, isOpen]);

  // Disappear after...
  useEffect(() => {
    if (trigger === 'manual') {
      // Clear previous hide timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }

      if (!isHovering && isOpen && hideAfter) {
        setHideTimeout(
          setTimeout(() => {
            setHidden(true);
          }, hideAfter)
        );
      }
    }

    // Cleanup timeout
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [isOpen, hidden]);

  // Reappear on...
  useEffect(() => {
    if (trigger === 'manual' && unhideDependencies?.length) {
      setHidden(false);
    }
  }, unhideDependencies ?? []);

  // prettier-ignore
  const background = 
    theme === 'light' ? 'bg-white' :
    theme === 'success' ? 'bg-green-400' :
    theme === 'normal' ? 'bg-gray-200' : 
    theme === 'error' ? 'bg-red-300' :
    theme === 'alt' ? 'bg-alt-2 text-white' :
    '';

  return (
    <div className={clsx('flex transform')}>
      <div
        onClick={() => setHidden(true)}
        className="relative flex justify-center"
      >
        <Content
          display={Boolean(isOpen && !hidden)}
          placement={placement}
          theme={theme}
        >
          <Pointer placement={placement} className={background} />
          <div
            style={{
              marginLeft:
                (placement.includes('left') && '33%') ||
                (placement.includes('right') && '-33%') ||
                '0%',
            }}
            className={clsx(
              'w-full h-full text-sm text-black rounded-md',
              size === 'large' && 'px-6 py-4',
              size === 'medium' && 'p-3',
              size === 'small' && 'px-3 py-1',
              background
            )}
          >
            {content}
          </div>
        </Content>

        <div ref={tooltipRef}>{children}</div>
      </div>
    </div>
  );
};
