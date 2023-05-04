import { Type } from './type-api';
export declare class MethodProxy {
    static skipMethodFlag: {};
    protected methodIntercept(annotations: any[], end: any, ...args: any[]): any;
    protected _proxyMethod(type: Type<any>, method: string, agent?: (...args: any) => any): ((resolve: any) => any) | ((resolve?: (value: any) => any, ...args: any[]) => undefined);
    injectArgs(annotations: any[], ...args: any[]): any[];
    createAgent(annotations: any[], methodAnnotations: any[], agent: (...args: any[]) => any): (resolve?: (value: any) => any, ...args: any[]) => undefined;
    proxyMethod(type: Type<any>, method: string, agent?: (...args: any) => any): (...args: any[]) => any;
    proxyMethodAsync(type: Type<any>, method: string, agent?: (...args: any) => any): (resolve: <T>(value: T) => T, ...args: any[]) => any;
}
