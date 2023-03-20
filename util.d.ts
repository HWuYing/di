import { ClassProvider, Provider, Type } from './type-api';
export declare function isClassProvider(value: Provider): value is ClassProvider;
export declare function convertToFactory(type: Type<any>, provider?: Provider): (...params: any[]) => any;
