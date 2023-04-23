import 'reflect-metadata';
import { Type } from './type-api';
declare class ReflectionCapabilities {
    private _reflect;
    getAnnotation(type: Type<any>, metadataName: string): any;
    getParamAnnotations(type: Type<any>, methodName?: string): any[];
    getMethodAnnotations(type: Type<any>, methodName: string): any;
    getPropAnnotations(type: Type<any>, propName: string): any[];
    parameters(type: Type<any>): any[];
    properties(type: Type<any>): any;
}
export declare const reflectCapabilities: ReflectionCapabilities;
export {};
