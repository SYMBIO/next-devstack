
import React from 'react';
import { UploadedVideo as UploadedVideoComponent, UploadedVideoI } from './UploadedVideo';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: UploadedVideoComponent,
    title: 'Primitives/UploadedVideo',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a UploadedVideo',
    },
};

const Template: Story<UploadedVideoI> = (args) => <UploadedVideoComponent {...args} />;

export const UploadedVideo = Template.bind({});
