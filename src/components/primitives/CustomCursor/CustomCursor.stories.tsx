import React from 'react';
import { CustomCursor as CustomCursorComponent } from './CustomCursor';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: CustomCursorComponent,
    title: 'Primitives/CustomCursor',
};

const Template: Story = (args) => <CustomCursorComponent {...args} />;

export const CustomCursor = Template.bind({});
