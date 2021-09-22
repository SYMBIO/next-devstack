export default function toPascal(s: string) {
    s = s.charAt(0).toUpperCase() + s.slice(1);
    return s.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
}
