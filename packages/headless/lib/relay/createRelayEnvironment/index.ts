export const createRelayEnvironment = (typeof window === 'undefined' ? require('./server') : require('./client'))
    .createRelayEnvironment;
