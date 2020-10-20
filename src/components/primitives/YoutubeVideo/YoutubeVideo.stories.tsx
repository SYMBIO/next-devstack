
import React from 'react';
import { YoutubeVideo as YoutubeVideoComponent, YoutubeVideoI } from './YoutubeVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: YoutubeVideoComponent,
    title: 'Primitives/YoutubeVideo',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a YoutubeVideo',
    },
};

const Template: Story<YoutubeVideoI> = (args) => <YoutubeVideoComponent {...args} />;

export const YoutubeVideo = Template.bind({});
