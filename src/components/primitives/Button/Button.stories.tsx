import React from 'react';
import { Button as ButtonComponent, ButtonProps } from './Button';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ButtonComponent,
    title: 'Primitives/Button',
    argTypes: {
        onClick: { table: { disable: true } },
        page: { table: { disable: true } },
        params: { table: { disable: true } },
        external: { table: { disable: true } },
        submit: { table: { disable: true } },
    },
    args: {
        children: 'I am a button',
        icon: 'symbio',
    },
};

const Template: Story<ButtonProps> = (args) => <ButtonComponent {...args} />;

export const Button = Template.bind({});
