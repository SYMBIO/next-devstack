import React from 'react';
import { CustomCursor as CustomCursorComponent } from './CustomCursor';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: CustomCursorComponent,
    title: 'Primitives/CustomCursor',
};

const Template: Story = (args) => (
    <>
        <input type="text" />
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, delectus ut voluptas dolorum animi sit?
            Saepe, voluptate <a href="/">asperiores</a> quis deserunt temporibus, voluptatibus eligendi quaerat
            provident reprehenderit ducimus nisi aperiam harum?
        </p>
        <CustomCursorComponent {...args} />
    </>
);

export const CustomCursor = Template.bind({});
