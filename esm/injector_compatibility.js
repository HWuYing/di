const FORWARD_REF = '__forward__ref__';
const DI_DECORATOR_FLAG = '__DI_FLAG__';
let injector = null;
export function ɵɵInject(token, flags) {
    return injector === null || injector === void 0 ? void 0 : injector.get(token, flags);
}
export function saveCurrentInjector(_inject) {
    const preInjector = injector;
    injector = _inject;
    return preInjector;
}
export function getCurrentInjector() {
    return injector;
}
export function attachInjectFlag(decorator, flag) {
    decorator[DI_DECORATOR_FLAG] = flag;
    decorator.prototype[DI_DECORATOR_FLAG] = flag;
    return decorator;
}
export function getInjectFlag(token) {
    return token[DI_DECORATOR_FLAG];
}
export function forwardRef(ref) {
    ref[DI_DECORATOR_FLAG] = FORWARD_REF;
    return ref;
}
function factoryMetaToValue(_transform, tokeFlags) {
    return function (metaList, handler) {
        let flags = 0;
        let token = undefined;
        const metaCache = [];
        metaList.forEach((meta) => {
            const flag = getInjectFlag(meta);
            metaCache.push([meta.transform || _transform, meta]);
            if (typeof flag !== 'number')
                return token = meta;
            flag === tokeFlags ? token = meta.token : flags = flags | flag;
            token = typeof token === 'function' && getInjectFlag(token) === FORWARD_REF ? token() : token;
        });
        let value = ɵɵInject(token, flags);
        while (metaCache.length) {
            const [transformFunc, meta] = metaCache.pop();
            value = handler(transformFunc, meta, value);
        }
        return value;
    };
}
const argsMetaToValue = factoryMetaToValue((_meta, value) => value, -1 /* DecoratorFlags.Inject */);
export function injectArgs(types, ...args) {
    const handler = (transform, meta, value) => transform(meta, value, ...args);
    return types.map((arg) => argsMetaToValue(Array.isArray(arg) ? arg : [arg], handler));
}
export function propArgs(type, propMetadata) {
    Object.keys(propMetadata).forEach((prop) => {
        const handler = (transform, meta, value) => transform(meta, value, type, prop);
        const value = argsMetaToValue(propMetadata[prop], handler);
        value !== type[prop] && (type[prop] = value);
    });
    return type;
}
