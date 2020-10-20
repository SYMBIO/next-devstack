
import React from 'react';
import { MainMenu as MainMenuComponent, MainMenuI } from './MainMenu';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: MainMenuComponent,
    title: 'Organisms/MainMenu',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a MainMenu',
    },
};

const Template: Story<MainMenuI> = (args) => <MainMenuComponent {...args} />;

export const MainMenu = Template.bind({});
