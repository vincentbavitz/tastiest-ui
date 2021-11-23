import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../src/Button';
import { Modal, ModalProps } from '../src/Modal';

const meta: Meta = {
  title: 'Modal',
  component: Modal,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<ModalProps> = (args) => {
  const [show, setShow] = useState(false);

  return (
    <div id="modal-root" style={{ height: '600px' }}>
      <Button onClick={() => setShow(true)}>Open Modal</Button>

      <Modal
        show={show}
        title="Payment successful"
        close={() => setShow(false)}
        {...args}
      >
        Your payment has been successfully submitted. We’ve sent you an email
        with all of the details of your order.
        <div className="pt-3">
          <Button onClick={() => setShow(false)}>Got it, thanks!</Button>
        </div>
      </Modal>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const Small = Template.bind({});
Small.args = { size: 'small' };

export const Medium = Template.bind({});
Medium.args = { size: 'medium' };

export const Large = Template.bind({});
Large.args = { size: 'large' };

export const Unbound = Template.bind({});
Unbound.args = { size: 'unbound' };
