
import React from 'react';
import { NewsDetail as NewsDetailComponent, NewsDetailI } from './NewsDetail';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: NewsDetailComponent,
    title: 'Blocks/NewsDetail',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a NewsDetail',
    },
};

const Template: Story<NewsDetailI> = (args) => <NewsDetailComponent {...args} />;

export const NewsDetail = Template.bind({});
