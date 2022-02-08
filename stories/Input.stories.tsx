import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import { CardNumberElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeCardNumberElementOptions } from '@stripe/stripe-js';
import { EmailIcon } from '@tastiest-io/tastiest-icons';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '../src/Button';
import { Input, InputProps } from '../src/Input';

const meta: Meta = {
  title: 'Input',
  component: Input,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<InputProps> = (args) => (
  <div className="pl-64 pt-32 bg-white">
    <div
      style={{ maxWidth: '30rem' }}
      className="flex items-center px-10 w-64 h-20 mt-10"
    >
      <Input label="Input" {...args} />
    </div>
  </div>
);

const ReactHookFormTemplate: Story<InputProps> = (args) => {
  const { handleSubmit, control, reset } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  return (
    <div className="bg-white">
      <div>
        <div
          style={{ maxWidth: '30rem' }}
          className="flex items-center px-10 w-64 h-20 mt-10"
        >
          <Controller
            control={control}
            defaultValue=""
            name="email"
            rules={{
              required: {
                value: true,
                message: 'Please enter your email',
              },
              pattern: {
                value: /^[\w]{1,30}@[\w\-_]{1,30}\.[a-zA-Z]{2,10}(\.[a-zA-Z]{2,10})?$/,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field, formState }) => (
              <Input
                type="text"
                label="Email"
                prefix={
                  <EmailIcon className="w-full h-full fill-current text-primary" />
                }
                error={formState.errors.email?.message}
                value={field.value}
                {...field}
              ></Input>
            )}
          />

          <Button onClick={() => reset()}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

const CustomNestedTemplate: Story<InputProps> = (args) => {
  const CARD_ELEMENT_OPTIONS: StripeCardNumberElementOptions = {
    classes: {
      base: 'py-3 w-full',
    },
    style: {
      base: {
        fontSize: '16px',
      },
    },
  };

  const stripePromise = useMemo(
    () =>
      loadStripe(
        `pk_test_51HVFsIHZaOt3USRGOXhAlkKI9uBar8ZAnRY7lXJgyQWnfQwnlUoqgyKRPpjXYqSsFJQyGaAqeSbnsSi2IxAhnHZA00v99BVUGc`
      ),
    []
  );

  return (
    <Elements stripe={stripePromise}>
      <Input
        size="large"
        label="Card Number"
        className="font-mono"
        placeholder=""
        forceFocus
        input={<CardNumberElement options={CARD_ELEMENT_OPTIONS} />}
      />
    </Elements>
  );
};

export const Default = Template.bind({});
export const ReadOnly = Template.bind({});
export const Validated = Template.bind({});
export const BellsAndWhistles = Template.bind({});
export const WithoutLabel = Template.bind({});
export const AutomaticallyFocused = Template.bind({});

export const WithOnReturn = Template.bind({});
export const WithForceFocus = Template.bind({});
export const WithFormatter = Template.bind({});

export const CustomOnBlur = Template.bind({});
export const ReactHookForm = ReactHookFormTemplate.bind({});
export const CustomNestedInput = CustomNestedTemplate.bind({});

export const Large = Template.bind({});
export const Medium = Template.bind({});
export const Small = Template.bind({});

Default.args = {};
ReadOnly.args = { readOnly: true };
Validated.args = { error: 'Invalid username' };
BellsAndWhistles.args = {
  label: 'Label',
  prefix: <SearchOutlined />,
  suffix: <RightOutlined />,
};

AutomaticallyFocused.args = {
  value: 'Pre-filled value',
};

WithOnReturn.args = { onReturn: () => alert('onReturn!') };

CustomOnBlur.args = {
  onBlur: () => alert('Custom onBlur!'),
};

WithoutLabel.args = {
  label: undefined,
};

WithFormatter.args = {
  label: 'Uppercase formatter',
  formatter: (value: string) => value.toUpperCase(),
};

WithForceFocus.args = {
  label: 'Forcefully focussed',
  forceFocus: true,
};

Large.args = { size: 'large' };
Medium.args = { size: 'medium' };
Small.args = { size: 'small' };
