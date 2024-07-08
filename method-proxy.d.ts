import { StaticInjector } from './injector';
export declare class MethodProxy {
    injector: StaticInjector;
    protected createAgent<T>(type: T, name: string, nativeMethod: (...args: any[]) => any): (...args: any[]) => any;
    injectArgs(annotations: any[], ...args: any[]): any[];
    proxyMethod<T>(type: T, method: string): any;
}
