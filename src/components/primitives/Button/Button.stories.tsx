import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { Button } from './Button';
import { withA11y } from '@storybook/addon-a11y';

export default {
    component: Button,
    title: 'Button',
    decorators: [withKnobs, withA11y],
    parameters: {
        backgrounds: [
            { name: 'twitter', value: '#00aced' },
            { name: 'facebook', value: '#3b5998' },
        ],
        notes: 'hola hola hola',
    },
};

export const textButton = () => (
    <Button onClick={action('clicked')} disabled={boolean('Disabled', false)}>
        {text('Label', 'Hello Storybook')}
    </Button>
);

export const asDynamicVariables = () => {
    const name = text('Name', 'James');
    const age = number('Age', 35);
    const content = `I am ${name} and I'm ${age} years old.`;

    return (
        <Button onClick={action('clicked')}>
            <span role="img" aria-label="so cool">
                😀 😎 👍 💯 {content}
            </span>
        </Button>
    );
};
asDynamicVariables.story = {
    parameters: {
        notes: 'ahoj',
    },
};
