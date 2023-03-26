import { TransformProp } from './injector_compatibility';
import { TokenKey, Type } from './type-api';
type PropDecorator = (token: TokenKey, options?: {
    transform: TransformProp;
}) => any;
export declare const ROOT_SCOPE = "root";
export declare const Injectable: (this: unknown, ...args: any[]) => (cls: Type<any>) => any;
export declare const Inject: any;
export declare const Prop: PropDecorator;
export {};
