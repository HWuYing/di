"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectorToken = void 0;
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
exports.InjectorToken = InjectorToken;
