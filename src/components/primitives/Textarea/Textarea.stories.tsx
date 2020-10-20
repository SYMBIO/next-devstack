
import React from 'react';
import { Textarea as TextareaComponent, TextareaI } from './Textarea';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: TextareaComponent,
    title: 'Primitives/Textarea',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Textarea',
    },
};

const Template: Story<TextareaI> = (args) => <TextareaComponent {...args} />;

export const Textarea = Template.bind({});
