import 'reflect-metadata';
import { Type } from './type-api';
declare class ReflectionCapabilities {
    private _reflect;
    getPropMetadataValue(target: Type, propertyKey: string): any;
    getAnnotation<T = any>(type: Type, metadataName: string): T | null;
    getParamAnnotations<T = any>(type: Type, methodName: string): T[];
    getMethodAnnotations<T = any>(type: Type, methodName: string): T[];
    getPropAnnotations<T = any>(type: Type, propName: string): T[];
    parameters(type: Type): any[];
    properties(type: Type): any;
}
export declare const reflectCapabilities: ReflectionCapabilities;
export {};
