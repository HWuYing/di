import { InjectorToken } from './injector-token';
declare interface TypeClass {
    [x: string]: any;
}
export declare interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
export declare type TokenKey = TypeClass | InjectorToken | Function;
interface AbstractProvider {
    provide: any;
    deps?: any[];
}
export interface ClassProvider<T = any> extends AbstractProvider {
    useNew?: boolean;
    useClass: Type<T>;
}
export interface ValueProvider extends AbstractProvider {
    multi?: boolean;
    useValue: any;
}
export interface FactoryProvider extends AbstractProvider {
    useFactory: (...args: any[]) => any;
}
export declare type Provider = ValueProvider | ClassProvider | FactoryProvider;
export {};
