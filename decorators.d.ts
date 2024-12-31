import { Type } from './type-api';
export declare const ANNOTATIONS = "__annotations__";
export declare const PARAMETERS = "__parameters__";
export declare const METHODS = "__methods__";
export declare const NATIVE_METHOD = "__native__method__";
export declare const PROP_METADATA = "__prop__metadata__";
export type TargetDecorator = ParameterDecorator & PropertyDecorator;
export type ClassDecorator<N> = <T extends {
    new (...args: any[]): N;
}>(target: T) => T | void;
export declare function makeDecorator<M extends any[] = [], T = any>(name: string, props?: (...args: M) => any, typeFn?: (type: Type, ...args: any[]) => void): (...args: M) => ClassDecorator<T>;
export declare function makeParamDecorator<M extends any[] = []>(name: string, props?: (...args: M) => any, typeFn?: (type: Type, ...args: any[]) => void): (...args: M) => TargetDecorator;
export declare function makeMethodDecorator<M extends any[] = []>(name: string, props?: (...args: M) => any, typeFn?: (type: Type, ...args: any[]) => void): (...args: M) => MethodDecorator;
export declare const makePropDecorator: typeof makeParamDecorator;
