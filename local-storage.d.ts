import { Injector } from "./injector.abstract";
import { LocatorStorageImplements } from "./local-storage.abstract";
import { Type } from "./type-api";
export declare class LocatorStorage implements LocatorStorageImplements {
    private injector;
    constructor(injector: Injector);
    getProvider<T = any>(token: any, ...params: any[]): T;
    getService<T>(target: Type<T>): T;
}
