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
            flag === -1 /* DecoratorFlags.Inject */ ? token = meta.token : flags = flags | flag;
        });
        args.push(ɵɵinject(token, flags));
    });
    return args;
}
const defaultTransform = (type, name, value) => value !== undefined && (type[name] = value);
export function propArgs(type, propMetadata) {
    Object.keys(propMetadata).forEach((prop) => {
        let flags = 0;
        let transform;
        let token = undefined;
        propMetadata[prop].forEach((meta) => {
            const flag = getInjectFlag(meta);
            transform = meta.transform || defaultTransform;
            if (typeof flag !== 'number')
                return token = meta;
            flag === -1 /* DecoratorPropFlags.Prop */ ? token = meta.token : flags = flags | flag;
        });
        transform(type, prop, ɵɵinject(token, flags));
    });
    return type;
}
