
import React from 'react';
import { Link as LinkComponent, LinkI } from './Link';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: LinkComponent,
    title: 'Primitives/Link',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Link',
    },
};

const Template: Story<LinkI> = (args) => <LinkComponent {...args} />;

export const Link = Template.bind({});
