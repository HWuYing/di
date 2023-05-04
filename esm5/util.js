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
        var currentInjector = getCurrentInjector();
        var cache = map.get(currentInjector) || { proxy: empty, pending: false };
        if (cache.proxy !== empty)
            return cache.proxy;
        if (cache.pending)
            return createProxy(cache, type).proxy;
        map.set(currentInjector, cache);
        cache.pending = true;
        var m = propArgs(cache.proxy = new (type.bind.apply(type, __spreadArray([void 0], injectArgs(deps), false)))(), getPropMetadata(type));
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
