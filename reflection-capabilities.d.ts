import 'reflect-metadata';
import { Type } from './type-api';
declare class ReflectionCapabilities {
    private _reflect;
    getAnnotation<T = any>(type: Type<any>, metadataName: string): T | null;
    getParamAnnotations<T = any>(type: Type<any>, methodName?: string): T[];
    getMethodAnnotations<T = any>(type: Type<any>, methodName: string): T[];
    getPropAnnotations<T = any>(type: Type<any>, propName: string): T[];
    parameters(type: Type<any>): any[];
    properties(type: Type<any>): any;
}
export declare const reflectCapabilities: ReflectionCapabilities;
export {};
