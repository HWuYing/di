/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-prototype-builtins */
import 'reflect-metadata';
import { ANNOTATIONS, METHODS, PARAMETERS, PROP_METADATA } from './decorators';
var designPropType = 'design:type';
var designParamtypes = 'design:paramtypes';
function getParentCtor(ctor) {
    var parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    var parentCtor = parentProto ? parentProto.constructor : null;
    return parentCtor || Object;
}
var ReflectionCapabilities = /** @class */ (function () {
    function ReflectionCapabilities() {
        this._reflect = typeof global === 'object' ? global.Reflect : typeof self === 'object' ? self.Reflect : Reflect;
    }
    ReflectionCapabilities.prototype.getPropMetadataValue = function (target, propertyKey) {
        return this._reflect.getMetadata(designPropType, target.prototype, propertyKey);
    };
    ReflectionCapabilities.prototype.getAnnotation = function (type, metadataName) {
        var metadata = type.hasOwnProperty(ANNOTATIONS) && type[ANNOTATIONS] || [];
        return metadata.find(function (_a) {
            var name = _a.metadataName;
            return metadataName === name;
        });
    };
    ReflectionCapabilities.prototype.getParamAnnotations = function (type, methodName) {
        var metadata = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS] || [];
        var paramAnnotations = [];
        metadata.forEach(function (_a) {
            var method = _a.method, annotationInstance = _a.annotationInstance, index = _a.index;
            if (method === methodName) {
                while (paramAnnotations.length <= index)
                    paramAnnotations.push(null);
                (paramAnnotations[index] = paramAnnotations[index] || []).push(annotationInstance);
            }
        });
        return paramAnnotations;
    };
    ReflectionCapabilities.prototype.getMethodAnnotations = function (type, methodName) {
        var metadata = type.hasOwnProperty(METHODS) && type[METHODS] || [];
        var methodAnnotations = [];
        metadata.forEach(function (item) { return item.method === methodName && methodAnnotations.unshift(item); });
        return methodAnnotations;
    };
    ReflectionCapabilities.prototype.getPropAnnotations = function (type, propName) {
        var metadata = type.hasOwnProperty(PROP_METADATA) && type[PROP_METADATA] || [];
        var propAnnotations = [];
        metadata.forEach(function (_a) {
            var prop = _a.prop, annotationInstance = _a.annotationInstance;
            return prop === propName && propAnnotations.push(annotationInstance);
        });
        return propAnnotations;
    };
    ReflectionCapabilities.prototype.parameters = function (type) {
        var paramAnnotations = this.getParamAnnotations(type, 'constructor');
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
    ReflectionCapabilities.prototype.properties = function (type) {
        var stack = [type];
        var propMetadata = {};
        while (stack.length) {
            var typeFunc = stack.shift();
            var metadata = typeFunc.hasOwnProperty(PROP_METADATA) && typeFunc[PROP_METADATA] || [];
            metadata.forEach(function (_a) {
                var prop = _a.prop, annotationInstance = _a.annotationInstance;
                return (propMetadata[prop] = propMetadata[prop] || []).push(annotationInstance);
            });
            if (getParentCtor(typeFunc) !== Object)
                stack.push(getParentCtor(typeFunc));
        }
        return propMetadata;
    };
    return ReflectionCapabilities;
}());
export var reflectCapabilities = new ReflectionCapabilities();
