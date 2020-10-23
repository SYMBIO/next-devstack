import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@storybook/addon-console';

export const parameters = {
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        initialViewport: 'iphone6',
    },
    options: {
        storySort: {
            order: ['Primitives', 'Organisms'],
        },
    },
};
