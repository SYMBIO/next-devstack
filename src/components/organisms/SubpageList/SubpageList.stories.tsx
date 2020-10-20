
import React from 'react';
import { SubpageList as SubpageListComponent, SubpageListI } from './SubpageList';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: SubpageListComponent,
    title: 'Organisms/SubpageList',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a SubpageList',
    },
};

const Template: Story<SubpageListI> = (args) => <SubpageListComponent {...args} />;

export const SubpageList = Template.bind({});
