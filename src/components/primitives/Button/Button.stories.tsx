import React from 'react';
import { Button, ButtonProps } from './Button';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: Button,
    title: 'Button',
    argTypes: { onClick: { action: 'clicked' } },
    args: {
        children: 'Click me',
        disabled: false,
    },
};

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const TextButton = Template.bind({});

export const DisabledButton = Template.bind({});
DisabledButton.args = {
    disabled: true,
};
