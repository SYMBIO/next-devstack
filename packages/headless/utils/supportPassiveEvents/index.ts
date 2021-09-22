let passiveOptionAccessed = false;
const options = {
    get passive() {
        return (passiveOptionAccessed = true);
    },
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
if (typeof window !== 'undefined') {
    window.addEventListener && window.addEventListener('p', noop, options);
    window.removeEventListener && window.removeEventListener('p', noop, false);
}

const supportsPassiveEvents: boolean = passiveOptionAccessed;

export default supportsPassiveEvents;
