import React from 'react';
import { Image as ImageComponent, ImageT } from './Image';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ImageComponent,
    title: 'Primitives/Image',
    args: {},
};

const Template: Story<ImageT> = (args) => <ImageComponent {...args} />;

export const Image = Template.bind({});
