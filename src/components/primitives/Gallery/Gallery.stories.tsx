import React from 'react';
import { Gallery as GalleryComponent, GalleryI } from './Gallery';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: GalleryComponent,
    title: 'Primitives/Gallery',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am Gallery',
    },
};

const Template: Story<GalleryI> = (args) => <GalleryComponent {...args} />;

export const Gallery = Template.bind({});
