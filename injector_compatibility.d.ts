import { Injector } from './injector.abstract';
import { TokenKey } from './type-api';
export declare const enum DecoratorFlags {
    Inject = -1
}
export declare const enum DecoratorPropFlags {
    Prop = -1
}
export declare function ɵɵinject(token: TokenKey, flags?: any): any;
export declare function saveCurrentInjector(ɵɵinject: Injector): Injector;
export declare function attachInjectFlag(decorator: any, flag: number): any;
export declare function getInjectFlag(token: any): number | undefined;
export declare function injectArgs(types: any[]): any[];
export declare function propArgs(type: any, propMetadata: any): any;
