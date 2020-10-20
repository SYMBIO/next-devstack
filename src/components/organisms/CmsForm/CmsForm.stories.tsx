
import React from 'react';
import { CmsForm as CmsFormComponent, CmsFormI } from './CmsForm';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: CmsFormComponent,
    title: 'Organisms/CmsForm',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a CmsForm',
    },
};

const Template: Story<CmsFormI> = (args) => <CmsFormComponent {...args} />;

export const CmsForm = Template.bind({});
