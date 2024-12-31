import { Provider, TokenKey, Type } from './type-api';
export declare const ROOT_SCOPE = "root";
type IProvider = Provider | {
    providedIn?: string;
};
export declare const setInjectableDef: (type: Type, provider?: IProvider) => any;
export declare const Injectable: (provider?: IProvider) => import("./decorators").ClassDecorator<any>;
export declare const Inject: (token: TokenKey, options?: {}) => import("./decorators").TargetDecorator;
export {};
