import React from 'react';
import { List as ListComponent, ListI } from './List';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ListComponent,
    title: 'Primitives/List',
    argTypes: {
        children: [],
    },
    args: {
        children: ['Položka 1', 'Položka 2', 'Položka 3'],
    },
};

const Template: Story<ListI> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
