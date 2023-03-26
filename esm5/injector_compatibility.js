var DI_DECORATOR_FLAG = '__DI_FLAG__';
var injector = null;
export function ɵɵinject(token, flags) {
    return injector === null || injector === void 0 ? void 0 : injector.get(token, flags);
}
export function saveCurrentInjector(ɵɵinject) {
    var preInjector = injector;
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
    var args = [];
    types.forEach(function (arg) {
        var argArray = Array.isArray(arg) ? arg : [arg];
        var flags = 0;
        var token = undefined;
        argArray.forEach(function (meta) {
            var flag = getInjectFlag(meta);
            if (typeof flag !== 'number')
                return token = meta;
            flag === -1 /* DecoratorFlags.Inject */ ? token = meta.token : flags = flags | flag;
        });
        args.push(ɵɵinject(token, flags));
    });
    return args;
}
var defaultTransform = function (type, name, value) { return value !== undefined && (type[name] = value); };
export function propArgs(type, propMetadata) {
    Object.keys(propMetadata).forEach(function (prop) {
        var flags = 0;
        var transform;
        var token = undefined;
        propMetadata[prop].forEach(function (meta) {
            var flag = getInjectFlag(meta);
            transform = meta.transform || defaultTransform;
            if (typeof flag !== 'number')
                return token = meta;
            flag === -1 /* DecoratorPropFlags.Prop */ ? token = meta.token : flags = flags | flag;
        });
        transform(type, prop, ɵɵinject(token, flags));
    });
    return type;
}
