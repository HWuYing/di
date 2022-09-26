export class InjectorToken {
    _desc;
    static get(_desc) {
        return new InjectorToken(_desc);
    }
    constructor(_desc) {
        this._desc = _desc;
    }
    toString() {
        return `Token ${this._desc}`;
    }
}
