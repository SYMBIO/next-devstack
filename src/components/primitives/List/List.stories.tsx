
import React from 'react';
import { List as ListComponent, ListI } from './List';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ListComponent,
    title: 'Primitives/List',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a List',
    },
};

const Template: Story<ListI> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
