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
        const transformFunc = [];
        metaList.forEach((meta) => {
            const flag = getInjectFlag(meta);
            transformFunc.push(meta.transform || _transform);
            if (typeof flag !== 'number')
                return token = meta;
            flag === tokeFlags ? token = meta.token : flags = flags | flag;
            token = getInjectFlag(token) === FORWARD_REF && typeof token === 'function' ? token() : token;
        });
        let value = ɵɵInject(token, flags);
        while (transformFunc.length)
            value = handler(transformFunc.pop(), value);
        return value;
    };
}
const argsMetaToValue = factoryMetaToValue((value) => value, -1 /* DecoratorFlags.Inject */);
export function injectArgs(types) {
    const handler = (transform, value) => transform(value);
    return types.map((arg) => argsMetaToValue(Array.isArray(arg) ? arg : [arg], handler));
}
const propMetaToValue = factoryMetaToValue((type, name, value) => value, -1 /* DecoratorFlags.Inject */);
export function propArgs(type, propMetadata) {
    Object.keys(propMetadata).forEach((prop) => {
        type[prop] = propMetaToValue(propMetadata[prop], (transform, value) => transform(type, prop, value));
    });
    return type;
}
