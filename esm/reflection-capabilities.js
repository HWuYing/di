import 'reflect-metadata';
import { PARAMETERS, PROP_METADATA } from './decorators';
const designParamtypes = `design:paramtypes`;
// eslint-disable-next-line @typescript-eslint/ban-types
function getParentCtor(ctor) {
    const parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
    const parentCtor = parentProto ? parentProto.constructor : null;
    return parentCtor || Object;
}
export class ReflectionCapabilities {
    constructor() {
        this._reflect = typeof global === 'object' ? global.Reflect : typeof self === 'object' ? self.Reflect : Reflect;
    }
    parameters(type) {
        // eslint-disable-next-line no-prototype-builtins
        const paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS];
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
    propMetadata(type) {
        const stack = [{ typeFunc: type }];
        const propMetadata = {};
        while (stack.length) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const { typeFunc } = stack.shift();
            // eslint-disable-next-line no-prototype-builtins
            const metadata = typeFunc.hasOwnProperty(PROP_METADATA) && typeFunc[PROP_METADATA];
            Object.keys(metadata).forEach((key) => propMetadata[key] ? undefined : propMetadata[key] = metadata[key]);
            if (getParentCtor(typeFunc) !== Object)
                stack.push({ typeFunc: getParentCtor(typeFunc) });
        }
        return propMetadata;
    }
}
