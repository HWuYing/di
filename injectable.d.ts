import { Provider, Type } from './type-api';
export declare const ROOT_SCOPE = "root";
export declare const setInjectableDef: (type: Type<any>, provider?: Provider & {
    providedIn?: string;
}) => any;
export declare const Injectable: (...args: any[]) => <TFunction extends (new (...args: any[]) => any) & Type<any>>(target: TFunction) => TFunction;
export declare const Inject: any;
