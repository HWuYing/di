import 'reflect-metadata';
import { PARAMETERS, PROP_METADATA } from './decorators';
var designParamtypes = "design:paramtypes";
// eslint-disable-next-line @typescript-eslint/ban-types
function getParentCtor(ctor) {
    var parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    var parentCtor = parentProto ? parentProto.constructor : null;
    return parentCtor || Object;
}
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
    ReflectionCapabilities.prototype.propMetadata = function (type) {
        var stack = [{ typeFunc: type }];
        var propMetadata = {};
        var _loop_1 = function () {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            var typeFunc = stack.shift().typeFunc;
            // eslint-disable-next-line no-prototype-builtins
            var metadata = typeFunc.hasOwnProperty(PROP_METADATA) && typeFunc[PROP_METADATA];
            Object.keys(metadata).forEach(function (key) { return propMetadata[key] ? undefined : propMetadata[key] = metadata[key]; });
            if (getParentCtor(typeFunc) !== Object)
                stack.push({ typeFunc: getParentCtor(typeFunc) });
        };
        while (stack.length) {
            _loop_1();
        }
        return propMetadata;
    };
    return ReflectionCapabilities;
}());
export { ReflectionCapabilities };
