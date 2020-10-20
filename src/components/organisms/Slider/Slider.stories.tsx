
import React from 'react';
import { Slider as SliderComponent, SliderI } from './Slider';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: SliderComponent,
    title: 'Organisms/Slider',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Slider',
    },
};

const Template: Story<SliderI> = (args) => <SliderComponent {...args} />;

export const Slider = Template.bind({});
