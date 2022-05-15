import { InjectorToken } from './injector-token';
import { Provider, Type } from './type-api';
export declare const Inject: (token: any) => (target: any, name: string, index: number) => void;
export declare const registryProvider: (provider: Provider | Provider[]) => void;
export declare const Injectable: (token?: InjectorToken, options?: {
    [key: string]: any;
}) => <T>(target: Type<T>) => Type<T>;
export declare const getProvider: <T = any>(target: InjectorToken | Type<T>) => T;
