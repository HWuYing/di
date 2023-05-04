"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFactory = void 0;
var tslib_1 = require("tslib");
var injector_compatibility_1 = require("./injector_compatibility");
var reflection_capabilities_1 = require("./reflection-capabilities");
function getDeps(type) {
    return reflection_capabilities_1.reflectCapabilities.parameters(type);
}
function getPropMetadata(type) {
    return reflection_capabilities_1.reflectCapabilities.properties(type);
}
function isValueProvider(value) {
    return !!(value && typeof value === 'object' && value.useValue);
}
function isExistingProvider(value) {
    return !!(value && typeof value === 'object' && value.useExisting);
}
function isFactoryProvider(value) {
    return !!(value && value.useFactory);
}
function isClassProvider(value) {
    return !!(value && value.useClass);
}
function hasDeps(value) {
    return !!(value && value.deps);
}
function createProxy(cache, type) {
    var obj = Object.create(type.prototype);
    var proxy = new Proxy(obj, {
        set: function (_target, props, value) { return obj[props] = value; },
        get: function (_target, props) {
            return typeof obj[props] === 'function' ? function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return obj[props].apply(obj, args);
            } : obj[props];
        }
    });
    return Object.defineProperty(cache, 'proxy', { get: function () { return proxy; }, set: function (value) { return obj = value; } });
}
function factory(deps, type) {
    var empty = {};
    var map = new Map();
    return function () {
        var currentInjector = (0, injector_compatibility_1.getCurrentInjector)();
        var cache = map.get(currentInjector) || { proxy: empty, pending: false };
        if (cache.proxy !== empty)
            return cache.proxy;
        if (cache.pending)
            return createProxy(cache, type).proxy;
        map.set(currentInjector, cache);
        cache.pending = true;
        var m = (0, injector_compatibility_1.propArgs)(cache.proxy = new (type.bind.apply(type, tslib_1.__spreadArray([void 0], (0, injector_compatibility_1.injectArgs)(deps), false)))(), getPropMetadata(type));
        map.delete(currentInjector);
        return m;
    };
}
function convertToFactory(type, provider) {
    if (!provider) {
        var deps_1 = getDeps(type);
        return factory(deps_1, type);
    }
    if (isValueProvider(provider)) {
        return function () { return provider.useValue; };
    }
    if (isExistingProvider(provider)) {
        return function () { return (0, injector_compatibility_1.ɵɵInject)(provider.useExisting); };
    }
    if (isFactoryProvider(provider)) {
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return provider.useFactory.apply(provider, tslib_1.__spreadArray(tslib_1.__spreadArray([], (0, injector_compatibility_1.injectArgs)(provider.deps || []), false), params, false));
        };
    }
    var _type = isClassProvider(provider) ? provider.useClass : type;
    var deps = hasDeps(provider) ? provider.deps : getDeps(_type);
    return factory(deps, _type);
}
exports.convertToFactory = convertToFactory;
