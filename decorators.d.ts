import { Type } from './type-api';
export declare const ANNOTATIONS = "__annotations__";
export declare const PARAMETERS = "__parameters__";
export declare const METHODS = "__methods__";
export declare function makeDecorator<T>(name: string, props?: (...args: any[]) => any, typeFn?: (type: Type<T>, ...args: any[]) => any): (this: unknown, ...args: any[]) => (cls: Type<T>) => any;
export declare function makeParamDecorator(name: string, props?: (...args: any[]) => any): (this: unknown, ...args: any[]) => any;
export declare function makeMethodDecorator<T>(name: string, props?: (...args: any[]) => any, typeFn?: (type: Type<T>, ...args: any[]) => any): (this: unknown, ...args: any[]) => any;
