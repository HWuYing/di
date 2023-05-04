import { Provider, Type } from './type-api';
export declare function convertToFactory(type: Type<any>, provider?: Provider): (...params: any[]) => any;
