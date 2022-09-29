import { Provider, TokenKey, Type } from './type-api';
export declare abstract class Injector {
    abstract get<T = any>(token: Type<T> | TokenKey, ...params: any[]): T;
    abstract set(token: any, provider: Provider): void;
    abstract createClass<T = any>(clazz: Type<T>): T;
    abstract clear(): void;
}
