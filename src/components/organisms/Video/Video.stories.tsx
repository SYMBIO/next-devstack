
import React from 'react';
import { Video as VideoComponent, VideoI } from './Video';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: VideoComponent,
    title: 'Organisms/Video',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Video',
    },
};

const Template: Story<VideoI> = (args) => <VideoComponent {...args} />;

export const Video = Template.bind({});
