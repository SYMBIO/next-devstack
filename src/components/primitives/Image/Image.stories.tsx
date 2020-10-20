import React from 'react';
import { Image as ImageComponent, ImageI } from './Image';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ImageComponent,
    title: 'Primitives/Image',
    args: {},
};

const Template: Story<ImageI> = (args) => <ImageComponent {...args} />;

export const Image = Template.bind({});
