import React from 'react';
import { {NAME} as Component, {NAME}Props } from './{NAME}';
import { Meta, Story } from '@storybook/react/types-6-0';

export default {
    component: Component,
    title: 'Blocks/{NAME}',
} as Meta;

const Template: Story<{NAME}Props> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
