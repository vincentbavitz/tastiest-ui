import { Transition } from '@headlessui/react';
import { Placement } from '@popperjs/core/lib/enums';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import styled from '@emotion/styled';
import { Z_INDEX_MODAL_OVERLAY } from './Modal';

// Same as modals
const Z_INDEX_TOOLTIP = Z_INDEX_MODAL_OVERLAY - 1;

export interface TooltipProps {
  trigger?: 'hover' | 'click' | 'manual';
  placement?: Placement;
  children: ReactNode;
  content: ReactNode;

  // Manually control whether to show or not.
  show?: boolean;

  // EDIT -> LOOK IN /Input for how to do this timeout.
  // How many ms to wait before automatically closing
  // This is very complicated, so it's on hold for now.
  //
  // eg. What if the user hovers, unhovers, and re-hovers.
  // the event from the first hover will trigger a timer
  // which closes the second hover prematurely.
  // delayClose?: number;
}

/**
 * Using Popper
 * ref. https://popper.js.org/react-popper/v2/
 */
export const Tooltip: FC<TooltipProps> = (props) => {
  const {
    children,
    placement = 'top',
    trigger = 'hover',
    content,
    show,
  } = props;

  // const hoverDelayClose = delayClose ?? 0;
  // const clickDelayClose = delayClose ?? 1500;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: 'arrow', options: { element: arrowElement } },
        {
          name: 'offset',
          options: {
            offset: [0, 15],
          },
        },
      ],
    }
  );

  const [visible, setVisible] = useState(show ?? false);
  const [hovering, setHovering] = useState(false);

  // Control visibility based upon trigger.
  useEffect(() => {
    // only if they're not manually showing
    if (show === undefined && trigger === 'hover') {
      setVisible(hovering);
    }
  }, [hovering]);

  // Force update the popper on visibility change.
  // This is to maintain the correct positioning offset by Transition
  useEffect(() => {
    if (show || visible) {
      update?.();
    }
  }, [visible, show]);

  const handleReferenceElementClick = () => {
    if (trigger === 'click') {
      setVisible(!visible);
    }
  };

  return (
    <div className="flex">
      <PopperContainer
        ref={setPopperElement as React.Ref<HTMLDivElement>}
        style={{ ...styles.popper, zIndex: Z_INDEX_TOOLTIP }}
        {...attributes.popper}
      >
        <Transition
          show={show ?? visible}
          unmount={false}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopperArrow
            ref={setArrowElement as React.Ref<HTMLDivElement>}
            style={styles.arrow}
            className="arrow"
          />

          <PopperContent className="text-dark text-sm">{content}</PopperContent>
        </Transition>
      </PopperContainer>

      <div ref={setReferenceElement as React.Ref<HTMLDivElement>}>
        <div
          onClick={handleReferenceElementClick}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const PopperContainer = styled.div`
  text-align: center;
  filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.1));

  &[data-popper-placement^='top'] .arrow {
    bottom: -0.375rem;
  }

  &[data-popper-placement^='top-end'] .arrow:after {
    right: 0.75rem;
  }

  &[data-popper-placement^='bottom'] .arrow {
    top: -0.375rem;
  }

  &[data-popper-placement^='left'] .arrow {
    right: 0;
  }

  &[data-popper-placement^='right'] .arrow {
    left: -0.75rem;
  }
`;

const PopperArrow = styled.div`
  position: absolute;
  z-index: 10;
  width: 0.75rem;
  height: 0.75rem;

  &:after {
    content: ' ';
    background-color: white;
    position: absolute;
    height: 0.75rem;
    width: 0.75rem;
    transform: rotate(45deg);
  }
`;

const PopperContent = styled.div`
  width: max-content;
  padding: 0.5rem 1rem;
  background-color: white;
  border-radius: 0.25rem;
`;
