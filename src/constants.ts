import { CalendarSpec } from 'moment';

export const CALENDAR_FORMATS: Record<string, CalendarSpec> = {
    cs: {
        lastDay: '[Včera]',
        sameDay: '[Dnes]',
        nextDay: '[Zítra]',
        lastWeek: 'D. M. YYYY',
        nextWeek: 'dddd',
        sameElse: 'D. M. YYYY',
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
