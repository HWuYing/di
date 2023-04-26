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
const empty = {};
function factory(deps, type) {
    const map = new Map();
    return () => {
        const currentInjector = getCurrentInjector();
        const cache = map.get(currentInjector) || { _m: empty, pending: false };
        if (cache._m !== empty)
            return cache._m;
        if (cache.pending)
            return cache._m = Object.create(type.prototype);
        map.set(currentInjector, cache);
        cache.pending = true;
        const cls = new type(...injectArgs(deps));
        const m = propArgs(cache._m = cache._m !== empty ? Object.assign(cache._m, cls) : cls, getPropMetadata(type));
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
