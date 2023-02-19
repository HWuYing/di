export declare class InjectorToken {
    protected _desc: string;
    static get(_desc: string): InjectorToken;
    constructor(_desc: string);
    toString(): string;
}
export declare const INJECTOR: InjectorToken;
export declare const INJECTOR_SCOPE: InjectorToken;
