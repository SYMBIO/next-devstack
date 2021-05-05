export default function condCls(...attributes: (boolean | string | undefined)[]): string {
    const classes = [];
    for (const attr of attributes) {
        if (attr) {
            classes.push(attr);
        }
    }
    return classes.join(' ');
}
