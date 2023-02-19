var InjectorToken = /** @class */ (function () {
    function InjectorToken(_desc) {
        this._desc = _desc;
    }
    InjectorToken.get = function (_desc) {
        return new InjectorToken(_desc);
    };
    InjectorToken.prototype.toString = function () {
        return "Token ".concat(this._desc);
    };
    return InjectorToken;
}());
export { InjectorToken };
export var INJECTOR = InjectorToken.get('INJECTOR');
export var INJECTOR_SCOPE = InjectorToken.get('INJECTOR_SCOPE');
