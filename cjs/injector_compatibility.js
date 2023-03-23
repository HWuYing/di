"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propArgs = exports.injectArgs = exports.getInjectFlag = exports.attachInjectFlag = exports.saveCurrentInjector = exports.ɵɵinject = void 0;
var DI_DECORATOR_FLAG = '__DI_FLAG__';
var injector = null;
function ɵɵinject(token, flags) {
    return injector === null || injector === void 0 ? void 0 : injector.get(token, flags);
}
exports.ɵɵinject = ɵɵinject;
function saveCurrentInjector(ɵɵinject) {
    var preInjector = injector;
    injector = ɵɵinject;
    return preInjector;
}
exports.saveCurrentInjector = saveCurrentInjector;
function attachInjectFlag(decorator, flag) {
    decorator[DI_DECORATOR_FLAG] = flag;
    decorator.prototype[DI_DECORATOR_FLAG] = flag;
    return decorator;
}
exports.attachInjectFlag = attachInjectFlag;
function getInjectFlag(token) {
    return token[DI_DECORATOR_FLAG];
}
exports.getInjectFlag = getInjectFlag;
function injectArgs(types) {
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
exports.injectArgs = injectArgs;
function propArgs(type, propMetadata) {
    var props = {};
    Object.keys(propMetadata).forEach(function (prop) {
        var arrMetadata = propMetadata[prop];
        var flags = 0;
        var token = undefined;
        arrMetadata.forEach(function (meta) {
            var flag = getInjectFlag(meta);
            if (typeof flag !== 'number')
                return token = meta;
            flag === -1 /* DecoratorPropFlags.Prop */ ? token = meta.token : flags = flags | flag;
        });
        var value = ɵɵinject(token, flags);
        typeof value !== 'undefined' && (props[prop] = value);
    });
    return Object.assign(type, props);
}
exports.propArgs = propArgs;
