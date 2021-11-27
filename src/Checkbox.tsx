import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.label`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  color: var(--color);

  &--disabled {
    color: var(--disabled);
  }
`;

const CheckboxSpan = styled.span`
  display: grid;
  grid-template-areas: 'checkbox';

  > * {
    grid-area: checkbox;
  }
`;

const CheckboxInput = styled.input`
  opacity: 0;
  width: 1em;
  height: 1em;

  &:focus + .checkbox-control {
    box-shadow: 0 0 0.15em 0.1em rgba(33, 33, 33, 0.23);
  }

  &:checked + .checkbox-control {
    background-color: currentColor;
  }

  &:checked + .checkbox-control svg {
    transform: scale(1);
  }

  &:disabled + .checkbox-control {
    color: var(--disabled);
  }
`;

const CheckboxControl = styled.span`
  display: inline-grid;
  width: 1em;
  height: 1em;
  border-radius: 0.125em;
  border: max(1px, 0.1em) solid currentColor;

  svg {
    transition: transform 0.02s ease-in 0.02s;
    transform: scale(0);
    transform-origin: bottom left;
  }
`;

export interface CheckboxProps {
  label?: string | ReactNode;
  color?: 'primary' | 'secondary' | 'current';
  disabled?: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = props => {
  const { label, color = 'primary', checked, disabled, onChange } = props;

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const checked = (event.target as HTMLInputElement).checked;
    onChange?.(checked);
  };

  return (
    <CheckboxContainer>
      <CheckboxSpan className="items-center">
        <CheckboxInput
          type="checkbox"
          name="checked"
          disabled={disabled}
          checked={checked}
          onClick={handleClick}
        />
        <CheckboxControl className={clsx('checkbox-control', `text-${color}`)}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="none"
              stroke="white"
              strokeWidth="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </CheckboxControl>
      </CheckboxSpan>
      <span className="">{label}</span>
    </CheckboxContainer>
  );
};
