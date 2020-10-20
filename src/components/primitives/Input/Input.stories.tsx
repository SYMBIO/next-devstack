
import React from 'react';
import { Input as InputComponent, InputI } from './Input';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: InputComponent,
    title: 'Primitives/Input',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Input',
    },
};

const Template: Story<InputI> = (args) => <InputComponent {...args} />;

export const Input = Template.bind({});
