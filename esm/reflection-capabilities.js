/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-prototype-builtins */
import 'reflect-metadata';
import { ANNOTATIONS, METHODS, PARAMETERS, PROP_METADATA } from './decorators';
const designPropType = `design:type`;
const designParamtypes = `design:paramtypes`;
function getParentCtor(ctor) {
    const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    const parentCtor = parentProto ? parentProto.constructor : null;
    return parentCtor || Object;
}
class ReflectionCapabilities {
    constructor() {
        this._reflect = typeof global === 'object' ? global.Reflect : typeof self === 'object' ? self.Reflect : Reflect;
    }
    getPropMetadataValue(target, propertyKey) {
        return this._reflect.getMetadata(designPropType, target.prototype, propertyKey);
    }
    getAnnotation(type, metadataName) {
        const metadata = type.hasOwnProperty(ANNOTATIONS) && type[ANNOTATIONS] || [];
        return metadata.find(({ metadataName: name }) => metadataName === name);
    }
    getParamAnnotations(type, methodName) {
        const metadata = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS] || [];
        const paramAnnotations = [];
        metadata.forEach(({ method, annotationInstance, index }) => {
            if (method === methodName) {
                while (paramAnnotations.length <= index)
                    paramAnnotations.push(null);
                (paramAnnotations[index] = paramAnnotations[index] || []).push(annotationInstance);
            }
        });
        return paramAnnotations;
    }
    getMethodAnnotations(type, methodName) {
        const metadata = type.hasOwnProperty(METHODS) && type[METHODS] || [];
        const methodAnnotations = [];
        metadata.forEach((item) => item.method === methodName && methodAnnotations.unshift(item));
        return methodAnnotations;
    }
    getPropAnnotations(type, propName) {
        const metadata = type.hasOwnProperty(PROP_METADATA) && type[PROP_METADATA] || [];
        const propAnnotations = [];
        metadata.forEach(({ prop, annotationInstance }) => prop === propName && propAnnotations.push(annotationInstance));
        return propAnnotations;
    }
    parameters(type) {
        const paramAnnotations = this.getParamAnnotations(type, 'constructor');
        const paramTypes = this._reflect.getMetadata(designParamtypes, type);
        const maxLength = Math.max((paramTypes || paramAnnotations || []).length);
        const result = new Array(maxLength).fill([], 0, maxLength);
        for (let i = 0; i < maxLength; i++) {
            if (typeof paramTypes !== 'undefined' && paramTypes[i]) {
                result[i] = result[i].concat(paramTypes[i]);
            }
            if (paramAnnotations && paramAnnotations[i]) {
                result[i] = result[i].concat(paramAnnotations[i]);
            }
        }
        return result;
    }
    properties(type) {
        const stack = [type];
        const propMetadata = {};
        while (stack.length) {
            const typeFunc = stack.shift();
            const metadata = typeFunc.hasOwnProperty(PROP_METADATA) && typeFunc[PROP_METADATA] || [];
            metadata.forEach(({ prop, annotationInstance }) => (propMetadata[prop] = propMetadata[prop] || []).push(annotationInstance));
            if (getParentCtor(typeFunc) !== Object)
                stack.push(getParentCtor(typeFunc));
        }
        return propMetadata;
    }
}
export const reflectCapabilities = new ReflectionCapabilities();
