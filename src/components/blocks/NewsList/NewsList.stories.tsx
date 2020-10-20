
import React from 'react';
import { NewsList as NewsListComponent, NewsListI } from './NewsList';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: NewsListComponent,
    title: 'Blocks/NewsList',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a NewsList',
    },
};

const Template: Story<NewsListI> = (args) => <NewsListComponent {...args} />;

export const NewsList = Template.bind({});
