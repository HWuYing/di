const DI_DECORATOR_FLAG = '__DI_FLAG__';
let injector = null;
export function ɵɵinject(token, flags) {
    return injector === null || injector === void 0 ? void 0 : injector.get(token, flags);
}
export function saveCurrentInjector(ɵɵinject) {
    const preInjector = injector;
    injector = ɵɵinject;
    return preInjector;
}
export function attachInjectFlag(decorator, flag) {
    decorator[DI_DECORATOR_FLAG] = flag;
    decorator.prototype[DI_DECORATOR_FLAG] = flag;
    return decorator;
}
export function getInjectFlag(token) {
    return token[DI_DECORATOR_FLAG];
}
export function injectArgs(types) {
    const args = [];
    types.forEach((arg) => {
        const argArray = Array.isArray(arg) ? arg : [arg];
        let flags = 0;
        let token = undefined;
        argArray.forEach((meta) => {
            const flag = getInjectFlag(meta);
            if (typeof flag !== 'number')
                return token = meta;
            flag === -1 /* Inject */ ? token = meta.token : flags = flags | flag;
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        args.push(ɵɵinject(token, flags));
    });
    return args;
}
