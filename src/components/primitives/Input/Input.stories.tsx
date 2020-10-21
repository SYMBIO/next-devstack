import React from 'react';
import { Input as InputComponent, InputI } from './Input';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: InputComponent,
    title: 'Primitives/Input',
    args: {
        form: {
            errors: [],
            touched: [],
        },
    },
    argTypes: {
        id: { table: { disable: true } },
        name: { table: { disable: true } },
        form: { table: { disable: true } },
    },
};

const Template: Story<InputI> = (args) => <InputComponent {...args} />;

export const Input = Template.bind({});
