import React from 'react';
import LocaleRedirect from '../lib/routing/LocaleRedirect';
import DefaultPage from './[...slug]';

// uncomment one of the possibilities

// 1. SSG OR SSR with locale in path
export default LocaleRedirect;

// 2. Static Site Generation without locale in path
// export { getHomepageStaticPaths as getStaticPaths, getHomepageStaticProps as getStaticProps } from '../lib/server/ssg';
// export default DefaultPage;

// 3. Server Side Render without locale in path
// export * from '../lib/server/ssr';
// export default DefaultPage;
