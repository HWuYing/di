import { TargetDecorator, Type } from './type-api';
export declare const ANNOTATIONS = "__annotations__";
export declare const PARAMETERS = "__parameters__";
export declare const METHODS = "__methods__";
export declare const PROP_METADATA = "__prop__metadata__";
export declare function makeDecorator<M extends any[] = []>(name: string, props?: (...args: M) => any, typeFn?: (type: Type, ...args: any[]) => void): (...args: M) => ClassDecorator;
export declare function makeParamDecorator<M extends any[] = []>(name: string, props?: (...args: M) => any, typeFn?: (type: Type, ...args: any[]) => void): (...args: M) => TargetDecorator;
export declare function makeMethodDecorator<M extends any[] = []>(name: string, props?: (...args: M) => any, typeFn?: (type: Type, ...args: any[]) => void): (...args: M) => MethodDecorator;
export declare const makePropDecorator: typeof makeParamDecorator;
