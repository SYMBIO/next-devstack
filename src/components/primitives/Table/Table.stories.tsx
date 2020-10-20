
import React from 'react';
import { Table as TableComponent, TableI } from './Table';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: TableComponent,
    title: 'Primitives/Table',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Table',
    },
};

const Template: Story<TableI> = (args) => <TableComponent {...args} />;

export const Table = Template.bind({});
