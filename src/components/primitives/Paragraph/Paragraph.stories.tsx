
import React from 'react';
import { Paragraph as ParagraphComponent, ParagraphI } from './Paragraph';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ParagraphComponent,
    title: 'Primitives/Paragraph',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Paragraph',
    },
};

const Template: Story<ParagraphI> = (args) => <ParagraphComponent {...args} />;

export const Paragraph = Template.bind({});
