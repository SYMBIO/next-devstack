export const CALENDAR_FORMATS: Record<string, unknown> = {
    cs: {
        lastDay: '[Včera]',
        sameDay: '[Dnes]',
        nextDay: '[Zítra]',
        lastWeek: 'l',
        nextWeek: 'l',
        sameElse: 'l',
    },
    en: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: 'L',
        nextWeek: 'dddd',
        sameElse: 'L',
    },
};

export const DATOCMS_MAX_LIMIT = 100;

export enum ASYNC_STATES {
    IDLE = 'idle',
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error',
}
