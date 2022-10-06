export class InjectorToken {
    constructor(_desc) {
        this._desc = _desc;
    }
    static get(_desc) {
        return new InjectorToken(_desc);
    }
    toString() {
        return `Token ${this._desc}`;
    }
}
