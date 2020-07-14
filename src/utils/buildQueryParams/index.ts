import moment, { Moment } from 'moment';

type ValidParam = string | number | boolean | Moment | undefined;

function formatValue(val: string | number | boolean | Moment | undefined): string {
    if (typeof val === 'string') {
        return encodeURIComponent(val);
    }
    if (typeof val === 'number') {
        return encodeURIComponent(val);
    }
    if (typeof val === 'boolean') {
        return encodeURIComponent(val);
    }
    if (typeof val === 'undefined') {
        return '';
    }
    if (moment.isMoment(val)) {
        return encodeURIComponent(val.format('YYYYMM'));
    }

    console.log(val);

    return '';
}

export default function buildQueryParams(params: Record<string, ValidParam | ValidParam[]>): string {
    return Object.keys(params)
        .map((key: string) => {
            const val = params[key];
            return Array.isArray(val)
                ? val.length > 0
                    ? val.map((value: ValidParam) => key + '=' + formatValue(value)).join('&')
                    : false
                : val
                ? key + '=' + formatValue(val)
                : false;
        })
        .filter((a) => a)
        .join('&');
}
