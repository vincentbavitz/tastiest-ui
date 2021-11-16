import { Transition } from '@headlessui/react';
import { ExitIcon } from '@tastiest-io/tastiest-icons';
import classNames from 'classnames';
import clsx from 'clsx';
import React, {
  BaseSyntheticEvent,
  FC,
  Fragment,
  ReactNode,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import { useKey } from 'react-use';

export const Z_INDEX_MODAL_OVERLAY = 3333;

export interface ModalProps {
  portalId?: string;
  show: boolean;
  children: ReactNode;
  // size: 'small' | 'regular' | 'large';
  title?: string;
  preload?: boolean; // should we load it in the DOM before isOpen?
  className?: string;
  fullscreen?: boolean; // for mobiles, for example
  noPadding?: boolean;
  close?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    show,
    portalId = 'modal-root',
    preload = false,
    fullscreen = false,
    close,
  } = props;

  const ref = useRef(null);
  const padding = fullscreen ? 0 : '5vw';

  const defaultStyle = {
    zIndex: Z_INDEX_MODAL_OVERLAY,
    paddingLeft: `${padding}vw`,
    paddingRight: `${padding}vw`,
  };

  // Close when the user clicks outside the modal.
  const containerId = 'modal-container';
  const onClickedAway = (e: BaseSyntheticEvent) => {
    if (e.target.id === containerId) {
      close?.();
    }
  };

  if (
    typeof document === 'undefined' ||
    !document.getElementById('modal-root')
  ) {
    return null;
  }

  return ReactDOM.createPortal(
    <Transition appear show={show} as={Fragment} unmount={!preload}>
      <div
        id={containerId}
        ref={ref}
        style={{
          ...defaultStyle,
        }}
        className={clsx('fixed inset-0 flex items-center justify-center')}
        onClick={(e) => onClickedAway(e)}
      >
        {/* Overlay */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 z-0 bg-black bg-opacity-25"></div>
        </Transition.Child>

        {/* Content */}
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ModalInner {...props} />
        </Transition.Child>
      </div>
    </Transition>,
    document.getElementById(portalId ?? 'modal-root') as HTMLElement
  );
};

const ModalInner = (props: ModalProps) => {
  const { title, close, className, children, noPadding, fullscreen } = props;
  const boxRef = useRef(null);

  useKey('Escape', () => {
    close?.();
  });

  return (
    <div
      ref={boxRef}
      style={{
        height: fullscreen ? '100%' : 'unset',
        width: fullscreen ? '100vw' : 'unset',
        maxWidth: fullscreen ? 'unset' : '500px',
      }}
      className={classNames(
        'relative bg-white shadow-lg',
        fullscreen ? 'rounded-none' : 'rounded-lg',
        !noPadding && 'px-6 pt-4 pb-5',
        className
      )}
    >
      <div
        className={clsx(
          'flex w-full gap-10 justify-between',
          title ? 'items-center pb-3' : 'items-start'
        )}
      >
        {title ? (
          <div className="flex-grow text-xl font-medium whitespace-nowrap">
            {title}
          </div>
        ) : (
          <div className="block pb-8"></div>
        )}

        {close ? (
          <ExitIcon
            onClick={close}
            className={clsx(
              title ? null : 'absolute top-5 right-6',
              'w-4 h-4 cursor-pointer fill-current duration-300 text-gray-700 hover:text-dark'
            )}
          />
        ) : null}
      </div>

      <div className="text-gray-800 font-light">{children}</div>
    </div>
  );
};
