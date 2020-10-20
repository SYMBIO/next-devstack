
import React from 'react';
import { RichText as RichTextComponent, RichTextI } from './RichText';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: RichTextComponent,
    title: 'Primitives/RichText',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a RichText',
    },
};

const Template: Story<RichTextI> = (args) => <RichTextComponent {...args} />;

export const RichText = Template.bind({});
