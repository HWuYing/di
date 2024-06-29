import { InjectorToken } from './injector-token';
export type TargetDecorator = ParameterDecorator & PropertyDecorator;
export declare interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
export declare interface TypeClass<T = any> extends Type<T> {
    [x: string]: any;
}
export declare type TokenKey = TypeClass | InjectorToken | Function;
export interface OnDestroy {
    destroy(): void;
}
export interface AbstractProvider {
    provide: any;
    multi?: boolean;
    deps?: any[];
}
export interface ExistingProvider<T = any> extends AbstractProvider {
    useExisting: T;
}
export interface ClassProvider<T = any> extends AbstractProvider {
    useClass: Type<T>;
}
export interface ValueProvider extends AbstractProvider {
    useValue: any;
}
export interface FactoryProvider extends AbstractProvider {
    useFactory: (...args: any[]) => any;
}
export declare type Provider = ValueProvider | ExistingProvider | ClassProvider | FactoryProvider | Type | Provider[];
