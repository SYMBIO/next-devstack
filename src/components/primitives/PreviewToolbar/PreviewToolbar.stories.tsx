
import React from 'react';
import { PreviewToolbar as PreviewToolbarComponent, PreviewToolbarI } from './PreviewToolbar';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: PreviewToolbarComponent,
    title: 'Primitives/PreviewToolbar',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a PreviewToolbar',
    },
};

const Template: Story<PreviewToolbarI> = (args) => <PreviewToolbarComponent {...args} />;

export const PreviewToolbar = Template.bind({});
