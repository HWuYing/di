import { Injector } from './injector.abstract';
import { Provider, TokenKey, Type } from './type-api';
export declare enum InjectFlags {
    Default = 0,
    Self = 2,
    NonCache = 16
}
export declare class StaticInjector {
    protected parent?: Injector;
    private scope;
    private _destroyed;
    get destroyed(): boolean;
    private onDestroy;
    private records;
    constructor(additionalProviders?: Provider[] | null, parent?: Injector);
    get<T>(token: Type<T> | TokenKey, flags?: InjectFlags): T;
    set(token: any, provider: Provider): void;
    destroy(): void;
    private hydrate;
}
export declare function createInjector(providers?: Provider[] | null, parent?: Injector): StaticInjector;
