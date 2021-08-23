module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/blocks/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'mobile-landscape': '36rem',
            tablet: '48rem',
            'tablet-landscape': '64rem',
            desktop: '80rem',
            'large-desktop': '90rem',
            fullhd: '120rem',
        },
        extend: {
            maxHeight: {
                '16-9': '56.25vw',
            },
            gridColumnEnd: {
                13: '13',
                14: '14',
                15: '15',
                16: '16',
                17: '17',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
