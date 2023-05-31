export declare class MethodProxy {
    static skipMethodFlag: {};
    protected methodIntercept(annotations: any[], end: any, ...args: any[]): any;
    protected _proxyMethod(type: any, method: string): ((resolve: any) => any) | ((resolve?: (value: any) => any, ...args: any[]) => undefined);
    injectArgs(annotations: any[], ...args: any[]): any[];
    createAgent(annotations: any[], methodAnnotations: any[], agent: (...args: any[]) => any): (resolve?: (value: any) => any, ...args: any[]) => undefined;
    proxyMethod<T>(type: T, method: string): (...args: any[]) => any;
    proxyMethodAsync<T>(type: T, method: string): ((resolve: any) => any) | ((resolve?: (value: any) => any, ...args: any[]) => undefined);
}
