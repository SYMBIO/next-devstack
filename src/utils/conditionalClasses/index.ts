export default function condCls(...attributes: (boolean | string)[]): string {
    const classes = [];
    for (const attr in attributes) {
        if (attr) {
            classes.push(attr);
        }
    }
    return classes.join(' ');
}
