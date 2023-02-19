import 'reflect-metadata';
import { PARAMETERS } from './decorators';
var designParamtypes = "design:paramtypes";
var ReflectionCapabilities = /** @class */ (function () {
    function ReflectionCapabilities() {
        this._reflect = typeof global === 'object' ? global.Reflect : typeof self === 'object' ? self.Reflect : Reflect;
    }
    ReflectionCapabilities.prototype.parameters = function (type) {
        // eslint-disable-next-line no-prototype-builtins
        var paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS];
        var paramTypes = this._reflect.getMetadata(designParamtypes, type);
        var maxLength = Math.max((paramTypes || paramAnnotations || []).length);
        var result = new Array(maxLength).fill([], 0, maxLength);
        for (var i = 0; i < maxLength; i++) {
            if (typeof paramTypes !== 'undefined' && paramTypes[i]) {
                result[i] = result[i].concat(paramTypes[i]);
            }
            if (paramAnnotations && paramAnnotations[i]) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    };
    return ReflectionCapabilities;
}());
export { ReflectionCapabilities };
