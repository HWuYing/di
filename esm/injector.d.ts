import 'reflect-metadata';
import { Injector } from './injector.abstract';
import { Provider, Type } from './type-api';
export declare const __PROVIDE__INJECT__ = "design:__provide__inject__";
export declare const __PROVIDER_TYPE__ = "__PROVIDER_TYPE__";
export declare const __USECLASS__ = "__USECLASS__";
export declare class StaticInjector implements Injector {
    protected parentInjector?: Injector;
    protected isSelfContext: boolean;
    private _recors;
    protected _instanceRecors: Map<any, Type>;
    constructor(parentInjector?: Injector, options?: {
        [key: string]: any;
    });
    get<T>(token: any, ...params: any[]): T;
    set(token: any, provider: Provider): void;
    createClass<T = any>(clazz: Type<T>): T;
    clear(): void;
}
