import { Provider, Type } from './type-api';
export declare const ROOT_SCOPE = "root";
export declare const setInjectableDef: (type: Type<any>, provider?: Provider & {
    providedIn?: string;
}) => any;
export declare const Injectable: (provider?: Provider & {
    providedIn?: string;
}) => import("./decorators").ClassDecorator;
export declare const Inject: any;
