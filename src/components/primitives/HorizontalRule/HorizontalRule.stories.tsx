import React from 'react';
import { HorizontalRule as HorizontalRuleComponent } from './HorizontalRule';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: HorizontalRuleComponent,
    title: 'Primitives/HorizontalRule',
};

const Template: Story = (args) => <HorizontalRuleComponent {...args} />;

export const HorizontalRule = Template.bind({});
