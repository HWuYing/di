import 'reflect-metadata';
import { PARAMETERS } from './decorators';
const designParamtypes = `design:paramtypes`;
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
}
