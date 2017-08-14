import { injectGlobal } from 'styled-components';

export default injectGlobal`
    * , *:before , *:after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    @-ms-viewport {
        width: device-width;
    }

    html {
        font-size: 100%;
        line-height: 1.5;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        touch-action: manipulation;
    }

    body {
        font-family: 'Open Sans','Arial','sans-serif';
        width: 100vw;
        height: 100vh;
    }
`;
