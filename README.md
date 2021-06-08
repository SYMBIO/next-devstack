# SYMBIO Next.js Web Devstack for Headless CMS

- Recommened runtime platform: [Vercel](https://vercel.com/)
- Framework: [Next.js 10.2+](https://nextjs.org/)
- Language: [Typescript](https://www.typescriptlang.org/)
- Styles (default): [Sass](https://sass-lang.com/) + [CSS modules](https://github.com/css-modules/css-modules)
- Supported CMS:
    - [DatoCMS](https://www.datocms.com/) (data is read directly from Content Delivery API)
    - [DatoCMS](https://www.datocms.com/) + [Elastic](https://www.elastic.co/) (data is indexed into Elastic using webhook and then read from Elastic)
    - [Kentico Kontent](https://kontent.ai/)
    - or make your own connector
- Code-style: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

## Features

- fully customizable frontend (use your own CSS framework, define custom building blocks of your web)
- out-of-the-box prepared for supported CMS, project running in 5 minutes (just set proper ENV)
- content (CMS) & [routing](https://nextjs.org/docs/advanced-features/i18n-routing) internationalization
- SEO ready implementation - use SEO fields in CMS
- ready for rapid creating custom components
- [static site generation](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) ([build time rendered](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation)
  or [incremental regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration))
- [preview mode](https://nextjs.org/docs/advanced-features/preview-mode)
- performance optimization to achieve good web vitals
- all of the [Next.js's features]() ready for use

## Local run

`now dev`

## Preparation of project

1. Change domain in robots.txt
1. Replace favicon.svg in ./public/icons/favicon.svg

## Blocks

## Components

1. automatic creation of component to a specific folder
2. example: `npm run create-component F=primitives N=test`
3. component Test in folder primitives will be created
