
import React from 'react';
import { VimeoVideo as VimeoVideoComponent, VimeoVideoI } from './VimeoVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: VimeoVideoComponent,
    title: 'Primitives/VimeoVideo',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a VimeoVideo',
    },
};

const Template: Story<VimeoVideoI> = (args) => <VimeoVideoComponent {...args} />;

export const VimeoVideo = Template.bind({});
