import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Meta, Story } from '@storybook/react';
import { EmailIcon } from '@tastiest-io/tastiest-icons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  <div className="bg-white">
    <div>
      <div>
        <div>
          <div
            style={{ maxWidth: '30rem' }}
            className="flex items-center px-10 w-64 h-20 mt-10"
          >
            <Input label="Input" {...args} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ReactHookFormTemplate: Story<InputProps> = (args) => {
  const { handleSubmit, control } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onBlur',
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });

  return (
    <div className="bg-white">
      <div>
        <div>
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
                    onBlur={() => field.onBlur()}
                  ></Input>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
export const ReadOnly = Template.bind({});
export const Validated = Template.bind({});
export const BellsAndWhistles = Template.bind({});
export const WithoutLabel = Template.bind({});
export const AutomaticallyFocused = Template.bind({});

export const CustomOnBlur = Template.bind({});
export const ReactHookForm = ReactHookFormTemplate.bind({});

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

CustomOnBlur.args = {
  onBlur: () => alert('Custom onBlur!'),
};

WithoutLabel.args = {
  label: undefined,
};

Large.args = { size: 'large' };
Medium.args = { size: 'medium' };
Small.args = { size: 'small' };
