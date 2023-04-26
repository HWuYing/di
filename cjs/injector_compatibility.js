"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propArgs = exports.injectArgs = exports.forwardRef = exports.getInjectFlag = exports.attachInjectFlag = exports.getCurrentInjector = exports.saveCurrentInjector = exports.ɵɵInject = void 0;
var FORWARD_REF = '__forward__ref__';
var DI_DECORATOR_FLAG = '__DI_FLAG__';
var injector = null;
function ɵɵInject(token, flags) {
    return injector === null || injector === void 0 ? void 0 : injector.get(token, flags);
}
exports.ɵɵInject = ɵɵInject;
function saveCurrentInjector(_inject) {
    var preInjector = injector;
    injector = _inject;
    return preInjector;
}
exports.saveCurrentInjector = saveCurrentInjector;
function getCurrentInjector() {
    return injector;
}
exports.getCurrentInjector = getCurrentInjector;
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
function forwardRef(ref) {
    ref[DI_DECORATOR_FLAG] = FORWARD_REF;
    return ref;
}
exports.forwardRef = forwardRef;
function factoryMetaToValue(_transform, tokeFlags) {
    return function (metaList, handler) {
        var flags = 0;
        var token = undefined;
        var transformFunc = [];
        metaList.forEach(function (meta) {
            var flag = getInjectFlag(meta);
            transformFunc.push(meta.transform || _transform);
            if (typeof flag !== 'number')
                return token = meta;
            flag === tokeFlags ? token = meta.token : flags = flags | flag;
            token = getInjectFlag(token) === FORWARD_REF && typeof token === 'function' ? token() : token;
        });
        var value = ɵɵInject(token, flags);
        while (transformFunc.length)
            value = handler(transformFunc.pop(), value);
        return value;
    };
}
var argsMetaToValue = factoryMetaToValue(function (value) { return value; }, -1 /* DecoratorFlags.Inject */);
function injectArgs(types) {
    var handler = function (transform, value) { return transform(value); };
    return types.map(function (arg) { return argsMetaToValue(Array.isArray(arg) ? arg : [arg], handler); });
}
exports.injectArgs = injectArgs;
var propMetaToValue = factoryMetaToValue(function (type, name, value) { return value; }, -1 /* DecoratorFlags.Inject */);
function propArgs(type, propMetadata) {
    Object.keys(propMetadata).forEach(function (prop) {
        type[prop] = propMetaToValue(propMetadata[prop], function (transform, value) { return transform(type, prop, value); });
    });
    return type;
}
exports.propArgs = propArgs;
