
import React from 'react';
import { Pagination as PaginationComponent, PaginationI } from './Pagination';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: PaginationComponent,
    title: 'Organisms/Pagination',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Pagination',
    },
};

const Template: Story<PaginationI> = (args) => <PaginationComponent {...args} />;

export const Pagination = Template.bind({});
