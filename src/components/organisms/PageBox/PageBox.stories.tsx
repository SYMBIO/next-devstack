
import React from 'react';
import { PageBox as PageBoxComponent, PageBoxI } from './PageBox';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: PageBoxComponent,
    title: 'Organisms/PageBox',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a PageBox',
    },
};

const Template: Story<PageBoxI> = (args) => <PageBoxComponent {...args} />;

export const PageBox = Template.bind({});
