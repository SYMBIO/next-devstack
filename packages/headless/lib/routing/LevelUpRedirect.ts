export default class RedirectLevelUp extends Error {
    constructor() {
        super('');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RedirectLevelUp.prototype);
    }
}
