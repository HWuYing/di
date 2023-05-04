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
    let obj = Object.create(type.prototype);
    const proxy = new Proxy(obj, {
        set: (_target, props, value) => obj[props] = value,
        get: (_target, props) => {
            return typeof obj[props] === 'function' ? (...args) => obj[props](...args) : obj[props];
        }
    });
    return Object.defineProperty(cache, 'proxy', { get: () => proxy, set: (value) => obj = value });
}
function factory(deps, type) {
    const empty = {};
    const map = new Map();
    return () => {
        const currentInjector = getCurrentInjector();
        const cache = map.get(currentInjector) || { proxy: empty, pending: false };
        if (cache.proxy !== empty)
            return cache.proxy;
        if (cache.pending)
            return createProxy(cache, type).proxy;
        map.set(currentInjector, cache);
        cache.pending = true;
        const m = propArgs(cache.proxy = new type(...injectArgs(deps)), getPropMetadata(type));
        map.delete(currentInjector);
        return m;
    };
}
export function convertToFactory(type, provider) {
    if (!provider) {
        const deps = getDeps(type);
        return factory(deps, type);
    }
    if (isValueProvider(provider)) {
        return () => provider.useValue;
    }
    if (isExistingProvider(provider)) {
        return () => ɵɵInject(provider.useExisting);
    }
    if (isFactoryProvider(provider)) {
        return (...params) => provider.useFactory(...injectArgs(provider.deps || []), ...params);
    }
    const _type = isClassProvider(provider) ? provider.useClass : type;
    const deps = hasDeps(provider) ? provider.deps : getDeps(_type);
    return factory(deps, _type);
}
