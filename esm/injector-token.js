export class InjectorToken {
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
export const INJECTOR = InjectorToken.get('INJECTOR');
export const INJECTOR_SCOPE = InjectorToken.get('INJECTOR_SCOPE');
