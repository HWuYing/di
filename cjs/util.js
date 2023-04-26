"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToFactory = exports.isClassProvider = void 0;
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
function hasDeps(value) {
    return !!(value && value.deps);
}
function isClassProvider(value) {
    return !!(value && value.useClass);
}
exports.isClassProvider = isClassProvider;
var empty = {};
function factory(deps, type) {
    var map = new Map();
    return function () {
        var currentInjector = (0, injector_compatibility_1.getCurrentInjector)();
        var cache = map.get(currentInjector) || { _m: empty, pending: false };
        if (cache._m !== empty)
            return cache._m;
        if (cache.pending)
            return cache._m = Object.create(type.prototype);
        map.set(currentInjector, cache);
        cache.pending = true;
        var cls = new (type.bind.apply(type, tslib_1.__spreadArray([void 0], (0, injector_compatibility_1.injectArgs)(deps), false)))();
        var m = (0, injector_compatibility_1.propArgs)(cache._m = cache._m !== empty ? Object.assign(cache._m, cls) : cls, getPropMetadata(type));
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
