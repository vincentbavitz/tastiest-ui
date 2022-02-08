import {
  CaretDownFilled,
  CaretUpFilled,
  CheckOutlined,
} from '@ant-design/icons';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, ReactElement, useState } from 'react';
import { Z_INDEX_MODAL_OVERLAY } from './Modal';
import { ComponentSize } from './types';

// Underneath modals
const Z_INDEX_SELECT = Z_INDEX_MODAL_OVERLAY - 1;

export interface SelectProps {
  onSelect: (id: string, value: string) => void;
  initialSelected?: string;

  children: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[];
  size?: ComponentSize;

  minSelectWidth?: number;
  minOptionWidth?: number;
}

export function Select(props: SelectProps) {
  const {
    size = 'medium',
    onSelect,
    children,
    minSelectWidth,
    minOptionWidth,
  } = props;

  // Selected is given by ID
  const options = React.Children.map(children, (child) => child.props);
  const initalSelected = props.initialSelected
    ? (options.find((t) => t.id === props.initialSelected) as SelectOptionProps)
    : options[0];

  const [selected, setSelected] = useState<SelectOptionProps>(initalSelected);

  const onChange = (optionId: string) => {
    const option = options.find((o) => o.id === optionId) as SelectOptionProps;
    setSelected(option);
    onSelect?.(option.id, option.value);
  };

  return (
    <Listbox value={selected.id} onChange={onChange}>
      <div
        style={{ minWidth: minSelectWidth ? `${minSelectWidth}px` : 'unset' }}
        className="relative mt-1"
      >
        <Listbox.Button
          className={clsx(
            'relative w-full text-left bg-white shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500',
            size === 'large' && 'text-lg py-3 pl-3 pr-10 rounded-lg',
            size === 'medium' && 'text-base py-2 pl-3 pr-10 rounded-md',
            size === 'small' && 'text-sm py-1 pl-2 pr-8 rounded'
          )}
        >
          <span className="block truncate">{selected.value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <div
              style={{ fontSize: '9px' }}
              className="flex flex-col leading-none text-gray-400"
            >
              <CaretUpFilled />
              <CaretDownFilled />
            </div>
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            style={{ zIndex: Z_INDEX_SELECT }}
            className="absolute w-auto py-1 mt-1 overflow-y-auto overflow-x-hidden text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {React.Children.map(children, (child) => {
              return (
                <Option
                  {...child.props}
                  size={size}
                  minWidth={minOptionWidth}
                />
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

interface SelectOptionProps {
  id: string;
  value: string;
  disabled?: boolean;
  size?: ComponentSize;
  minWidth?: number;
}

const Option = (option: SelectOptionProps) => {
  const { id, size, value, disabled, minWidth } = option;

  return (
    <Listbox.Option
      key={id}
      style={{ minWidth: minWidth ?? '75px' }}
      className={({ active, disabled }) =>
        clsx(
          'cursor-default select-none relative list-none',
          active ? 'text-secondary bg-blue-100' : 'text-gray-900',
          disabled ? 'opacity-50' : '',
          size === 'large' && 'py-3 pl-10 pr-4 text-lg',
          size === 'medium' && 'py-2 pl-10 pr-4 text-sm',
          size === 'small' && 'py-1 pl-10 pr-2 text-sm'
        )
      }
      value={option.id}
      disabled={disabled}
    >
      {({ selected, active }) => (
        <>
          {selected}
          <span
            className={`${
              selected ? 'font-medium' : 'font-normal'
            } block truncate`}
          >
            {value}
          </span>
          {selected ? (
            <span
              className={`${active ? 'text-amber-600' : 'text-amber-600'}
                  absolute inset-y-0 left-0 flex items-center pl-3`}
            >
              <CheckOutlined
                className={clsx(
                  'ml-1 text-secondary',
                  size === 'large' && 'text-lg',
                  size === 'medium' && 'text-base',
                  size === 'small' && 'text-sm'
                )}
                aria-hidden="true"
              />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

Select.Option = Option;
