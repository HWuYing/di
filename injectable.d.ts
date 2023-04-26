import { Provider, Type } from './type-api';
export declare const ROOT_SCOPE = "root";
export declare const setInjectableDef: (type: Type<any>, provider?: Provider & {
    providedIn?: string;
}) => any;
export declare const Injectable: (this: unknown, ...args: any[]) => (cls: Type<any>) => any;
export declare const Inject: any;
