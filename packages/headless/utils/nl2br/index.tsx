import React from 'react';

const newlineRegex = /(\r\n|\r|\n)/g;

export default function index(str: string | null | undefined): React.ReactNode {
    if (typeof str !== 'string') {
        return str;
    }

    return str.split(newlineRegex).map(function (line, index) {
        if (line.match(newlineRegex)) {
            return React.createElement('br', { key: index });
        }
        return line;
    });
}
