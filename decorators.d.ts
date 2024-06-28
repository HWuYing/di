import { Type } from './type-api';
export declare const ANNOTATIONS = "__annotations__";
export declare const PARAMETERS = "__parameters__";
export declare const METHODS = "__methods__";
export declare const PROP_METADATA = "__prop__metadata__";
type ClassType = {
    new (...args: any[]): any;
} & Type;
type ClassDecorator = <TFunction extends ClassType>(target: TFunction) => TFunction;
export declare function makeDecorator<M extends any[]>(name: string, props?: (...args: M) => any, typeFn?: (type: Type<any>, ...args: any[]) => void): (...args: M) => ClassDecorator;
export declare function makeParamDecorator<M extends any[], N = ParameterDecorator>(name: string, props?: (...args: M) => any, typeFn?: <T>(type: Type<T>, ...args: any[]) => void): (...args: M) => N;
export declare function makeMethodDecorator<M extends any[]>(name: string, props?: (...args: M) => any, typeFn?: <T>(type: Type<T>, ...args: any[]) => void): (...args: M) => MethodDecorator;
export declare const makePropDecorator: <M extends any[], N = PropertyDecorator>(name: string, props?: (...args: M) => any, typeFn?: <T>(type: Type<T>, ...args: any[]) => void) => (...args: M) => N;
export {};
