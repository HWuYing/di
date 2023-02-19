"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectionCapabilities = void 0;
require("reflect-metadata");
var decorators_1 = require("./decorators");
var designParamtypes = "design:paramtypes";
var ReflectionCapabilities = /** @class */ (function () {
    function ReflectionCapabilities() {
        this._reflect = typeof global === 'object' ? global.Reflect : typeof self === 'object' ? self.Reflect : Reflect;
    }
    ReflectionCapabilities.prototype.parameters = function (type) {
        // eslint-disable-next-line no-prototype-builtins
        var paramAnnotations = type.hasOwnProperty(decorators_1.PARAMETERS) && type[decorators_1.PARAMETERS];
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
exports.ReflectionCapabilities = ReflectionCapabilities;
