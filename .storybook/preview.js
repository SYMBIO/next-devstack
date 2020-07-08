import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@storybook/addon-console';

addParameters({
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        initialViewport: 'iphone6',
    },
});
