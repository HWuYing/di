import { Provider, TokenKey, Type } from './type-api';
export declare const ROOT_SCOPE = "root";
type IProvider = Provider & {
    providedIn?: string;
};
export declare const setInjectableDef: (type: Type, provider?: IProvider) => any;
export declare const Injectable: (provider?: IProvider) => ClassDecorator;
export declare const Inject: (token: TokenKey, options?: {}) => ParameterDecorator & PropertyDecorator;
export {};
