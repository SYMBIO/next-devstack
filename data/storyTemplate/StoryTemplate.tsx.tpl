
import React from 'react';
import { {NAME} as {NAME}Component, {NAME}I } from './{NAME}';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: {NAME}Component,
    title: '{FOLDER}/{NAME}',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a {NAME}',
    },
};

const Template: Story<{NAME}I> = (args) => <{NAME}Component {...args} />;

export const {NAME} = Template.bind({});
