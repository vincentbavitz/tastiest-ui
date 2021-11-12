import {
  CaretDownFilled,
  CaretUpFilled,
  CheckOutlined,
} from '@ant-design/icons';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, ReactElement, useState } from 'react';

export interface SelectProps {
  size: 'small' | 'medium' | 'large';
  children: ReactElement<SelectOptionProps> | ReactElement<SelectOptionProps>[];
  onSelect: (id: string, value: string) => void;
}

export function Select(props: SelectProps) {
  const { size = 'medium', children: options } = props;

  const [selected, setSelected] = useState<string | null>('Daniel');

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">{selected}</span>
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
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {React.Children.map(options, (value, key) => (
              <Option {...value.props} key={key} />
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

interface SelectOptionProps {
  id: string;
  key: string | number;
  value: string;
  disabled?: boolean;
}

const Option = (props: SelectOptionProps) => {
  const { key, value, disabled } = props;

  return (
    <Listbox.Option
      key={key}
      className={({ active, disabled }) =>
        clsx(
          active ? 'text-secondary bg-blue-100' : 'text-gray-900',
          disabled ? 'opacity-50' : '',
          'cursor-default select-none relative py-2 pl-10 pr-4'
        )
      }
      value={value}
      disabled={disabled}
    >
      {({ selected, active }) => (
        <>
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
                className="ml-1 text-base text-secondary"
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
