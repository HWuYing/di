import { InjectorToken } from './injector-token';
import { Provider, Type, TypeClass } from './type-api';
export declare abstract class Injector {
    abstract get<T = any>(token: Type<T> | TypeClass | InjectorToken | Function, ...params: any[]): T;
    abstract set(token: any, provider: Provider): void;
    abstract createClass<T = any>(clazz: Type<T>): T;
    abstract clear(): void;
}
