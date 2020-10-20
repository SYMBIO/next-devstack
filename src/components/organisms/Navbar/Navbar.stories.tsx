
import React from 'react';
import { Navbar as NavbarComponent, NavbarI } from './Navbar';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: NavbarComponent,
    title: 'Organisms/Navbar',
    argTypes: {
        children: { name: 'text' },
    },
    args: {
        children: 'I am a Navbar',
    },
};

const Template: Story<NavbarI> = (args) => <NavbarComponent {...args} />;

export const Navbar = Template.bind({});
