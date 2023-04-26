import { __spreadArray } from "tslib";
import { getCurrentInjector, injectArgs, ɵɵInject, propArgs } from './injector_compatibility';
import { reflectCapabilities } from './reflection-capabilities';
function getDeps(type) {
    return reflectCapabilities.parameters(type);
}
function getPropMetadata(type) {
    return reflectCapabilities.properties(type);
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
export function isClassProvider(value) {
    return !!(value && value.useClass);
}
var empty = {};
function factory(deps, type) {
    var map = new Map();
    return function () {
        var currentInjector = getCurrentInjector();
        var cache = map.get(currentInjector) || { _m: empty, pending: false };
        if (cache._m !== empty)
            return cache._m;
        if (cache.pending)
            return cache._m = Object.create(type.prototype);
        map.set(currentInjector, cache);
        cache.pending = true;
        var cls = new (type.bind.apply(type, __spreadArray([void 0], injectArgs(deps), false)))();
        var m = propArgs(cache._m = cache._m !== empty ? Object.assign(cache._m, cls) : cls, getPropMetadata(type));
        map.delete(currentInjector);
        return m;
    };
}
export function convertToFactory(type, provider) {
    if (!provider) {
        var deps_1 = getDeps(type);
        return factory(deps_1, type);
    }
    if (isValueProvider(provider)) {
        return function () { return provider.useValue; };
    }
    if (isExistingProvider(provider)) {
        return function () { return ɵɵInject(provider.useExisting); };
    }
    if (isFactoryProvider(provider)) {
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            return provider.useFactory.apply(provider, __spreadArray(__spreadArray([], injectArgs(provider.deps || []), false), params, false));
        };
    }
    var _type = isClassProvider(provider) ? provider.useClass : type;
    var deps = hasDeps(provider) ? provider.deps : getDeps(_type);
    return factory(deps, _type);
}
