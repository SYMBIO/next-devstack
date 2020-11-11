import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { CustomCursor as CustomCursorComponent } from '../../primitives/CustomCursor/CustomCursor';
import { DefaultCursor } from '../../cursors/DefaultCursor';

export default {
    component: CustomCursorComponent,
    title: 'Primitives/CustomCursor',
};

const Template: Story = (args) => (
    <>
        <CustomCursorComponent component={<DefaultCursor />}>
            {(ref) => (
                <p ref={ref}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, delectus ut voluptas dolorum animi
                    sit? Saepe, voluptate <a href="/">asperiores</a> quis deserunt temporibus, voluptatibus eligendi
                    quaerat provident reprehenderit ducimus nisi aperiam harum?
                </p>
            )}
        </CustomCursorComponent>
    </>
);

export const CustomCursor = Template.bind({});
